import { Volunteer, SOSRequest } from '../models/index.js';

/**
 * GhostNet AI Service
 * Simulates integration with prediction and NLP models
 */

export const predictRisk = async (location) => {
  // Logic to analyze historical disaster data, weather APIs, and sensor input
  // Returns a risk score and danger zones
  const mockRiskScore = Math.random() * 10;
  return {
    score: mockRiskScore.toFixed(2),
    level: mockRiskScore > 7 ? 'Critical' : mockRiskScore > 4 ? 'High' : 'Medium',
    dangerZones: [
      { lat: location.lat + 0.01, lng: location.lng + 0.01, radius: '500m', type: 'flood' }
    ]
  };
};

export const getFirstAidGuidance = async (query) => {
  // Logic for NLP-based first aid assistant
  // In production, this would hit an LLM or a curated medical database
  const guides = {
    'cpr': 'Place hands on center of chest. Push hard and fast at 100-120 bpm.',
    'bleeding': 'Apply direct pressure to the wound with a clean cloth.',
    'burn': 'Run cool water over the area for at least 10 minutes.'
  };
  
  const response = guides[query.toLowerCase()] || 'Stay calm. Help is on the way. Keep the victim warm.';
  return { instruction: response };
};

export const matchVolunteers = async (sosId) => {
  try {
    const sos = await SOSRequest.findById(sosId);
    if (!sos) return [];

    // Find volunteers within 5km using Geo-spatial query
    const volunteers = await Volunteer.find({
      liveLocation: {
        $near: {
          $geometry: { type: 'Point', coordinates: [sos.location.lng, sos.location.lat] },
          $maxDistance: 5000 // 5 kilometers
        }
      },
      availability: true
    }).limit(5);

    return volunteers;
  } catch (error) {
    console.error('Matching failed:', error);
    return [];
  }
};
