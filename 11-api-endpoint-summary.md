# 11. API Endpoint Summary

| Feature | Method | Endpoint | Authentication | Description |
|---|---|---|---|---|
| Register | POST | `/api/v1/auth/register` | Public | Create user account. |
| Login | POST | `/api/v1/auth/login` | Public | Verify credentials and return JWT. |
| Upload PDF | POST | `/api/v1/pdf/upload` | Bearer JWT | Upload PDF; create document and page records via converter. |
| List pages | GET | `/api/v1/document_page/` | Bearer JWT | Return all current user's page rows. |
| Get document pages | GET | `/api/v1/document_page/:documentId` | Bearer JWT | Return pages for one owned document ID. |
| Update page content | PATCH | `/api/v1/document_page/:page_id` | Bearer JWT | Set text content for a page. |
| Analyze PDF pages | POST | `/api/v1/process/pdf_analysis` | Bearer JWT | Send PDF/page metadata to analyzer and persist returned text. |

This is the complete route set registered in `src/interface/http/v1/routes/api/api.ts`. No logout, delete, pagination, search, sort, or static file-serving endpoint was found.

## Postman comparison

The `Main_Backend` folder contains six requests: register, login, upload, page list, page-by-ID, and PDF analysis. There are no saved responses. The example `document_page/1` is treated as `documentId` by the route.

Other collection folders target separate services: PDF image service (port 3000), digital PDF extraction (ports 4000/5000), OCR (port 4001), and PDF analyzer (port 4002). These are not main-backend routes. Main backend calls PDF conversion and analyzer internally using environment-configured URLs.
