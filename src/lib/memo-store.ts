"use client";

import { useSyncExternalStore } from "react";
import { supabase } from "./supabase";
import { CATEGORY_LABEL, type Memo, type MemoBlock, type MemoLabel } from "./memos";

// 새로 쓰거나 고친 메모는 Supabase `memos` 테이블에 저장해 모든 기기에서 같게 보인다.
// 같은 id의 샘플 메모는 저장본이 덮어쓴다.
type Row = {
  id: string;
  category: string;
  title: string;
  preview: string;
  label: string;
  body: MemoBlock[];
  date: string;
  full_date: string;
  created_at: string | null;
  updated_at: string;
};

const EMPTY: Memo[] = [];
const listeners = new Set<() => void>();

let cached: Memo[] = EMPTY;
let started = false;

function relativeDate(iso: string, now = new Date()) {
  const created = new Date(iso);
  const days = Math.round(
    (new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() -
      new Date(created.getFullYear(), created.getMonth(), created.getDate()).getTime()) /
      86_400_000,
  );
  if (days <= 0) return "오늘";
  if (days === 1) return "어제";
  return `${created.getMonth() + 1}월 ${created.getDate()}일`;
}

function fromRow(row: Row): Memo {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    preview: row.preview,
    label: row.label as MemoLabel,
    body: row.body,
    // 새로 쓴 메모는 쓴 날로부터 오늘/어제를 계산하고, 샘플을 고친 메모는 원래 날짜를 쓴다.
    date: row.created_at ? relativeDate(row.created_at) : row.date,
    fullDate: row.full_date,
  };
}

function toRow(memo: Memo, createdAt: string | null) {
  return {
    id: memo.id,
    category: memo.category,
    title: memo.title,
    preview: memo.preview,
    label: memo.label,
    body: memo.body,
    date: memo.date,
    full_date: memo.fullDate,
    created_at: createdAt,
    updated_at: new Date().toISOString(),
  };
}

function emit(memos: Memo[]) {
  cached = memos;
  listeners.forEach((listener) => listener());
}

async function load() {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error || !data) return;
  emit((data as Row[]).map(fromRow));
}

// 처음 구독할 때 한 번 불러오고, 다른 기기의 변경은 실시간으로 받는다.
function start() {
  if (started || !supabase) return;
  started = true;
  load();
  supabase
    .channel("memos")
    .on("postgres_changes", { event: "*", schema: "public", table: "memos" }, load)
    .subscribe();
  window.addEventListener("focus", load);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start();
  return () => {
    listeners.delete(listener);
  };
}

export function useSavedMemos(): Memo[] {
  return useSyncExternalStore(subscribe, () => cached, () => EMPTY);
}

// 클라이언트에서 처음 그려진 뒤에만 true — 저장본을 읽어야 하는 화면이 쓴다.
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type MemoInput = { category: string; title: string; content: string };

function formatFullDate(now: Date) {
  const day = `${now.getMonth() + 1}월 ${now.getDate()}일`;
  const time = new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
  return `${day} ${time}`;
}

function fromInput(
  input: MemoInput,
  base: Pick<Memo, "id" | "date" | "fullDate">,
): Memo {
  const content = input.content.trim();
  return {
    ...base,
    category: input.category,
    title: input.title.trim(),
    preview: content.split("\n")[0] ?? "",
    label: CATEGORY_LABEL[input.category] ?? "blue",
    body: content
      .split(/\n{2,}/)
      .filter(Boolean)
      .map((text) => ({ type: "paragraph" as const, parts: [{ text }] })),
  };
}

async function save(memo: Memo, createdAt: string | null) {
  if (!supabase) throw new Error("Supabase 환경 변수가 없어요.");
  const { error } = await supabase.from("memos").upsert(toRow(memo, createdAt));
  if (error) throw error;
  // 화면은 저장 직후 바로 바뀌고, 이어서 서버 기준으로 다시 맞춘다.
  emit([memo, ...cached.filter((item) => item.id !== memo.id)]);
  load();
}

export async function createMemo(input: MemoInput): Promise<Memo> {
  const now = new Date();
  const memo = fromInput(input, {
    id: `u-${crypto.randomUUID()}`,
    date: "오늘",
    fullDate: formatFullDate(now),
  });
  await save(memo, now.toISOString());
  return memo;
}

// 날짜는 그대로 두고 내용만 바꾼다. 샘플 메모면 저장본이 새로 생긴다.
export async function updateMemo(base: Memo, input: MemoInput): Promise<Memo> {
  const memo = fromInput(input, base);
  // 새로 쓴 메모(u-…)는 쓴 시각을 유지해 오늘/어제 계산이 흔들리지 않게 한다.
  const createdAt = base.id.startsWith("u-")
    ? await createdAtOf(base.id)
    : null;
  await save(memo, createdAt);
  return memo;
}

async function createdAtOf(id: string): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("memos")
    .select("created_at")
    .eq("id", id)
    .maybeSingle();
  return data?.created_at ?? null;
}

// 수정 화면의 입력칸에 넣을 글. 제목·목록 구조는 평문으로 펼친다.
export function memoToText(memo: Memo): string {
  return memo.body
    .map((block) => {
      if (block.type === "heading") return block.text;
      if (block.type === "list") return block.items.map((i) => `• ${i}`).join("\n");
      return block.parts.map((part) => part.text).join("");
    })
    .join("\n\n");
}
