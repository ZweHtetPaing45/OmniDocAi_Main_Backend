# 3. API Reference

## Shared conventions

- Base URL: `http://<host>:<port>/api/v1`; default local URL is `http://localhost:5000/api/v1`.
- JSON requests use `Content-Type: application/json`.
- Protected requests use `Authorization: Bearer <token>`.
- Error JSON is `{ "message": "..." }`; errors do not include a standard `success` field.
- No pagination, search, sort, or filter parameters are implemented.

## Register — `POST /auth/register`

Public JSON body: required, non-empty `username` (string), `email` (string), `password` (string). Only presence/truthiness is checked; format/length constraints are **Not Found in Backend Source Code**. Success is HTTP 201:

```json
{"success":true,"message":"User registered successfully","data":{"id":12,"username":"Aye Aye","email":"aye@example.com","create_at":"2026-11-06T00:00:00.000Z"}}
```

Values are representative. Timestamp serialization/time zone is **Needs Backend Developer Confirmation**. Password is excluded. Duplicate email returns 400 `{ "message": "User already exists" }`.

## Login — `POST /auth/login`

Public JSON body: required, non-empty `email` and `password` strings. Success is HTTP 200:

```json
{"success":true,"message":"User logged in successfully","data":{"user":{"id":12,"username":"Aye Aye","email":"aye@example.com","create_at":"2026-11-06T00:00:00.000Z"},"token":"<jwt>"}}
```

Unknown email: 404 `User not found`; wrong password: 401 `Invalid password`. Token duration depends on `EXPIRESIN`, whose deployed value is not specified.

## Upload PDF — `POST /pdf/upload`

Requires bearer auth and `multipart/form-data`: required file field `pdf`; text field `title` is read but not validated. Postman includes title. The user ID, file name/path, page count, and page records are derived server-side. Success is HTTP 201:

```json
{"message":"pdf file upload successfully","result":{"document_id":34,"title":"First Project","file_name":"sample.pdf","file_path":"<downstream upload URL>","total_pages":2,"pages":[{"page_number":1,"content":null,"pdf_image_url":"<page image URL>","pdf_delete_id":"<folder>/<image name>"}]}}
```

Page count, URLs, and image IDs come from the downstream PDF service. The upload response's page fields are snake_case; page listing returns entity fields in camelCase plus `audio_path`. Errors include 400 `File is required` or `Upload Pdf Error`; see upload guide for 30 MiB limit.

## List current user's pages — `GET /document_page/`

Requires bearer auth. No parameters. HTTP 200 `{ "result": [...] }`. The route returns a flat row for each page, not grouped documents. Rows are restricted to the authenticated user and ordered by document ID then page number; no pagination.

```json
{"result":[{"pageId":101,"documentId":34,"document_name":"sample.pdf","pageNumber":1,"content":null,"imageUrl":"<page image URL>","deleteId":"<folder>/<image name>","audio_path":null}]}
```

Empty result is `[]`.

## Get document pages — `GET /document_page/:documentId`

Requires bearer auth. `documentId` is converted with `Number(...)`; explicit positive-integer validation is **Not Found in Backend Source Code**. HTTP 200 `{ "message": "Document Pdf", "result": [...] }` with page fields above. An unowned/nonexistent ID currently returns HTTP 200 with an empty array.

## Update page content — `PATCH /document_page/:page_id`

Requires bearer auth. Path `page_id` is the page-row ID. JSON body `{ "content": "recognized or edited text" }`. `content` must be truthy, so `""` cannot clear it. Success is HTTP 201 `{ "success": true, "message": "Update Content Successfully" }`. Repository does not check affected rows; missing/unowned page may still get success (**Needs Backend Developer Confirmation**).

## Analyze PDF — `POST /process/pdf_analysis`

Requires bearer auth and multipart fields `pdf` (file) and `pages` (JSON string array of `{pageId:string,pageNumber:number,imageUrl:string}`). `pageId` refers to a page row. Postman demonstrates this shape. Success is HTTP 201:

```json
{"success":true,"message":"pdf change text successfully","result":"<downstream analyzer response data>"}
```

The backend forwards the file as field `file` plus JSON `pages` to `${PDF_ANALYZER_URL}/api/v1/pdf/classify`. It reads results from `response.data.data.results`, joins each result's `lines` with newline (or falls back to `text`), updates matching owned pages, then returns `response.data`. The concrete `result` shape is **Needs Backend Developer Confirmation**; no analyzer response fixture exists. Missing results returns 400 `No page results returned from PDF analyzer`; downstream failure returns 400 `Upload Pdf analyzer Error`.

## Shared authentication errors

Missing or non-Bearer authorization header: 401 `Token not provided`; invalid/expired token (including a `Bearer ` header with no usable token): currently generic HTTP 500 `interface Server Error`; token for a deleted user: 404 `Owner not found`.
