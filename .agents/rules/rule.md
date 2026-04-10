---
trigger: always_on
---

프론트엔드 기준으로
FSD 아키텍쳐를 꼭 따라야해
./apps/web/src/ 폴더의 entities 폴더, features 폴더, widgets 폴더를 적절하게 사용해서 페이지를 만들어야
./apps/web/src/app/에서 page.tsx를 만들 때 꼭 views폴더에서 작업한 후 page.tsx에 불러와서 나타내도록해
디자인을 할 때 꼭 ./packages/shared에 있는 shadcn 컴포넌트를 가져와서 디자인해 여기서 디자인 수정은 직접 ./packages/shared에 있는 shadcn컴포넌트를 절대 수정해서 디자인 수정하면 안돼

백엔드 기준으로
./apps/api/src/ 안에
auth 폴더, shared 폴더, server.ts, .gitignore, package.json, tsconfig.json 외의 파일이나 폴더를 생성하거나 수정할 수 있어
나머지는 수정하거나 생성할 때 꼭 나에게 request해

데이터 베이스 기준으로
./packages/database/prisma/schema안에 스키마를 생성시키고 모델 수정 생성할 수 있어
./packages/database/안에 다른 소스는 건드리지마
