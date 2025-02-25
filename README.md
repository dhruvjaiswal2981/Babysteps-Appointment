# BabySteps Appointment Booking System

## Overview
This project is a **Doctor Appointment Booking System** that allows users to schedule appointments with doctors. It includes a **backend server** built with **Node.js and Express** using **SQLite** as the database and a **frontend** built with **React.js**.

## Features
- **Doctor Management**: Add, view, and list doctors.
- **Appointment Booking**: Book, update, and delete appointments.
- **Available Slots**: Retrieve available appointment slots for a specific doctor on a given date.
- **RESTful API**: Backend provides endpoints for managing doctors and appointments.
- **Frontend UI**: A user-friendly React-based interface to interact with the system.

## Assumptions & Design Decisions
- The system operates between **08:00 AM to 04:00 PM**, with **30-minute slots** for appointments.
- The database uses **SQLite** for simplicity and ease of local setup.
- Each doctor has a fixed working schedule.
- API endpoints are designed with **RESTful principles**.
- The frontend consumes the backend API via **fetch/axios**.

---

## Installation & Setup

Clone the Repository

   ```bash
   git clone https://github.com/dhruvjaiswal2981/Babysteps-Appointment.git
   ```

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the server:
   ```sh
   node server.js
   ```
4. The server will start on **http://localhost:5000/**.

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```
4. The frontend will be available on **http://localhost:3000/**.

---

## API Endpoints

### **Doctors**
- `GET /doctors` → Get all doctors
- `GET /doctor/:id` → Get doctor by ID
- `POST /doctors` → Add a new doctor

### **Appointments**
- `GET /appointments` → Get all appointments
- `GET /appointments/:id` → Get an appointment by ID
- `POST /appointments` → Create a new appointment
- `PUT /appointments/:id` → Update an existing appointment
- `DELETE /appointments/:id` → Delete an appointment
- `GET /doctors/:id/slots?date=YYYY-MM-DD` → Get available slots for a doctor on a specific date

---

## Project Structure

```
project-root/
│── backend/
│   ├── server.js          # Express Server
│   ├── database.js        # SQLite Database Setup
│   ├── package.json       # Backend dependencies
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DoctorList.js
│   │   │   ├── AppointmentForm.js
│   │   │   ├── Appointment.js
│   │   │   ├── AvailableSlots.js
│   │   ├── App.js
│   │   ├── api.js
│   │   ├── index.js
│   ├── package.json       # Frontend dependencies
│── README.md              # Documentation
```

---

## Running the Project Locally
1. Start the **backend** server (`cd backend && node server.js`)
2. Start the **frontend** application (`cd frontend && npm start`)
3. Open **http://localhost:3000/** in your browser to access the application.

---

## Future Enhancements
- User authentication (Patients & Doctors login system)
- Doctor's flexible working hours instead of fixed 08:00 AM - 04:00 PM slots
- Email notifications for appointment confirmations
- Deployment to cloud hosting services

---


## Deployment

Backend Deployment
   - Live Demo: The application is hosted on Render
   - Access it here: 

Frontend Deployment
   - Live Demo: The application is hosted on Netlify.
   - Access it here: 
---