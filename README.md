# Hono + Drizzle + Clerk Clean Architecture

A clean architecture implementation using Hono, Drizzle ORM, and Clerk for authentication, following domain-driven design principles.

```
src/
├── modules/                # Feature modules
│   └── user/               # User module
│       ├── api/            # API layer
│       ├── application/    # Use cases
│       ├── domain/         # Business logic
│       └── infrastructure/ # External implementations
├── shared/                 # Shared code across modules
│    ├── api/               
│    ├── application/        
│    ├── domain/             
│    └── infrastructure/    
├── app.ts                  # Main application file
├── drizzle.config.ts       # ORM configuration
└── .env                    # Environment variables

```

## Installation

To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000
