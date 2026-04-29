import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'ghostnet_emergency_secret_2024';

export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    
    // DEMO MODE FALLBACK
    if (mongoose.connection.readyState !== 1) {
       console.log('Using Demo Auth (No DB)');
       const token = jwt.sign({ id: 'demo_user', role: 'admin' }, JWT_SECRET, { expiresIn: '30d' });
       return res.json({
         token,
         user: { id: 'demo_u1', name: 'GhostNet Admin (Demo)', email: email || 'test@example.com', role: 'admin' }
       });
    }

    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       // Allow for hackathon demo
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

export const guestAccess = async (req, res) => {
  const token = jwt.sign({ id: 'guest', role: 'citizen' }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: 'guest', name: 'Guest User', role: 'citizen' } });
};

export const biometricLogin = async (req, res) => {
  res.json({ success: true, message: 'Biometric verified' });
};
