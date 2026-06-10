# Recruitment Web App - Development Planning

**Project**: Candidate Recruitment Management System  
**Tech Stack**: 
- Backend: Node.js + Express + TypeScript + SQLite
- Frontend: React + TypeScript + Vite

---

## Task Breakdown by Category

### Database Setup
- [x] Create folder structure for backend and frontend
- [x] Install backend dependencies (express, sqlite3, multer, dotenv, uuid)
- [ ] Create `.env` configuration for backend (database path, port, upload directory)
- [ ] Implement SQLite connection setup (`backend/src/db/connection.ts`)
- [ ] Create database schema initialization (`backend/src/db/schema.ts`) with CANDIDATE and CV_DOCUMENT tables
- [ ] Set up database migrations structure (`backend/src/db/migrations/`)

### API Endpoints - Core Implementation
- [ ] Define shared TypeScript types and interfaces (`backend/src/types/index.ts`)
- [ ] Create validation schemas for candidate data (`backend/src/validators/schemas.ts`, `candidateValidator.ts`)
- [ ] Implement error handling middleware (`backend/src/middleware/errorHandler.ts`)
- [ ] Implement upload middleware with multer config (`backend/src/middleware/uploadMiddleware.ts`)
- [ ] Create data models for Candidate and CVDocument (`backend/src/models/`)

### API Endpoint: POST /api/candidates
- [ ] Implement candidate controller - create candidate (`backend/src/controllers/candidateController.ts`)
- [ ] Implement file upload logic with validation (PDF only, max 5MB)
- [ ] Store candidate record with UUIDv4 primary key
- [ ] Create CV_DOCUMENT metadata record linked to candidate
- [ ] Set initial status to `IN_REVIEW`
- [ ] Implement route handler (`backend/src/routes/candidates.ts`)

### API Endpoint: GET /api/candidates
- [ ] Implement candidate retrieval controller with filtering logic
- [ ] Support optional query filters: `country`, `city`, `english_level`
- [ ] Join candidate records with CV document metadata
- [ ] Return full candidate profiles with file information
- [ ] Implement route handler with query parameter parsing

### API Endpoint: PUT /api/candidates/:id/status
- [ ] Implement status update controller with validation
- [ ] Validate status values (IN_REVIEW, ACCEPTED, REJECTED only)
- [ ] Update `status` field and `updated_at` timestamp
- [ ] Return updated candidate record
- [ ] Implement route handler

### API Endpoint: GET /api/uploads/:filename
- [ ] Implement secure file serving for uploaded PDFs
- [ ] Validate file path to prevent directory traversal attacks
- [ ] Set appropriate Content-Type headers (application/pdf)
- [ ] Implement upload controller and route handler
- [ ] Create public uploads directory (`backend/public/uploads/`)

### Backend Integration & Validation
- [ ] Set up Express server with CORS and JSON middleware (`backend/src/app.ts`, `server.ts`)
- [ ] Configure all routes in main router (`backend/src/routes/index.ts`)
- [ ] Implement input validation middleware (`backend/src/middleware/validationMiddleware.ts`)
- [ ] Test all endpoints with sample requests
- [ ] Add request logging and error handling

### Frontend Setup
- [ ] Install frontend dependencies (react, react-dom, typescript, vite, axios or fetch helpers)
- [ ] Create `.env` configuration for frontend (API base URL)
- [ ] Set up Vite configuration and build scripts
- [ ] Create global styles (`frontend/src/styles/globals.css`)
- [ ] Define shared types and interfaces (`frontend/src/types/index.ts`)

### Frontend - Registration Form (Public Route)
- [ ] Create form component (`frontend/src/components/RegistrationForm/RegistrationForm.tsx`)
- [ ] Implement form fields: name, email, phone, age, country, city, english_level, cv_file
- [ ] Add client-side validation for each field:
  - Email: valid format (regex)
  - Phone: E.164 format
  - Age: 18-99 range
  - CV File: .pdf only, max 5MB
  - All fields: required
- [ ] Create form types/interfaces (`frontend/src/components/RegistrationForm/types.ts`)
- [ ] Implement custom hook for form state management (`frontend/src/hooks/useForm.ts`)
- [ ] Create form styles (`frontend/src/components/RegistrationForm/RegistrationForm.module.css`)
- [ ] Add loading states and error handling UI
- [ ] Implement success confirmation message after submission

### Frontend - API Integration
- [ ] Create API client utilities (`frontend/src/api/apiClient.ts`)
- [ ] Create candidate API functions (`frontend/src/api/candidateApi.ts`):
  - `submitCandidate(formData)` - POST /api/candidates
  - `fetchCandidates(filters)` - GET /api/candidates
  - `updateCandidateStatus(id, status)` - PUT /api/candidates/:id/status
  - `getUploadUrl(filename)` - GET /api/uploads/:filename
- [ ] Handle request/response errors with user-friendly messages
- [ ] Implement retry logic and timeout handling

### Frontend - Admin Panel (Candidates Table)
- [ ] Create admin panel main component (`frontend/src/components/AdminPanel/AdminPanel.tsx`)
- [ ] Implement candidate data table (`frontend/src/components/AdminPanel/CandidateTable.tsx`):
  - Display columns: Name, Email, Phone, Age, Country, City, English Level, Status
  - Render all candidate records from API
- [ ] Implement traffic-light color coding for English Level:
  - Green (B2, C1, C2)
  - Yellow (B1)
  - Red (A1, A2)
- [ ] Add table styling (`frontend/src/components/AdminPanel/AdminPanel.module.css`)

### Frontend - Admin Panel (Filter Controls)
- [ ] Create filter controls component (`frontend/src/components/AdminPanel/FilterControls.tsx`)
- [ ] Implement country filter (text input or dropdown)
- [ ] Implement city filter (text input or dependent dropdown)
- [ ] Implement English level filter (multi-select or dropdown)
- [ ] Add filter reset button
- [ ] Implement custom hook for filter state (`frontend/src/hooks/useFilters.ts`)
- [ ] Dynamically update table on filter change
- [ ] Create filter styles

### Frontend - Admin Panel (Status Update)
- [ ] Create status dropdown component (`frontend/src/components/AdminPanel/StatusDropdown.tsx`)
- [ ] Implement status change action in table rows
- [ ] Add three-button layout or dropdown for status options (In Review, Accepted, Rejected)
- [ ] Add confirmation before status change
- [ ] Display "Status updated successfully" notification on success
- [ ] Handle API errors gracefully

### Frontend - Admin Panel (PDF Viewer)
- [ ] Create CV viewer component (`frontend/src/components/AdminPanel/CVViewer.tsx`)
- [ ] Add "View CV" action button in table rows
- [ ] Open PDF in new browser tab on click
- [ ] Use GET /api/uploads/:filename endpoint to retrieve file
- [ ] Handle missing or invalid files with error message

### Frontend - Common Components
- [ ] Create header component (`frontend/src/components/Common/Header.tsx`)
- [ ] Create footer component (`frontend/src/components/Common/Footer.tsx`)
- [ ] Create loading spinner component (`frontend/src/components/Common/LoadingSpinner.tsx`)
- [ ] Create error alert component (`frontend/src/components/Common/ErrorAlert.tsx`)
- [ ] Create layout wrapper (`frontend/src/components/Layout/Layout.tsx`)
- [ ] Implement common component styles (`frontend/src/components/Common/Common.module.css`)

### Frontend - Pages & Routing
- [ ] Create registration page (`frontend/src/pages/RegistrationPage.tsx`)
- [ ] Create admin page (`frontend/src/pages/AdminPage.tsx`)
- [ ] Create 404 not found page (`frontend/src/pages/NotFoundPage.tsx`)
- [ ] Set up React Router with routes:
  - `/` - Registration page
  - `/admin` - Admin panel
  - `*` - Not found page
- [ ] Implement main App component with router (`frontend/src/App.tsx`)

### Frontend - Utility Functions
- [ ] Create validation utilities (`frontend/src/utils/validation.ts`):
  - Email validation regex
  - Phone validation (E.164)
  - Age range check (18-99)
  - PDF file validation
- [ ] Create formatter utilities (`frontend/src/utils/formatters.ts`):
  - Format phone numbers for display
  - Format dates
  - Display English level labels
- [ ] Create constants file (`frontend/src/utils/constants.ts`):
  - API endpoints
  - English level options
  - Status options
  - Error messages

### Frontend - Responsive Design & UX
- [ ] Apply mobile-first CSS design approach
- [ ] Test responsive breakpoints (mobile, tablet, desktop)
- [ ] Implement loading state indicators on async operations
- [ ] Add visual feedback for form interactions
- [ ] Ensure accessibility (ARIA labels, semantic HTML)
- [ ] Test error states and edge cases

### Documentation & Logging
- [ ] Create API documentation (endpoint specs, request/response examples)
- [ ] Document environment variables (`.env.example` files for both backend and frontend)
- [ ] Create setup and installation guide
- [ ] Document folder structure and architecture rationale
- [ ] Create database schema documentation
- [ ] Log all prompts and manual overrides to `prompts/prompt-log.md`
- [ ] Add inline code comments for complex logic

### Testing & Validation
- [ ] Manual test: Submit registration form with valid data
- [ ] Manual test: Verify candidate appears in admin table
- [ ] Manual test: Filter candidates by country, city, English level
- [ ] Manual test: Change candidate status and verify update
- [ ] Manual test: Open candidate CV in new tab
- [ ] Manual test: Test validation errors (invalid email, age, file format, file size)
- [ ] Manual test: Test API error handling (500, 400, 404 responses)
- [ ] Manual test: Verify traffic-light colors render correctly
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsiveness testing

### Deployment Preparation
- [ ] Add production environment configuration
- [ ] Implement security headers (CORS, CSP)
- [ ] Set up file upload security (virus scanning, size limits enforcement)
- [ ] Create deployment guide
- [ ] Set up database backup strategy

---

## Architecture Notes

**Separation of Concerns:**
- **Database Layer**: `src/db/` - schema, migrations, connection management
- **Data Models**: `src/models/` - database entity definitions
- **Business Logic**: `src/controllers/` - request handling and data processing
- **Route Handling**: `src/routes/` - endpoint definitions
- **Validation**: `src/validators/` - input validation schemas and logic
- **Middleware**: `src/middleware/` - cross-cutting concerns (auth, error handling, file uploads)
- **Configuration**: `src/config/` - environment and app configuration
- **Types**: `src/types/` - shared TypeScript interfaces

**Frontend Architecture:**
- **Pages**: Top-level route components
- **Components**: Reusable UI components (Common, Registration, AdminPanel)
- **Hooks**: Custom React hooks for state management
- **API**: HTTP client and candidate API functions
- **Utils**: Helper functions (validation, formatting, constants)
- **Types**: TypeScript interfaces and type definitions
- **Styles**: CSS modules for component styling

---

## Key Constraints & Decisions

1. **File Uploads**: Only PDF format allowed, max 5MB per spec
2. **Primary Keys**: UUIDv4 for all database records
3. **Status Enum**: IN_REVIEW (default), ACCEPTED, REJECTED
4. **English Level Enum**: A1, A2, B1, B2, C1, C2 as per data model
5. **API Format**: RESTful with JSON request/response bodies
6. **CSV file uploads**: Excluded from scope (only CV PDFs)
7. **Authentication**: No authentication required for public registration or admin panel (can be added later)
8. **Database**: SQLite for simplicity (migration to PostgreSQL possible later)

---

## Implementation Priority

**Phase 1 (Critical Path):**
1. Database schema and connection
2. All API endpoints (candidates CRUD, file serving)
3. Input validation on backend and frontend

**Phase 2 (Core Features):**
1. Registration form UI
2. Admin table with basic display
3. Filter controls
4. Status update functionality

**Phase 3 (Polish):**
1. Traffic-light styling
2. PDF viewer integration
3. Loading/error states
4. Responsive design refinement

---

## Notes for Implementation

- Follow SOLID principles and DRY (Don't Repeat Yourself)
- Use TypeScript strict mode for type safety
- Implement parameterized SQL queries to prevent injection
- Use proper error handling throughout (try-catch, promise rejection handling)
- Maintain consistency in naming conventions (camelCase for JS/TS, snake_case for SQL)
- Keep API responses consistent with error format: `{ success: boolean, data?: any, error?: string }`