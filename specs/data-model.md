erDiagram
    CANDIDATE {
        string id PK "UUIDv4"
        string name "Max 100 chars"
        string email UK "Unique format string"
        string phone "E.164 format string"
        integer age "Range: 18 - 99"
        string country "ISO 3166-1 alpha-2 or standard text"
        string city "Standard text"
        string english_level "Enum: A1, A2, B1, B2, C1, C2"
        string status "Enum: IN_REVIEW, ACCEPTED, REJECTED"
        datetime created_at
        datetime updated_at
    }

    CV_DOCUMENT {
        string id PK "UUIDv4"
        string candidate_id FK "References CANDIDATE(id)"
        string file_name "Max 255 chars"
        string file_path "Storage reference URI"
        integer file_size_bytes "Max 5MB (5242880 bytes)"
        string mime_type "Strictly 'application/pdf'"
        datetime uploaded_at
    }

    CANDIDATE ||--|| CV_DOCUMENT : "owns"