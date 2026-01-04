---
trigger: always_on
---

## Folder structure:

src/
├── modules/
│   └── user/
│   │   ├── api/
│   │   ├── application/
│   │   │    └── usecase/
│   │   │    └── dto/
│   │   ├── domain/
│   │   └── infrastructure/
│   └── other module
├── shared/
│   ├── api/
│   │   ├── middlewares/
│   │   └── utils/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
│       └── database/
├── app.ts
├── index.ts
└── .env

Assume I’ll have multiple modules later