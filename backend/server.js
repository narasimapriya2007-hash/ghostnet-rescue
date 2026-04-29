import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import app from './src/app.js';

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

// --- Socket.IO Setup ---
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// --- Socket Handlers ---
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join rooms based on role/location
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room: ${room}`);
  });

  // Emergency Signal
  socket.on('sos:trigger', (data) => {
    // Broadcast to all rescue teams and admins
    io.to('rescue_teams').to('admins').emit('sos:new', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ghostnet_rescue';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas / Local');
    server.listen(PORT, () => {
      console.log(`GhostNet Production Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB Connection Error:', err);
    // For demo/hackathon purposes, we can still start the server if DB fails
    console.warn('Starting server without DB connection for demo mode...');
    server.listen(PORT, () => {
      console.log(`GhostNet Demo Server running on port ${PORT}`);
    });
  });

export { io };
