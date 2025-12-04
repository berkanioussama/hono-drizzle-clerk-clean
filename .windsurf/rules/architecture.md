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
        -webhook/
          -use.webhook.ts
        -user.controller.ts
        -user.validator.ts
        -user.routes.ts
      -application/
        -commands/
          -create-user.usecase.ts
        -query/
          -get-user-by-id.usecase.ts
        -dto/
          -user-input.dto.ts
          -user-output.dto.ts
      -domain/
        -user.entity.ts
        -IUser.repository.ts
      -infrastructure/
        -user-mapper.ts
        -user-repository.ts
    -other module
  -shared/
    -api/
      -middlewares/
        -clerk-require-auth.ts
        -rate-limiter.ts
      -utils/
        -api-response.ts
    -infrastructure/
      -database/
        -db.ts
        -schema.ts
app.ts
index.ts
.env
drizzle.config.ts