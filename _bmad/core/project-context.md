# Project Context

## ⚠️ 필수 규칙 — 에이전트 공통

- 아래 규칙을 위반하는 코드는 절대 생성하지 말 것
- 허용 범위 외 파일/폴더 생성·수정 시 반드시 사용자에게 먼저 요청할 것

---

## 프로젝트 구조

```
apps/
  web/src/
    app/           # Next.js 라우팅
    views/         # 페이지 단위 뷰 컴포넌트
    entities/      # FSD - 엔티티 레이어
    features/      # FSD - 피처 레이어
    widgets/       # FSD - 위젯 레이어
  api/src/
    auth/          # 인증 모듈 (수정 가능)
    shared/        # 공용 모듈 (수정 가능)
    server.ts      # 서버 진입점 (수정 가능)
packages/
  shared/          # shadcn 공용 컴포넌트 (읽기 전용)
  ui/              # shadcn 컴포넌트 (읽기 전용)
  database/
    prisma/schema/ # 스키마 정의 (수정 가능)
```

---

## 프론트엔드 규칙

### FSD 아키텍처 (필수 준수)

- `entities/` : 비즈니스 엔티티 (User, Product 등 도메인 객체)
- `features/` : 사용자 인터랙션 단위 기능 (로그인, 장바구니 추가 등)
- `widgets/` : 여러 feature/entity를 조합한 독립 UI 블록
- 상위 레이어가 하위 레이어를 import하는 단방향 의존성 유지

### 페이지 생성 규칙 (필수)

- `app/` 하위 `page.tsx`는 반드시 `views/` 폴더의 컴포넌트만 import
- `page.tsx` 안에 직접 UI 로직 작성 금지

✅ 올바른 예시:

```tsx
// app/dashboard/page.tsx
import DashboardView from "@/views/dashboard";
export default function Page() {
  return <DashboardView />;
}
```

❌ 잘못된 예시:

```tsx
// app/dashboard/page.tsx
export default function Page() {
  return <div>직접 UI 작성 금지</div>; // 🚫
}
```

### 디자인 규칙 (필수)

- UI 컴포넌트는 반드시 `packages/shared`의 shadcn 컴포넌트를 import해서 사용
- `packages/shared` 내부 shadcn 컴포넌트 직접 수정 절대 금지
- 디자인 커스터마이징은 상위 레이어(features/widgets/views)에서 className으로 처리

---

## 백엔드 규칙

✅ 자유롭게 수정·생성 가능한 경로:

- `apps/api/src/auth/`
- `apps/api/src/shared/`
- `apps/api/src/server.ts`

🚫 위 경로 외 파일·폴더 생성·수정 시 → 반드시 사용자에게 먼저 요청

---

## 데이터베이스 규칙

✅ 수정·생성 가능: `packages/database/prisma/schema/`

🚫 `packages/database/` 내 그 외 소스 일체 수정 금지
