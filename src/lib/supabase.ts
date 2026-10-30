import { createClient } from "@supabase/supabase-js";

// NEXT_PUBLIC_ 값은 빌드할 때 코드에 박히므로 process.env를 이름 그대로 읽어야 한다.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && key ? createClient(url, key) : null;
