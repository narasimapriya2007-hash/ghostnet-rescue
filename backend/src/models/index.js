import mongoose from 'mongoose';

// --- User Schema ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'volunteer', 'rescue_team', 'admin', 'government'], default: 'citizen' },
  biometricEnabled: { type: Boolean, default: false },
  emergencyContacts: [{
    name: String,
    phone: String,
    relation: String
  }],
  familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  medicalInfo: {
    bloodGroup: String,
    allergies: [String],
    conditions: [String],
    medications: [String]
  },
  currentLocation: {
    lat: Number,
    lng: Number,
    updatedAt: Date
  },
  batteryStatus: Number,
  safetyStatus: { type: String, enum: ['safe', 'danger', 'unknown'], default: 'safe' }
}, { timestamps: true });

// --- SOS Request Schema ---
const SOSRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emergencyType: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: String
  },
  status: { type: String, enum: ['pending', 'active', 'resolved', 'cancelled'], default: 'pending' },
  assignedRescueTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'RescueTeam' },
  ETA: String,
  relayDevices: [String], // IDs of devices that relayed the SOS
  priority: { type: Number, default: 0 }
}, { timestamps: true });

// --- Volunteer Schema ---
const VolunteerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillLevel: { type: String, enum: ['basic', 'advanced', 'professional'], default: 'basic' },
  availability: { type: Boolean, default: true },
  liveLocation: {
    lat: Number,
    lng: Number
  },
  assignedTask: { type: String },
  rating: { type: Number, default: 5.0 }
}, { timestamps: true });

// --- Incident Schema ---
const IncidentSchema = new mongoose.Schema({
  media: [String], // URLs to images/videos
  incidentType: { type: String, required: true },
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: String
  },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  description: String,
  verified: { type: Boolean, default: false }
}, { timestamps: true });

// --- Shelter Schema ---
const ShelterSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  capacity: {
    total: Number,
    occupied: Number
  },
  resources: {
    food: Boolean,
    water: Boolean,
    medical: Boolean
  },
  status: { type: String, enum: ['open', 'full', 'closed'], default: 'open' }
}, { timestamps: true });

// --- Resource Schema ---
const ResourceSchema = new mongoose.Schema({
  category: { type: String, enum: ['food', 'water', 'medical', 'other'] },
  itemName: String,
  stockQuantity: Number,
  unit: String,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Shelter' }
}, { timestamps: true });

// --- Rescue Team Schema ---
const RescueTeamSchema = new mongoose.Schema({
  teamName: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  liveLocation: {
    lat: Number,
    lng: Number
  },
  status: { type: String, enum: ['idle', 'on-mission', 'offline'], default: 'idle' },
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SOSRequest' }]
}, { timestamps: true });

// --- Indexes for geo-spatial lookups ---
UserSchema.index({ 'currentLocation': '2dsphere' });
SOSRequestSchema.index({ 'location': '2dsphere' });
VolunteerSchema.index({ 'liveLocation': '2dsphere' });
IncidentSchema.index({ 'location': '2dsphere' });

export const User = mongoose.model('User', UserSchema);
export const SOSRequest = mongoose.model('SOSRequest', SOSRequestSchema);
export const Volunteer = mongoose.model('Volunteer', VolunteerSchema);
export const Incident = mongoose.model('Incident', IncidentSchema);
export const Shelter = mongoose.model('Shelter', ShelterSchema);
export const Resource = mongoose.model('Resource', ResourceSchema);
export const RescueTeam = mongoose.model('RescueTeam', RescueTeamSchema);
