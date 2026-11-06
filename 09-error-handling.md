# 9. Error Handling

## Format

Express returns `{ "message": "..." }`. `AppError` uses its configured status. Any other error, including ordinary JWT verification errors and unhandled Multer errors, becomes HTTP 500 `{ "message": "interface Server Error" }`. No field-error array, error code, or request ID is returned.

| Status | Known cases |
|---:|---|
| 400 | Missing auth fields; duplicate email; missing upload file; converter/analyzer call failure; empty analyzer result; missing/falsey update input; other app-level errors. |
| 401 | Missing bearer token; wrong password. Invalid/expired JWT currently becomes generic 500. |
| 404 | Login email not found; token owner missing; analyzer update references no owned page. |
| 500 | Unexpected/database errors; password hash failure; generic errors. |
| 413 or 500 | Oversize Multer upload may become generic 500 because MulterError is not mapped; confirm actual deployment behavior. |

Page content update does not check affected row count, so a missing/unowned page may still get HTTP 201. This is **Needs Backend Developer Confirmation**.

## Frontend handling

- Parse `message`; otherwise show a generic network/server error.
- 400: show actionable input/service error; duplicate registration can offer login.
- 401: clear session and re-authenticate, while accounting for invalid-token inconsistency.
- 404: explain missing account/page where applicable.
- 413: explain 30 MiB cap if received; actual mapping needs confirmation.
- 500: offer retry without exposing internals. Avoid logging tokens or file contents.
- Offline/CORS errors have no backend response body; distinguish them from HTTP responses.

No Joi validation is wired despite the dependency. Email format, password strength, title length, page-number range, and page-array constraints are **Not Found in Backend Source Code**. Add client-side UX validation but do not represent it as a backend rule.
