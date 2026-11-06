# 7. React + TypeScript + Tailwind Integration

## Configure the API URL

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Use the deployed backend origin per environment. Source CORS currently allows only `http://localhost:8081`, credentials, GET/POST/PATCH/DELETE/OPTIONS, and Content-Type/Authorization. The backend allowlist must include the deployed frontend origin.

## Fetch client

```ts
const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token"); // align storage with application security policy
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(body.message ?? `HTTP ${response.status}`), { status: response.status, body });
  return body as T;
}
```

Do not set multipart Content-Type manually; browser adds the boundary.

## Auth calls

```ts
export const register = (input: RegisterRequest) => request<RegisterResponse>("/auth/register", {
  method: "POST", body: JSON.stringify(input),
});
export const login = (input: LoginRequest) => request<LoginResponse>("/auth/login", {
  method: "POST", body: JSON.stringify(input),
});
// After login: localStorage.setItem("token", result.data.token)
```

Token is `data.token`. There is no refresh/logout API; clearing it is frontend-only logout. Invalid JWT may surface as 500; see the error guide.

## Upload, pages, and content

```ts
export async function uploadPdf(file: File, title: string) {
  const form = new FormData(); form.append("pdf", file); form.append("title", title);
  return request<UploadResponse>("/pdf/upload", { method: "POST", body: form });
}
export const listPages = () => request<{ result: DocumentPage[] }>("/document_page/");
export const getDocumentPages = (id: number) => request<DocumentPagesResponse>(`/document_page/${id}`);
export const updatePageContent = (id: number, content: string) => request<UpdatePageResponse>(`/document_page/${id}`, {
  method: "PATCH", body: JSON.stringify({ content }),
});
```

Update rejects empty content. There is no API pagination; fetch the full list and paginate in the UI if appropriate.

## Analyze pages

```ts
const form = new FormData(); form.append("pdf", sourcePdf);
form.append("pages", JSON.stringify(selectedPages));
const analysis = await request<AnalysisResponse>("/process/pdf_analysis", { method: "POST", body: form });
```

Keep analyzer results loosely typed until a real response fixture is provided.

## UI behavior and organization

- Disable submit actions while requests are pending. API exposes no progress endpoint.
- Validate required fields and title in UI; server only checks auth field presence and PDF presence. Check PDF type and <=30 MiB client-side, but server MIME/extension validation is absent.
- Render `content` as text, preserving newlines. Confirm image URL reachability before relying on it; do not assume `file_path` is a download URL.
- Show backend `message`; distinguish HTTP errors from offline/CORS failures. No field-level validation payload exists.
- Tailwind styling has no API-specific requirements.

Suggested layout: `src/api/http.ts`, `api/auth.ts`, `api/documents.ts`, `types/api.ts`, and feature pages/components. See [the interfaces](08-typescript-interfaces.md).
