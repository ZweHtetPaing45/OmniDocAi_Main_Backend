# 12. Frontend Developer Checklist

## Build against confirmed behavior

- [ ] Configure `VITE_API_BASE_URL` to the main backend's `/api/v1` origin.
- [ ] Register with `username`, `email`, `password`; handle duplicate email (400).
- [ ] Login with `email`, `password`; read token from `data.token`.
- [ ] Add bearer token to protected requests; clear frontend auth state on logout.
- [ ] Upload `pdf` plus `title` as multipart fields; keep files <=30 MiB.
- [ ] Read created document data from `response.result`; its `pages` entries use snake_case.
- [ ] Use `GET /document_page/` for flat all-page rows and `GET /document_page/:documentId` for one document.
- [ ] Render page text and image URLs with loading/failed-image states.
- [ ] Send non-empty `content` to `PATCH /document_page/:page_id`.
- [ ] For analysis send PDF and JSON-stringified `pages` (`pageId`, `pageNumber`, `imageUrl`).
- [ ] Keep analysis result loosely typed until the backend supplies a fixture.
- [ ] Handle `{message}` errors and network/CORS failures separately.
- [ ] Provide client-side validation for formats/limits not enforced by backend.

## Needs Backend Developer Confirmation

1. What are deployed API base URL(s), and which frontend origins should CORS allow?
2. What is `EXPIRESIN` in each environment? Should invalid/expired JWT errors be returned as 401 instead of current generic 500?
3. Can the team provide DDL/migrations for `users`, `documents`, and `document_pages` (types, nullability, defaults, uniqueness, foreign keys)?
4. Can the team provide representative actual responses from PDF conversion and `/process/pdf_analysis`? Postman has none.
5. What exact nesting does analyzer return? Main backend reads `data.data.results` and returns `data`.
6. Is `title` required? Upload reads but does not validate it.
7. Should page content be clearable with `content: ""`? Current controller rejects it.
8. Should updating a missing/unowned page return 404? The repository does not check affected rows.
9. Is uploaded file type restricted downstream? Main backend only sets 30 MiB size limit.
10. Must analysis `pages` be a JSON string, and must the sent PDF match the stored document? Validation/association checks are not explicit beyond owner-scoped updates.
11. Are `imageUrl` and `file_path` browser-accessible, and do display/download requests need auth/CORS?
12. Should image deletion be exposed? A helper exists without a route. Are audio features planned? `audio_path` exists but no routes do.
13. What cleanup is expected if conversion succeeds but database creation fails? No cleanup/transaction flow is visible.
14. Confirm Postman sample `document_page/1` is a document ID, as the route expects.

## Scope note

Postman requests for PDF extraction, direct OCR, and direct classification belong to separate services. Do not treat them as main-backend routes unless integrating those services directly under their own contracts.
