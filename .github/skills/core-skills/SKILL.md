---
name: core-skills
description: Development rules, constraints, and architecture guidelines for building the recruitment web application (Express/TS/SQLite Backend and React/TS/Vite Frontend).
user-invocable: true
---
# AI Agent Skills for Recruitment Web App

Act as an expert full-stack developer. You must strictly adhere to the following architecture, patterns, and validation constraints when generating code, endpoints, or UI components for this repository.

## Backend (Node.js + Express + TypeScript + SQLite)
- **Boilerplate**: Generate Express server configurations with CORS, JSON middleware, global error-handling middleware, and file upload support using `multer`.
- **Database Connection**: Create an SQLite database connection using `sqlite3` (or `better-sqlite3`) and automatically initialize database tables matching the schema defined in the reference section.
- **REST Endpoints**: Strictly implement and conform to the following API contracts:
  - `POST /api/candidates` (Accepts `multipart/form‑data` containing candidate fields and a PDF file).
  - `GET /api/candidates` (Supports optional URL query filters: `country`, `city`, `english_level`).
  - `PUT /api/candidates/:id/status` (Updates the candidate application status field).
  - `GET /api/uploads/:filename` (Serves static uploaded PDF files securely).
- **Input Validation**:
  - Enforce proper email format, numeric age range between 18 and 99, and phone numbers matching the E.164 pattern standard.
  - Reject non-PDF resumes. Restrict file sizes to a maximum of 5MB. Store file metadata records inside the `CV_DOCUMENT` table.
- **Data Constraints**:
  - Generate and use UUIDv4 strings for all database primary keys.
  - Enforce strict foreign key constraints between the `CANDIDATE` and `CV_DOCUMENT` tables.
  - Utilize the explicit status enumeration: `IN_REVIEW`, `ACCEPTED`, `REJECTED`.
- **SQL Execution**: Write clean, parameterized SQL queries for filtering candidate lists, modifying application statuses, and executing transaction-safe candidate creations alongside file metadata tracking.

## Frontend (React + TypeScript + Vite)
- **UI Design**: Create responsive layouts and modern interfaces using CSS Modules or Tailwind CSS, following a strict mobile‑first design philosophy.
- **Registration Form**: Build a public-facing onboarding form that implements every single field mapped from the relational schema alongside a working file input field.
- **Client-Side Validation**:
  - Mark all input fields as mandatory (including the PDF file upload).
  - Test constraints locally via email regex, numeric age boundary limits (18‑99), `.pdf` extension filters, and file sizes capped under 5MB.
- **Admin Panel Control**:
  - Render a data table listing all submitted applications display columns for: name, email, phone, age, country, city, english_level, and status.
  - Apply traffic‑light conditional styling to the `english_level` cell:
    - **Green**: `B2`, `C1`, `C2`
    - **Yellow**: `B1`
    - **Red**: `A1`, `A2`
  - Render live controls to filter results dynamically by country (text or dynamic dropdown selection), city, and English level.
  - Implement row actions: "View CV" (opens the respective target PDF link in a new browser tab) and "Change Status" (dropdown element or three action-labeled buttons).
- **API Integration**: Communicate exclusively with the Express backend using standard `fetch` syntax.
- **UX States**: Always handle pending asynchronous loading states and manage visual error catch displays gracefully.

## General Engineering Guidelines
- **Type Safety**: Produce robust, clean TypeScript data models and interfaces that mirror the precise schema definition of the system.
- **Architecture**: Enforce a strict separation of concerns directory structure layout (e.g., separating routes, controllers, database models, and custom middlewares).
- **Prompts & Logging**:
  - Keep AI prompts completely self-contained. Each isolated prompt must target only one feature, layout, or file blueprint at a time.
  - Track development iteration context by appending every executed conversational prompt alongside its manual overrides inside `prompts/prompt-log.md`.
