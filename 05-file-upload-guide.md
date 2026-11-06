# 5. File Upload and PDF Processing

## Upload a PDF

`POST /api/v1/pdf/upload` requires a valid bearer token and `multipart/form-data`:

| Field | Type | Required | Meaning |
|---|---|---:|---|
| `pdf` | File | Yes | Single Multer file, converted by the configured PDF service. |
| `title` | Text | Not enforced | Saved as document title; send it because absence may violate DB constraints. |

Multer uses memory storage with a maximum size of **30 MiB** (`30 * 1024 * 1024`). It has no extension or MIME allowlist. The application expects a PDF but server-side PDF type validation is **Not Found in Backend Source Code**.

The external PDF service receives multipart field `pdf` at `${PDF_SERVICE_URL}/api/v1/pdf/upload`. Its output supplies the upload path, page images, page count, and image IDs that are stored. This backend exposes no static upload directory or file-serving route. Browser display/download access and hosting CORS/auth rules are **Needs Backend Developer Confirmation**.

```ts
const form = new FormData();
form.append("pdf", file);
form.append("title", title);
const response = await api.post("/pdf/upload", form);
```

Let the browser/Axios set the multipart boundary.

## Analyze selected pages

`POST /api/v1/process/pdf_analysis` requires auth and multipart fields `pdf` (file) and `pages` (JSON string array). Items contain `pageId`, `pageNumber`, `imageUrl`. Backend forwards file under field `file` and pages as JSON to `${PDF_ANALYZER_URL}/api/v1/pdf/classify`, then saves returned `lines` (joined with newline) or `text` to each matched page's `content`.

```ts
form.append("pdf", sourcePdf);
form.append("pages", JSON.stringify(selectedPages));
```

Whether the PDF must be the exact source used for the saved document is **Needs Backend Developer Confirmation**.

## Deletion and access

- Internal helper `deleteImage(folder,id)` calls `DELETE ${PDF_SERVICE_URL}/api/delete/...`, but no main-backend route exposes it.
- Direct OCR requests in Postman target a separate OCR service.
- `imageUrl` is returned/stored, but this API does not proxy image bytes.
- `audio_path` is selected and returned, but audio generation and retrieval endpoints are **Not Found in Backend Source Code**.
- No cleanup on failed DB insert is visible.
