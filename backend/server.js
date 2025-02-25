const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const { format, parseISO, addMinutes, isBefore, isAfter } = require('date-fns');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

app.get("/doctor/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT name FROM doctors WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Doctor not found" });
    res.json({ name: row.name });
  });
});


// Get all doctors
app.get('/doctors', (req, res) => {
    db.all('SELECT * FROM doctors', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
  
  // Get available slots for a doctor
  app.get("/doctors/:id/slots", (req, res) => {
    const doctorId = req.params.id;
    const date = req.query.date;
  
    if (!date) return res.status(400).json({ error: "Date is required" });
  
    let slots = [];
    let current = parseISO(`${date}T08:00`);
    let endTime = parseISO(`${date}T16:00`);
  
    while (isBefore(current, endTime)) {
      slots.push(format(current, "HH:mm"));
      current = addMinutes(current, 30);
    }
  
    // Fetch booked slots
    db.all(
      "SELECT date FROM appointments WHERE doctorId = ? AND date LIKE ?",
      [doctorId, `${date}%`],
      (err, appointments) => {
        if (err) return res.status(500).json({ error: err.message });
  
        const bookedSlots = appointments.map((a) => format(parseISO(a.date), "HH:mm"));
  
        // Remove booked slots
        slots = slots.filter((slot) => !bookedSlots.includes(slot));
  
        res.json({ availableSlots: slots });
      }
    );
  });
  

  // Add a new doctor
app.post('/doctors', (req, res) => {
    const { name, workingHours } = req.body;

    if (!name || !workingHours) {
        return res.status(400).json({ error: "Name and working hours are required." });
    }

    db.run(`INSERT INTO doctors (name, workingHours) VALUES (?, ?)`, 
        [name, JSON.stringify(workingHours)], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, workingHours });
        });
});

// Get all appointments
app.get('/appointments', (req, res) => {
    db.all('SELECT * FROM appointments', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
  
  // Get appointment by ID
  app.get('/appointments/:id', (req, res) => {
    db.get('SELECT * FROM appointments WHERE id = ?', [req.params.id], (err, row) => {
      if (err || !row) return res.status(404).json({ error: "Appointment not found" });
      res.json(row);
    });
  });
  
  // Create an appointment
  app.post('/appointments', (req, res) => {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;
  
    if (!doctorId || !date || !duration || !appointmentType || !patientName)
      return res.status(400).json({ error: "All required fields must be provided." });
  
    // Check if slot is available
    db.get('SELECT * FROM appointments WHERE doctorId = ? AND date = ?', 
      [doctorId, date], (err, row) => {
        if (row) return res.status(400).json({ error: "Slot already booked." });
  
        db.run(`INSERT INTO appointments (doctorId, date, duration, appointmentType, patientName, notes) 
                VALUES (?, ?, ?, ?, ?, ?)`, 
          [doctorId, date, duration, appointmentType, patientName, notes || ""], 
          function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
          });
      });
  });
  
  // Update an appointment
  app.put('/appointments/:id', (req, res) => {
    const { date, duration, appointmentType, patientName, notes } = req.body;
  
    db.get('SELECT * FROM appointments WHERE id = ?', [req.params.id], (err, appointment) => {
      if (err || !appointment) return res.status(404).json({ error: "Appointment not found" });
  
      db.run(`UPDATE appointments SET date = ?, duration = ?, appointmentType = ?, patientName = ?, notes = ? WHERE id = ?`, 
        [date, duration, appointmentType, patientName, notes || "", req.params.id], 
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Appointment updated successfully" });
        });
    });
  });
  
  // Delete an appointment
  app.delete('/appointments/:id', (req, res) => {
    db.run('DELETE FROM appointments WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Appointment deleted successfully" });
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  