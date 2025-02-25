import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAvailableSlots } from "../api"; // API function
import { Container, Typography, Button, TextField } from "@mui/material";
import "../styles/AvailableSlots.css"; // Import CSS file

const AvailableSlots = () => {
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Function to fetch available slots
  const getSlots = useCallback(() => {
    fetchAvailableSlots(doctorId, selectedDate)
      .then((res) => setSlots(res.data.availableSlots))
      .catch((err) => console.error("Error fetching slots:", err));
  }, [doctorId, selectedDate]);

  useEffect(() => {
    getSlots();
  }, [getSlots]);

  return (
    <div className="slots-wrapper">
      <Container className="slots-container">
        <Typography variant="h5" className="title">Available Slots</Typography>

        {/* Date Picker */}
        <TextField
          label="Select Date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="date-picker"
        />

        <div className="slots-list">
          {slots.length ? (
            slots.map((slot, index) => (
              <Button
                key={index}
                variant="outlined"
                component={Link}
                to={`/appointment-form/${doctorId}/${selectedDate}T${slot}`}
                className="slot-button"
              >
                {slot}
              </Button>
            ))
          ) : (
            <Typography className="no-slots">No slots available</Typography>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AvailableSlots;
