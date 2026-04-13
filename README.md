# Monorepo Template

이 프로젝트는 Next.js (Frontend), Fastify/Node.js (Backend), Prisma (ORM)를 사용하는 모노레포 프로젝트입니다.

## 🚀 시작하기

### 개발 환경 (Development)

개발 환경을 실행하기 전, Prisma 스키마를 최신 상태로 생성해야 합니다.

1. **Prisma Client 생성**

   ```bash
   pnpm run db:generate
   ```

   > [!IMPORTANT]
   > `make dev`를 실행하기 전 반드시 위 명령어를 통해 DB 클라이언트를 생성해야 정상적으로 작동합니다.

2. **개발 환경 실행**
   ```bash
   make dev
   ```

### 운영 환경 (Production)

운영 환경을 실행할 때는 데이터베이스 볼륨 초기화가 필요할 수 있습니다.

1. **Docker 볼륨 초기화**

   ```bash
   make down
   ```

   > [!CAUTION]
   > 운영 환경(`make prod`)을 실행하기 전, 기존 데이터 호환성 및 인증 오류 방지를 위해 **Docker 볼륨을 완전히 초기화(삭제)**한 후 진행해야 합니다.
   > 만약 `make down`으로 볼륨이 삭제되지 않는다면 `docker volume rm` 명령어를 통해 수동으로 삭제해 주세요.

2. **운영 환경 실행**
   ```bash
   make prod
   ```

## 🛠 주요 명령어

| 명령어                 | 설명                                    |
| :--------------------- | :-------------------------------------- |
| `make dev`             | 개발용 컨테이너 실행 (`.env.dev` 사용)  |
| `make prod`            | 운영용 컨테이너 실행 (`.env.prod` 사용) |
| `make down`            | 모든 컨테이너 종료 및 **볼륨 삭제**     |
| `pnpm run db:generate` | Prisma 스키마 기반 클라이언트 생성      |

## 🏗 아키텍처 가이드

### 프론트엔드 (apps/web)

- **FSD (Feature-Sliced Design)** 아키텍처를 준수합니다.
- `entities`, `features`, `widgets` 폴더를 적절히 활용하세요.
- `app/` 폴더의 `page.tsx`는 `views/` 폴더에서 작업한 내용을 불러와서 구성해야 합니다.
- UI 컴포넌트는 `packages/shared`의 `shadcn` 컴포넌트를 사용하며, 원본 컴포넌트 코드는 직접 수정하지 않습니다.

### 백엔드 (apps/api)

- `src/` 내부의 `auth`, `shared` 폴더와 `server.ts`를 기본으로 구성합니다.
- 이외의 폴더/파일 추가 시 구조적 검토가 필요합니다.

### 데이터베이스 (packages/database)

- `prisma/schema` 폴더 내에서 스키마를 관리합니다.
- DB 모델 수정/생성 시 가이드를 따르세요.
