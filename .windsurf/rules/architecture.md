---
trigger: always_on
---

## Architecture

We are building a backend API using Clean Architecture

- **Api layer**: contains controllers, validators, routes, middlewares, webhooks, depends on Application.
- **Application layer**: contains use cases, dto, and business rules.
- **Domain layer**: contains entities, value objects and repository interfaces, must not depend on any other layer.
- **Infrastructure layer**: contains concrete implementations of repositories, mappers, depends on Domain.

---

## Technology Stack

- **Backend**: Bun v1.3 + Hono v4 + TypeScript v5
- **Database**: Neon (PostgreSQL), Drizzle ORM v0.45
- **Auth**: Clerk v6
- **Validation**: Zod v4
- **Hosting / Deployment**: Vercel

---

## Database Tables

- **users**: (id, providerId, name, email, image, role, createdAt, updatedAt)