import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Camera,
  Video,
  MapPin,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export function IncidentReport() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#16a34a] to-[#22c55e] flex flex-col items-center justify-center px-6">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative bg-white p-8 rounded-full">
            <CheckCircle className="w-24 h-24 text-[#16a34a]" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-white text-3xl mb-3 text-center">Report Submitted</h1>
        <p className="text-white/90 text-center mb-12 max-w-sm">
          Your incident report has been shared with rescue teams and authorities
        </p>

        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-white text-[#16a34a] p-4 rounded-2xl"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-white/20 backdrop-blur-sm border-2 border-white text-white p-4 rounded-2xl"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] pb-6">
      <div className="bg-gradient-to-br from-[#ea580c] to-[#fb923c] px-6 pt-8 pb-20 rounded-b-[2rem]">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="text-white text-3xl mb-2">Report Incident</h1>
        <p className="text-white/80">Share real-time disaster information</p>
      </div>

      <div className="px-6 -mt-12">
        <div className="bg-white rounded-2xl p-5 shadow-xl mb-6">
          <h3 className="text-sm mb-4">Incident Type</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <IncidentTypeChip label="Fire" />
            <IncidentTypeChip label="Flood" />
            <IncidentTypeChip label="Accident" />
            <IncidentTypeChip label="Building Damage" />
            <IncidentTypeChip label="Road Block" />
            <IncidentTypeChip label="Other" />
          </div>

          <h3 className="text-sm mb-4">Location</h3>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-[#3b82f6]" />
              <div className="flex-1">
                <p className="text-sm">Current Location</p>
                <p className="text-xs text-gray-500">Main Street, Sector 12</p>
              </div>
              <button className="text-xs text-[#3b82f6]">Change</button>
            </div>
          </div>

          <h3 className="text-sm mb-4">Description</h3>
          <textarea
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm mb-6 min-h-[100px] resize-none"
            placeholder="Describe what you see... Be specific about the situation, number of people affected, severity, etc."
          />

          <h3 className="text-sm mb-4">Upload Media</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center gap-2 active:bg-gray-100">
              <Camera className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-600">Take Photo</span>
            </button>
            <button className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center gap-2 active:bg-gray-100">
              <Video className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-600">Record Video</span>
            </button>
          </div>

          <div className="bg-[#fef3c7] border border-[#fbbf24] rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[#92400e] text-sm mb-1">Privacy Notice</h4>
              <p className="text-[#92400e] text-xs">
                Your report will be shared with rescue teams and authorities to facilitate emergency response
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h3 className="text-sm mb-3">Recent Reports Nearby</h3>
          <div className="space-y-2">
            <ReportItem
              type="Flood"
              location="0.5 km away"
              time="5 min ago"
              verified
            />
            <ReportItem
              type="Road Blocked"
              location="1.2 km away"
              time="12 min ago"
            />
          </div>
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-gradient-to-br from-[#ea580c] to-[#fb923c] text-white p-5 rounded-2xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Submit Incident Report
        </button>
      </div>
    </div>
  );
}

function IncidentTypeChip({ label }: any) {
  return (
    <button className="bg-gray-50 border border-gray-200 text-gray-700 p-3 rounded-xl text-sm active:bg-[#ea580c] active:text-white active:border-[#ea580c] transition-colors">
      {label}
    </button>
  );
}

function ReportItem({ type, location, time, verified = false }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="bg-[#ea580c] p-2 rounded-full">
        <FileText className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h5 className="text-sm">{type}</h5>
          {verified && (
            <span className="text-xs text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">
              Verified
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500">{location} • {time}</p>
      </div>
    </div>
  );
}
