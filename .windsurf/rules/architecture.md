---
trigger: always_on
---

Architecture

use Clean Architecture

folder structure

src/
  -modules/
    -user/
      -api/
        -webhook
        -user.controller.ts
        -user.validator.ts
        -user.routes.ts
      -application/
        -commands
        -queries
        -dto
        -mappers
      -domain/
        -user.entity.ts
        -user.repository.ts
      -infrastructure/
        -user-repository-drizzle.ts
    -other module
  -shared/
    -api/
      -middlewares/
        -clerk-require-auth.ts
        -rate-limiter.ts
      -utils/
      -webhooks
        -use.webhook.ts
    -infrastructure/
      -database/
        -db.ts
        -schema.ts
app.ts
index.ts
drizzle.config.ts