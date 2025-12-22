---
trigger: always_on
---

# Architecture

We are building a backend API, Frontend is a separate Next.js app
Architecture: Clean Architecture

- Application layer contains use cases, dto, and business rules.
- Domain layer contains entities, value objects and repository interfaces, must not depend on any other layer.
- Infrastructure layer contains concrete implementations of repositories, mappers, depends on Domain.
- Api layer contains controllers, validators, routes, middlewares, webhooks, depends on Application.

# Folder structure:

src/
├── modules/
│   └── user/
│   │   ├── api/
│   │   ├── application/
│   │   │    └── commands/
│   │   │    └── query/
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