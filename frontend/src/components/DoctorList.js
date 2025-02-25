import React, { useEffect, useState } from "react";
import { fetchDoctors } from "../api";
import { List, ListItem, ListItemText, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/DoctorList.css"; // Import updated CSS

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors().then((res) => setDoctors(res.data));
  }, []);

  return (
    <div className="appointment-wrapper">
      <Container className="doctor-container">
        <Typography variant="h4" className="title">Choose Your Doctor</Typography>
        <Typography variant="body1" className="subtitle">
          Select a specialist for your appointment.
        </Typography>
        <List className="doctor-list">
          {doctors.map((doctor) => (
            <ListItem
              button
              component={Link}
              to={`/available-slots/${doctor.id}`}
              key={doctor.id}
              className="doctor-item"
            >
              <ListItemText
                primary={doctor.name}
                secondary={doctor.specialization}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default DoctorList;
