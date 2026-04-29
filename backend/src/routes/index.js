import express from 'express';
import authRoutes from './authRoutes.js';
// import sosRoutes from './sosRoutes.js';
// import aiRoutes from './aiRoutes.js';
// import volunteerRoutes from './volunteerRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
// router.use('/sos', sosRoutes);
// router.use('/ai', aiRoutes);
// router.use('/volunteers', volunteerRoutes);

export default router;
