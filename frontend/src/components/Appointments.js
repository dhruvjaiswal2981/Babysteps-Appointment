import React, { useEffect, useState } from "react";
import { fetchAppointments, deleteAppointment, updateAppointment, fetchDoctorName } from "../api"; // Fetch doctor name
import { Container, Typography, List, ListItem, ListItemText, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "../styles/Appointments.css"

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editData, setEditData] = useState(null); // Store appointment being edited
  const [doctorNames, setDoctorNames] = useState({}); // Store doctor names

  useEffect(() => {
    fetchAppointments().then(async (res) => {
      setAppointments(res.data);

      // Fetch doctor names for each appointment
      const doctorDetails = {};
      for (let appt of res.data) {
        if (!doctorDetails[appt.doctorId]) {
          const doctorRes = await fetchDoctorName(appt.doctorId);
          doctorDetails[appt.doctorId] = doctorRes.data.name;
        }
      }
      setDoctorNames(doctorDetails);
    });
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    await deleteAppointment(id);
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  // Handle Edit - Open Dialog
  const handleEditClick = (appointment) => {
    setEditData(appointment);
  };

  // Handle Edit - Save Changes
  const handleSave = async () => {
    if (!editData) return;

    await updateAppointment(editData.id, editData);
    setAppointments(
      appointments.map((appt) => (appt.id === editData.id ? editData : appt))
    );
    setEditData(null);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Your Appointments</Typography>

      <List>
        {appointments.length ? (
          appointments.map((appt) => (
            <ListItem key={appt.id} divider>
              <ListItemText
                primary={`Doctor: ${doctorNames[appt.doctorId] || "Loading..."} - ${appt.date} at ${appt.duration}`}
                secondary={`Patient: ${appt.patientName} | Type: ${appt.appointmentType}`}
              />
              <Button onClick={() => handleEditClick(appt)} color="primary"> Edit </Button>
              <Button onClick={() => handleDelete(appt.id)} color="error"> Delete </Button>
            </ListItem>
          ))
        ) : (
          <Typography>No appointments available</Typography>
        )}
      </List>

      {/* Edit Appointment Dialog */}
      {editData && (
        <Dialog open={Boolean(editData)} onClose={() => setEditData(null)}>
          <DialogTitle>Edit Appointment</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Patient Name"
              value={editData.patientName}
              onChange={(e) => setEditData({ ...editData, patientName: e.target.value })}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Appointment Type"
              value={editData.appointmentType}
              onChange={(e) => setEditData({ ...editData, appointmentType: e.target.value })}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Notes"
              value={editData.notes}
              onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditData(null)} color="secondary">Cancel</Button>
            <Button onClick={handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Appointments;
