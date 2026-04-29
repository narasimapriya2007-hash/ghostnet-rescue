import express from 'express';
import { createSOS, getSOSStatus, syncRelayPacket, getMissionHistory, getHelpRequests, assignTeam } from '../controllers/sosController.js';
import { predictRisk, getFirstAidGuidance } from '../services/aiService.js';

const sosRouter = express.Router();
sosRouter.post('/create', createSOS);
sosRouter.get('/status/:id', getSOSStatus);
sosRouter.post('/sync-relay', syncRelayPacket);
sosRouter.get('/history', getMissionHistory);
sosRouter.get('/requests', getHelpRequests);
sosRouter.post('/assign', assignTeam);

const aiRouter = express.Router();
aiRouter.post('/predict-risk', async (req, res) => {
  try {
    const result = await predictRisk(req.body.location);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'AI Prediction Failed' });
  }
});
aiRouter.post('/first-aid', async (req, res) => {
  try {
    const result = await getFirstAidGuidance(req.body.query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'AI Assistant Offline' });
  }
});

const volunteerRouter = express.Router();
volunteerRouter.get('/nearby', (req, res) => {
  // Mock responders for demo
  res.json([
    { id: 'v1', name: 'Alex Rivera', role: 'Medical Paramedic', status: 'active', location: '0.8 KM' },
    { id: 'v2', name: 'Sarah Chen', role: 'Search & Rescue', status: 'busy', location: '1.5 KM' }
  ]);
});
volunteerRouter.post('/join', (req, res) => {
  res.json({ success: true, message: 'Joined network' });
});

const incidentRouter = express.Router();
incidentRouter.get('/', (req, res) => {
  res.json([
    { id: 'i1', type: 'FLOOD', location: 'Sector 4', time: '10 MIN AGO', status: 'critical', verified: true, description: 'Rapidly rising water levels near the river bank.' },
    { id: 'i2', type: 'FIRE', location: 'Industrial Zone', time: '25 MIN AGO', status: 'high', verified: true, description: 'Chemical fire reported in Warehouse B.' }
  ]);
});
incidentRouter.post('/report', (req, res) => {
  res.status(201).json({ success: true, message: 'Incident reported' });
});

const helpSeekerRouter = express.Router();
helpSeekerRouter.get('/', (req, res) => {
  res.json([
    { id: 's1', name: 'John Doe', need: 'Medical Assistance', location: 'Sector 4', status: 'pending' }
  ]);
});
helpSeekerRouter.post('/register', (req, res) => {
  res.json({ success: true, message: 'Help request registered', id: 's' + Math.random().toString(36).substr(2, 5) });
});

export { sosRouter, aiRouter, volunteerRouter, incidentRouter, helpSeekerRouter };
