import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { sosRouter, aiRouter, volunteerRouter, incidentRouter, helpSeekerRouter } from './routes/serviceRoutes.js';

dotenv.config();

const app = express();

// --- Middleware ---
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// --- Routes ---
app.use('/api', router);
app.use('/api/sos', sosRouter);
app.use('/api/ai', aiRouter);
app.use('/api/volunteers', volunteerRouter);
app.use('/api/incidents', incidentRouter);
app.use('/api/help-seekers', helpSeekerRouter);

// --- Health Check ---
app.get('/health', (req, res) => {
  res.json({ status: 'active', timestamp: new Date() });
});

export default app;
