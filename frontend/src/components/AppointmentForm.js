import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createAppointment } from "../api";
import { Container, TextField, Button, Typography } from "@mui/material";
import "../styles/AppointmentForm.css"; // Import the new CSS file

const AppointmentForm = () => {
  const { doctorId, slot } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ patientName: "", appointmentType: "", notes: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    if (!formData.patientName || !formData.appointmentType) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const [datePart, timePart] = decodeURIComponent(slot).split("T"); // Extract date from slot
      const payload = { 
        doctorId: Number(doctorId), 
        date: datePart,  // Correct date
        slot: timePart || "00:00",
        duration: "30 minutes", // Fixed duration
        appointmentType: formData.appointmentType, 
        patientName: formData.patientName, 
        notes: formData.notes || "",
      };

      await createAppointment(payload);
      navigate("/appointments"); // Redirect after successful booking
    } catch (err) {
      setError(err.response?.data?.error || "Failed to book appointment. Please try again.");
      console.error("API Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="appointment-wrapper">
      <div className="appointment-container">
        <Typography variant="h5" className="appointment-title">
          Book Appointment
        </Typography>

        {error && <Typography className="error-message">{error}</Typography>}

        <form className="appointment-form" onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Patient Name" 
            name="patientName" 
            value={formData.patientName} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            fullWidth 
            label="Appointment Type" 
            name="appointmentType" 
            value={formData.appointmentType} 
            onChange={handleChange} 
            required 
          />
          <TextField 
            fullWidth 
            label="Notes (Optional)" 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
          />
          <Button type="submit" variant="contained" className="appointment-button">
            Book Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
