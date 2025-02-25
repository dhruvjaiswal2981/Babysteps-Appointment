const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./appointments.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to the SQLite database.');
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      workingHours TEXT NOT NULL
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doctorId INTEGER NOT NULL,
      date TEXT NOT NULL,
      duration INTEGER NOT NULL,
      appointmentType TEXT NOT NULL,
      patientName TEXT NOT NULL,
      notes TEXT,
      FOREIGN KEY(doctorId) REFERENCES doctors(id)
    )
  `);
});

module.exports = db;
