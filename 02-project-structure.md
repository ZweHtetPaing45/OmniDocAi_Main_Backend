# 2. Project Structure

```text
src/
├── app.ts                         Express setup, JSON parsing, CORS
├── server.ts                      Port, routes, error handler, server start
├── config/env.ts                  Environment variable mapping
├── application/                   DTOs, errors, repository contracts, use cases
├── container/                     Dependency construction and wiring
├── domain/entities/               User, document, and page entities
├── infrastructure/
│   ├── database/mysql.ts          MySQL pool
│   ├── repositories/mysql/        SQL implementations
│   ├── security/                  JWT implementation
│   ├── util/                      bcrypt helper
│   └── logger/                    Winston logger and transports
├── interface/http/v1/
│   ├── controller/                HTTP request/response handling
│   ├── middlewares/               JWT auth, Multer upload, error handler
│   └── routes/                    `/api/v1` route registration
└── services/                      PDF conversion and analyzer HTTP clients
```

## Request flow

1. `server.ts` mounts routes at `/api/v1` and adds the final error handler.
2. Protected routes authenticate; upload routes parse `pdf` into memory.
3. Controllers read request fields and call a use case.
4. Use cases call repositories and/or downstream services.
5. The error handler returns `{ "message": "..." }` for operational and unexpected errors.

Frontend-relevant source locations: routes in `src/interface/http/v1/routes/**`; response parsing in `controller/**`; business flow in `application/usecase/**`; SQL projections and ownership filters in `infrastructure/repositories/mysql/**`; runtime configuration in `.env.example` and `src/config/env.ts`.

No database migrations/schema dump, OpenAPI definition, or committed API response fixtures were found.
