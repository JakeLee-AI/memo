# memo

카테고리와 라벨로 정리하는 간단한 메모 앱입니다.
메모는 Supabase에 저장되어 어느 기기에서든 같게 보입니다.

## 주요 기능

- 메모 목록 보기, 새 메모 쓰기, 메모 보기, 메모 고치기
- 메모마다 카테고리와 색 라벨 지정
- 쓴 날짜를 "오늘", "어제", "O월 O일"로 표시
- Supabase `memos` 테이블에 저장

## 기술 스택

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase (`@supabase/supabase-js`)

## 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 맨 위 폴더에 `.env.local` 파일을 만들고 Supabase 값을 넣습니다.
이 파일은 `.gitignore`에 들어 있어 GitHub에 올라가지 않습니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=내 Supabase 프로젝트 주소
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=내 Supabase 공개 키
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 됩니다.

## 사용할 수 있는 명령어

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 배포용 빌드 |
| `npm run start` | 빌드한 앱 실행 |
| `npm run lint` | 코드 검사 |

## 폴더 구조

```text
src/app          페이지 (목록, 메모 보기, 새 메모, 메모 고치기)
src/components   화면 구성 요소 (버튼, 칩, 배지, 메모 카드 등)
src/lib          메모 데이터와 Supabase 연결
public/icons     아이콘 파일
```

## 배포

[Vercel](https://vercel.com)에 저장소를 연결하면 쉽게 배포할 수 있습니다.
배포할 때 위의 환경 변수 두 개를 Vercel 프로젝트 설정에 똑같이 넣어 주세요.
