// --- src/routes/authRoutes.js ---
import express from 'express';
import { login, guestAccess, biometricLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/guest-access', guestAccess);
router.post('/biometric-login', biometricLogin);

export default router;

// --- src/routes/index.js ---
// (I will create this as a separate file call next, but here is the logic)
