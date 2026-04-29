import { SOSRequest, User } from '../models/index.js';
import { io } from '../../server.js';
import mongoose from 'mongoose';

export const createSOS = async (req, res) => {
  try {
    const { emergencyType, location, relayDevices } = req.body;
    const userId = req.user.id;

    // DEMO MODE FALLBACK
    if (mongoose.connection.readyState !== 1) {
      console.log('Using Demo SOS (No DB)');
      return res.status(201).json({
        _id: 'demo_sos_' + Math.random().toString(36).substr(2, 5),
        userId,
        emergencyType,
        location,
        relayDevices,
        status: 'pending',
        createdAt: new Date()
      });
    }

    const newSOS = new SOSRequest({
      userId,
      emergencyType,
      location,
      relayDevices
    });

    await newSOS.save();

    // Broadcast real-time event via Socket.IO
    io.to('rescue_teams').to('admins').emit('sos:new', {
      id: newSOS._id,
      userId,
      emergencyType,
      location,
      timestamp: newSOS.createdAt
    });

    res.status(201).json(newSOS);
  } catch (error) {
    res.status(500).json({ error: 'Failed to trigger SOS', details: error.message });
  }
};

export const getSOSStatus = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
       return res.json({
         _id: req.params.id,
         status: 'active',
         ETA: '5 MIN',
         emergencyType: 'Medical',
         location: { lat: 0, lng: 0 }
       });
    }

    const sos = await SOSRequest.findById(req.params.id)
      .populate('assignedRescueTeam');
    if (!sos) return res.status(404).json({ error: 'SOS request not found' });
    res.json(sos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch status' });
  }
};

export const syncRelayPacket = async (req, res) => {
  try {
    const { packetId, sender, location, hops, timestamp } = req.body;
    
    // Logic to reconcile offline relay packets
    const existing = await SOSRequest.findOne({ relayPacketId: packetId });
    if (existing) {
      return res.json({ success: true, message: 'Packet already synced' });
    }

    const newSOS = new SOSRequest({
      userId: sender,
      emergencyType: 'RELAY_OFFLINE',
      location,
      relayDevices: hops,
      createdAt: timestamp,
      status: 'pending'
    });

    await newSOS.save();
    
    // Notify teams
    io.to('rescue_teams').emit('sos:new', newSOS);

    res.json({ success: true, message: 'Relay packet synchronized' });
  } catch (error) {
    res.status(500).json({ error: 'Sync failed' });
  }
};

export const getMissionHistory = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([
        { id: 'h1', rescuer: 'Team Alpha', victim: 'John Doe', type: 'Medical', time: '2 HOURS AGO', status: 'completed' },
        { id: 'h2', rescuer: 'Team Beta', victim: 'Sarah Smith', type: 'Flood Relief', time: '5 HOURS AGO', status: 'completed' }
      ]);
    }
    const history = await SOSRequest.find({ status: 'resolved' }).populate('assignedRescueTeam').populate('userId');
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

export const getHelpRequests = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([
        { id: 'r1', name: 'Anonymous', need: 'Water & Food', location: 'Zone 4', time: '10 MIN AGO', status: 'pending' },
        { id: 'r2', name: 'Mike Johnson', need: 'Medical Aid', location: 'Sector 7', time: '15 MIN AGO', status: 'active' }
      ]);
    }
    const requests = await SOSRequest.find({ status: { $ne: 'resolved' } }).populate('userId');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

export const assignTeam = async (req, res) => {
  try {
    const { sosId, teamId } = req.body;
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, message: 'Team assigned (Demo)' });
    }
    const sos = await SOSRequest.findByIdAndUpdate(sosId, { assignedRescueTeam: teamId, status: 'active' }, { new: true });
    res.json(sos);
  } catch (error) {
    res.status(500).json({ error: 'Assignment failed' });
  }
};
