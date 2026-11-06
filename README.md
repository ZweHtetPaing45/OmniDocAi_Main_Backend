# OmniDocAI Main Backend: Frontend Documentation

This folder documents the TypeScript/Express service in `main_backend.zip` / `X:\OmniDocAi\main_backend` and the `Main_Backend` section of `OmniDocAi.postman_collection.json`.

## Read in this order

1. [Project overview](01-project-overview.md)
2. [Project structure](02-project-structure.md)
3. [API reference](03-api-reference.md)
4. [Authentication](04-authentication-guide.md)
5. [File upload and PDF processing](05-file-upload-guide.md)
6. [Database structure](06-database-structure.md)
7. [React integration](07-frontend-integration-guide.md)
8. [TypeScript interfaces](08-typescript-interfaces.md)
9. [Errors](09-error-handling.md)
10. [Environment configuration](10-environment-configuration.md)
11. [Endpoint summary](11-api-endpoint-summary.md)
12. [Frontend checklist and backend questions](12-frontend-developer-checklist.md)

## Evidence and limits

The codebase is the authority for route behavior. Postman corroborates the main routes but has no saved responses. Examples distinguish confirmed envelopes from values whose exact runtime shape depends on external services or the unavailable database schema. No SQL schema/migration file was supplied, so SQL types, defaults, indexes, and constraints cannot be confirmed. Items marked **Not Found in Backend Source Code** are not inferred.

The collection also contains requests for PDF image conversion, digital text extraction, OCR, and PDF classification services. Those are separate services and not routes served by this backend. The main backend calls PDF conversion and classification services internally.
