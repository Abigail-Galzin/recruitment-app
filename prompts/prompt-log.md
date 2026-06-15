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

## User Storie 1 backend chat
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


# 2nd story:  frontend
Implement User Story 2 (View candidate list with traffic‑light colours) in the frontend.Create @sym:AdminPage that renders the @file:AdminPanel.tsx component.
Inside @file:AdminPanel.tsx :

Fetch candidates from GET /api/candidates using a custom hook useCandidates @file:useCandidates.ts

Display the data in a table @file:CandidateTable.tsx component

Apply traffic‑light colours to the English level column:Green for B2, C1, C2

Yellow for B1

Red for A1, A2

Handle loading (LoadingSpinner) and error states (ErrorAlert).
For now, status change and filters are not required – just the table and traffic light.

Use @file:AdminPanel.module.css  for styling the table (make it responsive with horizontal scroll on mobile), using CSS classes or inline styles.

## US - 4 : Backend
Implement User Story 4 backend in @file:candidates.ts and @file:candidateController.ts

Add PUT /api/candidates/:id/status endpoint.
Accept JSON body: { status: 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED' }.
Validate status enum, candidate existence, then update the status column and updated_at timestamp.
Return 200 with updated candidate object or 404 if not found.
Add the route to @file:index.ts Use the existing model function updateCandidateStatus(id, status) in @file:Candidate.ts

## US - 4 : Frontend
In @file:StatusDropdown.tsx implement User Story 4 frontend.

For each row in CandidateTable, render a `` with options: IN_REVIEW, ACCEPTED, REJECTED.
On change, call PUT /api/candidates/:id/status using axios (via @file:candidateApi.ts).
On success, show a temporary success message (e.g., ‘Status updated’) and refresh the candidate list by calling refetch() from useCandidates.
Handle errors with ErrorAlert.
Disable the dropdown during the update request.
Integrate StatusDropdown into each row of CandidateTable.

## US - 5: Backend
Implement backend support for User Story 5 (Open PDF CV)
In @file:index.ts , add middleware to serve static files from the @file:uploads  directory at the /uploads route.

Use Express built-in express.static.
Example: app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'))).
Ensure the path resolves correctly regardless of the current working directory (use path.resolve).
Add error handling for missing files (Express will automatically send 404).
No authentication or extra logic required.
This will allow the frontend to open http://localhost:5000/uploads/{filename} directly in a new tab.
Do not modify existing POST or GET endpoints.


--
Fix User Story 5 (Open PDF CV) end‑to‑end. Currently, clicking ‘View CV’ does not open the PDF. The frontend calls /api/uploads/{filename} but it fails. Implement the correct integration
In backend/src/index.ts, add a static route to serve uploaded PDFs.

The files are stored in backend/public/uploads/ (as defined in US1).
Use express.static with the absolute path:
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'))).
Do not use /api/uploads – the API prefix is for JSON endpoints only. Static files should be served from /uploads/... directly.
Ensure the server can access the directory (check permissions).
After adding, restart the server.
Verify by opening http://localhost:5000/uploads/some-uuid.pdf in a browser – it should render or download the PDF.


## US - 5: Frontend
Add a CVViewer component that shows a ‘View CV’ button linking to http://localhost:5000/api/uploads/{cv_file_path} (opens in new tab). Use target="_blank" and rel="noopener noreferrer".
If the cvFileName is missing or null, disable the button and show a tooltip ‘No CV uploaded’.
And the details of the implementation.
