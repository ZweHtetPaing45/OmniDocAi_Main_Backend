# 8. TypeScript Interfaces

Types mirror fields constructed, consumed, or serialized by the source. Date/time wire format is usually ISO-8601 under JSON serialization, but DB timezone/type is unconfirmed.

```ts
export interface UserPublic {
  id: number;
  username: string;
  email: string;
  create_at: string;
}
export interface RegisterRequest { username: string; email: string; password: string; }
export interface RegisterResponse { success: true; message: string; data: UserPublic; }
export interface LoginRequest { email: string; password: string; }
export interface LoginResponse {
  success: true; message: string;
  data: { user: UserPublic; token: string };
}

export interface DocumentPage {
  pageId: number | null;
  documentId: number | null;
  document_name: string;
  pageNumber: number | null;
  content: string | null;
  imageUrl: string | null;
  deleteId: string | null;
  audio_path: string | null;
}
export interface DocumentPagesResponse { message?: "Document Pdf"; result: DocumentPage[]; }
export interface UploadedPage {
  page_number: number; content: string | null; pdf_image_url: string; pdf_delete_id: string;
}
export interface UploadResponse {
  message: string;
  result: {
    document_id: number; title: string; file_name: string; file_path: string;
    total_pages: number; pages: UploadedPage[];
  };
}
export interface UpdatePageRequest { content: string; }
export interface UpdatePageResponse { success: true; message: string; }
export interface AnalysisPageInput { pageId: string; pageNumber: number; imageUrl: string; }
export interface AnalysisResponse {
  success: true; message: string;
  // Actual shape is configured analyzer's response.data; not defined here.
  result: unknown;
}
export interface APIError { message: string; }
```

Upload response URLs and page identifiers are produced by the external converter. These types reflect what the main backend assumes/constructs, not validated downstream contracts. The declared analyzer DTO uses numeric `pageId`, while the active use case converts page IDs to strings before returning. Keep the analyzer result as `unknown` until sample responses are supplied.
