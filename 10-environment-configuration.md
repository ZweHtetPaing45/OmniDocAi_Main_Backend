# 10. Environment Configuration

## Frontend

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Set the origin per deployment. Frontend requires only this public API URL, not database or downstream secrets.

## Backend configuration to coordinate

| Variable | Purpose / status |
|---|---|
| `PORT` | Main API port; defaults to `5000`. |
| `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL pool connection. |
| `JWT_SECRET` | JWT signing/verification secret; never expose to frontend. |
| `EXPIRESIN` | JWT lifetime passed to `jsonwebtoken`; actual value absent from `.env.example`. |
| `NODE_ENV` | Loaded; environment-specific behavior not found in inspected source. |
| `PDF_SERVICE_URL` | Base for `${...}/api/v1/pdf/upload`; used but missing in `.env.example`. |
| `PDF_ANALYZER_URL` | Base for `${...}/api/v1/pdf/classify`; used but missing in `.env.example`. |
| `OCR_SERVICE_URL` | Read from environment; no usage found in main route/service flow. |

Current CORS allows `http://localhost:8081`, credentials, methods GET/POST/PATCH/DELETE/OPTIONS, and headers Content-Type/Authorization. Update backend allowlist for the deployed frontend origin. Credentials are enabled, but this API returns a JWT in JSON and sets no cookie.

Do not copy values from a local backend `.env` into frontend configuration or docs.
