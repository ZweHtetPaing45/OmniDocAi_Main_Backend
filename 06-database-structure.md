# 6. Database Structure

The source uses MySQL and references three tables. No DDL/migrations/schema dump was supplied. Column SQL types, nullability, defaults, indexes, primary/foreign-key constraints, and cascade behavior are **Not Found in Backend Source Code**.

## `users`

| Column | Observed use | Type/constraints |
|---|---|---|
| `id` | Lookup, insert ID, JWT claim | Treated as number; SQL type unknown. |
| `username` | Insert and public response | String in TypeScript; SQL type unknown. |
| `email` | Lookup and insert | String in TypeScript; uniqueness not confirmed. |
| `password` | bcrypt hash stored; excluded from public DTO | Hash string; SQL type unknown. |
| `create_at` | Returned to client | SQL type/time zone unknown. |

Duplicate email is checked in application code, but database uniqueness is not confirmed.

## `documents`

| Column | Observed use | Type/constraints |
|---|---|---|
| `id` | Insert ID; page relationship | Treated as number; SQL type unknown. |
| `user_id` | Ownership filter and relationship | Treated as number; SQL type unknown. |
| `title` | Client-supplied title | String expected; SQL type unknown. |
| `file_name` | Original filename; exposed as `document_name` | String expected; SQL type unknown. |
| `file_path` | Converted PDF path/URL | String expected; SQL type unknown. |
| `total_pages` | Converter page count | Number expected; SQL type unknown. |

## `document_pages`

| Column | Observed use | Type/constraints |
|---|---|---|
| `id` | Exposed as `page_id`; update key | Treated as number/string at boundaries. |
| `document_id` | Join to `documents.id` | SQL type unknown. |
| `page_number` | 1-based sequence and ordering | Number expected. |
| `content` | OCR/editor text; nullable on initial create | String or null in entity. |
| `pdf_image_url` | Page image reference | String or null. |
| `pdf_delete_id` | Folder/image identifier | String or null. |
| `audio_path` | Selected and returned, not written by exposed flow | String or null. |

## Relationships and API data

SQL joins `documents.id = document_pages.document_id`; pages are scoped using `documents.user_id`. The API returns a flat page array with `pageId`, `documentId`, `document_name` (the stored `file_name`), `pageNumber`, `content`, `imageUrl`, `deleteId`, and `audio_path`. It does not return document `title`, `file_path`, or `total_pages` in page listing.

Obtain the actual schema from the backend owner before relying on constraints, timestamp formatting, or migration behavior.
