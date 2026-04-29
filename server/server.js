import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
};

// --- Auth ---
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({ id: 'u1', name: 'GhostNet Admin', email, role: 'admin' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// --- Incidents ---
app.get('/api/incidents', (req, res) => {
  const db = readDB();
  res.json(db.incidents);
});

app.post('/api/incidents', (req, res) => {
  const db = readDB();
  const newIncident = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body,
    time: 'JUST NOW',
    verified: false
  };
  db.incidents.unshift(newIncident);
  writeDB(db);
  res.status(201).json(newIncident);
});

// --- Supplies ---
app.get('/api/supplies', (req, res) => {
  const db = readDB();
  res.json(db.supplies);
});

// --- Volunteers ---
app.get('/api/volunteers', (req, res) => {
  const db = readDB();
  res.json(db.volunteers);
});

app.post('/api/volunteers/join', (req, res) => {
  const db = readDB();
  const newVolunteer = {
    id: Math.random().toString(36).substr(2, 9),
    name: req.body.name || 'Anonymous Volunteer',
    role: req.body.role || 'Volunteer',
    status: 'active',
    location: req.body.location || 'Unknown',
    joinedAt: new Date().toISOString()
  };
  db.volunteers.push(newVolunteer);
  writeDB(db);
  res.json({ success: true, message: 'Welcome to the rescue network', volunteer: newVolunteer });
});

// --- Help Seekers ---
app.get('/api/help-seekers', (req, res) => {
  const db = readDB();
  res.json(db.help_seekers || []);
});

app.post('/api/help-seekers/register', (req, res) => {
  const db = readDB();
  const newSeeker = {
    id: Math.random().toString(36).substr(2, 9),
    name: req.body.name || 'Anonymous',
    need: req.body.need || 'General Assistance',
    location: req.body.location || 'Unknown',
    status: 'pending',
    timestamp: new Date().toISOString()
  };
  if (!db.help_seekers) db.help_seekers = [];
  db.help_seekers.push(newSeeker);
  writeDB(db);
  res.json({ success: true, message: 'Help request registered', seeker: newSeeker });
});

// --- Operations ---
app.post('/api/sos', (req, res) => {
  res.json({ success: true, dispatchId: 'DS-' + Math.floor(100 + Math.random() * 900), eta: '4 MIN' });
});

app.post('/api/donate', (req, res) => {
  res.json({ success: true, transactionId: `TX-${Math.random().toString(36).toUpperCase().substr(2, 9)}` });
});

app.listen(PORT, () => {
  console.log(`GhostNet Backend running at http://localhost:${PORT}`);
});
