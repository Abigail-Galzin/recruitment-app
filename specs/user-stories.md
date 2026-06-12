# User Stories & Acceptance Criteria (Gherkin Style)

### **User Story 1: Candidate Registration**
**As a** job applicant  
**I want to** submit my personal information and upload my CV  
**So that** I can apply for an open position seamlessly.

> **Scenario: Successful candidate registration with all mandatory data**  
> **Given** the public registration form is available and functioning  
> **When** the candidate fills in the following valid data:  
> | Field | Value |
> | :--- | :--- |
> | Name | John Doe |
> | Email | john.doe@example.com |
> | Phone | +123456789 |
> | Age | 28 |
> | Country | Bolivia |
> | City | Cochabamba |
> | English Level | B2+ |  

> **And** attaches a valid document in `.pdf` format as their CV  
> **And** submits the form  
> **Then** the system should save the candidate profile  
> **And** set the initial application status to `"In Review"`  
> **And** display a registration success confirmation message.

---
### **User Story 2: View Candidate List in Admin Panel**
**As an** HR Administrator  
**I want to** view a master list of all registered candidates in a table with color-coded language highlights  
**So that** I can quickly scan and assess the talent pool.

> **Scenario: Accessing the admin table with traffic-light status system active**  
> **Given** candidates exist in the system with "B2+", "B1", and "A2" English levels  
> **When** the administrator navigates to the Admin Panel dashboard  
> **Then** the system should display a data table containing all candidates  
> **And** the English Level indicator for "B2+" must be highlighted in **Green**. 
> **And** the English Level indicator for "B1" must be highlighted in **Yellow**. 
> **And** the English Level indicator for "A2" must be highlighted in **Red**.

---

### **User Story 3: Filter Candidates by Location and Language**
**As an** HR Administrator  
**I want to** filter the candidate table by country, city, and English proficiency  
**So that** I can quickly narrow down applicants matching localized job requirements.

> **Scenario: Filtering the master table by specific criteria**   
> **Given** the admin panel is displaying candidates from multiple locations and varying English levels  
> **When** the administrator sets the Location filter to "Bolivia"  
> **And** sets the English Level filter to "B2+"  
> **Then** the system should dynamically update the table view  
> **And** only show candidates whose profile matches both "Bolivia" and "B2+".

---

### **User Story 4: Change Candidate Application Status**
**As an** HR Administrator  
**I want to** update a candidate's status to "Accepted", "Rejected", or "In Review"  
**So that** I can track and progress applicants through our hiring pipeline stages.

> **Scenario: Successfully transitioning a candidate status**   
> **Given** the administrator is viewing a candidate's profile whose current status is "In Review"  
> **When** the administrator selects and submits a status change to "Accepted"  
> **Then** the system should update the record in the database  
> **And** the candidate's profile status indicator should immediately change to "Accepted"  
> **And** the system should display a "Status updated successfully" notification.

---

### **User Story 5: Open PDF CV**
**As an** HR Administrator  
**I want to** open and view a candidate's uploaded PDF CV document  
**So that** I can review their detailed employment history and background qualifications.

> **Scenario: Viewing an uploaded CV from a candidate profile**   
> **Given** the administrator is inspecting a specific candidate's profile layout  
> **When** the administrator clicks on the attached CV document link  
> **Then** the system should open or stream the original uploaded file directly in a web viewer or new tab  
> **And** ensure the document renders correctly in standard `.pdf` format.
