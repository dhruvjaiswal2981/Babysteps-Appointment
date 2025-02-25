import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import AvailableSlots from "./components/AvailableSlots";
import AppointmentForm from "./components/AppointmentForm";
import Appointments from "./components/Appointments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/available-slots/:doctorId" element={<AvailableSlots />} />
        <Route path="/appointment-form/:doctorId/:slot" element={<AppointmentForm />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </Router>
  );
}

export default App;
