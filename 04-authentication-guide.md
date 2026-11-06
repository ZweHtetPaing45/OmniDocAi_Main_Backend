# 4. Authentication Guide

## Register and log in

1. `POST /api/v1/auth/register` with `{username,email,password}` creates an account. Passwords are bcrypt-hashed (cost factor 10); the response omits the password.
2. `POST /api/v1/auth/login` with `{email,password}` verifies the hash and returns `data.token` and a public user object.
3. Add `Authorization: Bearer <token>` to protected API requests.

The backend does not set an auth cookie. Token expiry is passed to `jsonwebtoken` from `EXPIRESIN`; no fixed duration is in source. JWT payload claims are `id`, `email`, and `username`. Middleware verifies the token and reloads the user from MySQL by ID.

## Protected endpoints

- `POST /pdf/upload`
- `GET /document_page/`
- `GET /document_page/:documentId`
- `PATCH /document_page/:page_id`
- `POST /process/pdf_analysis`

Registration and login are public. Logout, refresh, and revocation endpoints are **Not Found in Backend Source Code**. Clearing a frontend token is only a client-side logout; it does not invalidate a copied JWT before expiry.

## Frontend handling

- Keep the token out of URLs and request bodies.
- Attach it only to protected API calls.
- On HTTP 401, clear local auth state and send the user to login. Note: invalid/expired JWTs currently surface as HTTP 500 because verification throws a plain error.
- Duplicate registration returns 400; unknown login email returns 404; wrong password returns 401.
- The backend provides no roles/permission claims or current-user route.

Expiry duration and desired behavior for invalid tokens are **Needs Backend Developer Confirmation**.
