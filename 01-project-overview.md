# 1. Project Overview

## What this backend does

The supplied main backend is a Node.js + TypeScript API built with Express 5. It authenticates users, accepts PDF uploads, stores document and page metadata in MySQL, returns a user's pages, updates page text, and forwards selected pages to a PDF classification/analysis service. Results are used to update page content.

## Stack and architecture

- Runtime/framework: Node.js, TypeScript, Express 5.
- Persistence: `mysql2/promise` connection pool; repositories issue SQL directly.
- Authentication: JWT (`jsonwebtoken`) and bcrypt password hashing.
- Upload parsing: Multer memory storage, one uploaded file field per request.
- HTTP clients: Axios and `form-data` for downstream services.
- Organization: HTTP routes/controllers → use cases → repositories/services, with dependency containers.

## API base URL

Routes are mounted under `/api/v1`. Default local URL: `http://localhost:5000/api/v1` (`PORT` can override the port).

## Implemented features

- User registration and login.
- Bearer-token protection for document upload, page listing/retrieval, page text update, and PDF analysis.
- PDF upload and conversion via a configured external PDF service.
- Per-user document-page listing and page content update.
- PDF analysis call with supplied page metadata, then saving returned OCR text into owned page records.

## Not found in source

No refresh-token endpoint, logout/revocation, user profile endpoint, document delete endpoint, file deletion route, document rename, page delete, pagination, search, sort controls, or frontend-facing audio endpoint is implemented. `audio_path` appears in page data but no route generates or serves audio. Validation is mostly presence checks; no Joi schema is wired into routes/controllers.
