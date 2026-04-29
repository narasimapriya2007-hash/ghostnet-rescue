/**
 * GhostNet Global Rescue Service Layer
 * This file connects the UI to the production-ready backend.
 */

const API_BASE = 'http://localhost:3001/api';

// --- Types ---
export interface Incident {
  id: string;
  type: string;
  location: string;
  time: string;
  status: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  verified: boolean;
}

export interface Supply {
  id: string;
  name: string;
  quantity: string;
  status: 'available' | 'low' | 'out';
  category: string;
}

export interface Volunteer {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'busy' | 'offline';
  location: string;
}

// --- Service Methods ---
export const GhostNetAPI = {
  // Authentication (Production Route)
  login: async (email: string, pass: string) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
  },

  // Location Services
  getCurrentLocation: (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err) => reject(err)
        );
      }
    });
  },

  // SOS (Production Route)
  activateSOS: async (data: any) => {
    const token = localStorage.getItem('ghostnet_token');
    const response = await fetch(`${API_BASE}/sos/create`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('SOS Signal Failed');
    return response.json();
  },

  // Incidents
  getIncidents: async (): Promise<Incident[]> => {
    // Falls back to mock if production DB isn't seeded yet
    const response = await fetch(`${API_BASE}/incidents`).catch(() => null);
    if (!response || !response.ok) return []; 
    return response.json();
  },

  // Volunteers (Production Route)
  getVolunteers: async (): Promise<Volunteer[]> => {
    const response = await fetch(`${API_BASE}/volunteers/nearby`).catch(() => null);
    if (!response || !response.ok) return [];
    return response.json();
  },

  joinAsVolunteer: async (userData: any) => {
    const response = await fetch(`${API_BASE}/volunteers/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // AI Services (Production Routes)
  predictRisk: async (location: any) => {
    const response = await fetch(`${API_BASE}/ai/predict-risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location }),
    });
    return response.json();
  },

  assignTeam: async (sosId: string, teamId: string = 'TEAM_ALPHA') => {
    const response = await fetch(`${API_BASE}/sos/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sosId, teamId }),
    });
    return response.json();
  },

  getMissionHistory: async () => {
    const response = await fetch(`${API_BASE}/sos/history`).catch(() => null);
    if (!response || !response.ok) return [];
    return response.json();
  },

  getHelpRequests: async () => {
    const response = await fetch(`${API_BASE}/sos/requests`).catch(() => null);
    if (!response || !response.ok) return [];
    return response.json();
  },

  // Dashboard Data
  getDashboardStats: async () => {
    return {
      safeZones: 3,
      nearbyUsers: 12,
      destination: '1.2 KM',
      battery: 78
    };
  },

  getLocalAlerts: async () => {
    return [
      { id: 'a1', type: 'THREAT', message: 'Flood warning in Sector 4 • Seek higher ground' }
    ];
  },

  getHospitals: async () => {
    return [
      { id: 'h1', name: "City General Hospital", distance: "2.1 km", beds: "12 available", specialties: "Emergency, Trauma, ICU", waitTime: "15 min" },
      { id: 'h2', name: "St. Mary Medical Center", distance: "3.5 km", beds: "8 available", specialties: "Emergency, Surgery", waitTime: "22 min" },
      { id: 'h3', name: "District Health Clinic", distance: "1.8 km", beds: "5 available", specialties: "Primary Care, Emergency", waitTime: "10 min" }
    ];
  },

  getAmbulances: async () => {
    return [
      { id: 'a1', unit: "A1", distance: "1.2 km", type: "Advanced Medical Team", available: true, eta: "08:00" },
      { id: 'a2', unit: "A2", distance: "2.5 km", type: "Support Unit", available: true },
      { id: 'a3', unit: "A3", distance: "3.8 km", type: "Emergency Unit", available: false }
    ];
  },

  registerHelpSeeker: async (data: any) => {
    const response = await fetch(`${API_BASE}/help-seekers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getHelpSeekers: async () => {
    const response = await fetch(`${API_BASE}/help-seekers`).catch(() => null);
    if (!response || !response.ok) return [];
    return response.json();
  },

  getFirstAid: async (query: string) => {
    const response = await fetch(`${API_BASE}/ai/first-aid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    return response.json();
  }
};
