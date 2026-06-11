@file:core-skills Propose the complete folder structure for this recruitment web app following our separation of concerns guidelines. Include both backend and frontend directories, but do not write any implementation code yet. Use the @file:data-model.md and @file:user-stories.md already provided.

After proposing the structure, create a planning.md file in the root with a detailed task list (todo/doing/done) covering: database setup, all API endpoints, public registration form, admin panel (table, filters, traffic‑light, status change, PDF viewer), validation, and documentation. Mark the initial folder creation task as [x] done and leave others as [ ] todo. Output only the folder tree and the content of planning.md.

The planning is ready and all dependencies have already been installed manually. Do not generate installation commands. Focus exclusively inside @file:backend

Generate a strict-mode tsconfig.json.
Create src/index.ts setting up the Express server on port 5000 with CORS, JSON middleware, and a /health endpoint.
Do not touch the frontend or implement the database yet.

Implement the database schema required for @file:user-stories.md User Story 1 (Registration), User Story 2 (Admin Table), and User Story 3 (Filters). In @file:schema.ts , write SQLite table definitions for CANDIDATE and CV_DOCUMENT exactly as in the ER diagram (UUIDs, foreign key, status default ‘IN_REVIEW’). In @file:connection.ts , create a singleton connection and initialisation function. Do not write API endpoints yet.


##### Intermedia Chat to fix the connection between the database and server
 The database schema and connection files are ready, but the initialization logic is not running yet. focus on this files @ThirdChallenge/backend/src/db/connection.ts @ThirdChallenge/backend/src/index.ts to: 1. Import the database initialization funciton into @ThirdChallenge/backend/src/index.ts  , call the initialization  before the app.listen(5000) statement execution to ensure tables are created on startup. 2. Add proper error handling (try/catch) around the initialization call so the server logs any database startup failures and terminates gracefully if needed. 
 Do not implement any API endpoints yet


Using the @file:connection.ts and following the @file:schema.ts Implement User Story 1(Candidate Registration) completely in the backend. Create endpoint POST /api/candidates that accepts multipart/form-data with all candidate fields + a PDF. Use multer middleware (file max 5MB, only PDF). Save the file to public/uploads/ with a UUID name. Insert into CANDIDATE and CV_DOCUMENT tables. Validate: age 18-99, email format, phone E.164, file required. Return 201 with candidate ID. Write the route in routes/candidates.ts, controller in controllers/candidateController.ts, model in models/Candidate.ts and models/CVDocument.ts, Also add the respective new routes in the @file:index.ts . After success, the candidate’s status should be ‘IN_REVIEW’ as per the story.


### Frontend chat 
Following the current structure for frontend, and the respective @file:planning.md Implement User Story 1 (Candidate Registration) completely in the frontend.
Create @sym:RegistrationPage  that renders the RegistrationForm component.
In src/components/RegistrationForm/RegistrationForm.tsx:

Build a responsive form with fields: name, email, phone, age, country, city, dropdown for English level (A1, A2, B1, B2, C1, C2), and a file input for PDF (mandatory).
Add client‑side validation: all fields required, email format, age 18‑99, file must be .pdf and ≤5MB.
On submit, send multipart/form-data to POST /api/candidates using axios (use src/api/candidateApi.ts).
Show loading spinner (LoadingSpinner component), success message, and error messages.
Use RegistrationForm.module.css for styling (mobile‑first CSS Grid or Flex).
After successful registration, clear the form or redirect to a thank‑you page.
Also create src/api/apiClient.ts with a configured axios instance pointing to http://localhost:5000.
Write the necessary TypeScript types in src/types/index.ts matching the backend response.
