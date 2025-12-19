---
trigger: always_on
---

Architecture

use Clean Architecture

folder structure

src/
├── modules/
│   └── user/
│   │   ├── api/
│   │   │   ├── webhook/
│   │   │   │   └── use.webhook.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.validator.ts
│   │   │   └── user.routes.ts
│   │   ├── application/
│   │   │    └── commands/
│   │   │    │   ├── add-user.uc.ts
│   │   │    │   ├── edit-user.uc.ts
│   │   │    │   └── remove-user.uc.ts
│   │   │    └── query/
│   │   │    │   ├── find-all-users.uc.ts
│   │   │    │   └── find-user-by-id.uc.ts
│   │   │    └── dto/
│   │   │        ├── user-input.dto.ts
│   │   │        └── user-output.dto.ts
│   │   ├── domain/
│   │   │   ├── IUser.repo.ts
│   │   │   ├── user.entity.ts
│   │   │   └── user.vo.ts
│   │   └── infrastructure/
│   │       ├── user-mapper.ts
│   │       └── user-repo.ts
│   └── other module
├── shared/
│   ├── api/
│   │   ├── middlewares/
│   │   │   ├── clerk-require-auth.ts
│   │   │   └── rate-limiter.ts
│   │   └── utils/
│   │       ├── api-response.ts
│   │       ├── auth-utils.ts
│   │       └── handel-error.ts
│   ├── application/
│   ├── domain/
│   └── infrastructure/
│       └── database/
│           ├── db.ts
│           └── schema.ts
├── app.ts
├── index.ts
├── .env
└── drizzle.config.ts