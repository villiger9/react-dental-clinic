**Project Title**
React Dental Clinic: A single-page appointment manager for a dental clinic. Built with React and Vite for fast development and simple workflows.

**Description**
Purpose: Provide an easy UI to create, view, and manage dental appointments for demo or prototyping purposes.

Highlights: Local API simulation, simple routing, responsive layout, and small component set for quick customization.

**Features**
List Appointments: View all scheduled visits with summary information.

Appointment Details: Open a single appointment to see full details.

Create Appointment: Add new appointments via a form with conflict validation.

Emergency Badge: Mark and visually highlight urgent appointments with a pulse animation.

Time Slot Management: Appointments are restricted to 30-minute intervals.

**Tech Stack**

Frontend: React (JSX) + Vite
Styling: Bootstrap & Bootstrap Icons
Mock Server: json-server for REST API simulation
Data: Local JSON file at data/db.json

**Getting Started**

1. Prerequisites
   Node.js installed on your machine.

2. Installation
   Run the following command to install all dependencies (including json-server):

npm install

3. Running the Project
   To fully use the app, you need to run both the React development server and the JSON Mock Server:

**Option A**: Separate Terminals (Recommended for debugging)

Terminal 1 (Backend):
npm run server

_This starts the API on `http://localhost:8000`_

Terminal 2 (Frontend):
npm run dev

_This starts React on `http://localhost:5173`_

**Option B**: Combined (If you installed concurrently)

npm run start-all

**Project Structure**

Entry: src/main.jsx
Data: data/db.json // Ensure this file exists for the server to watch.
Components: src/components

- BackButton.jsx: Reusable navigation link.
- EmergencyBadge.jsx: Animated badge for urgent cases.

**Usage Notes**

Data Persistence: The app performs GET, POST, and PATCH requests to http://localhost:8000. If the server is not running, the app will display connection errors.

Conflict Checking: The app validates if a time slot is already taken on the selected date before allowing a new appointment to be saved.

Validation: Names must be at least 3 characters, and phone numbers must follow the 09xxxxxxxx format.
