import { useNavigate } from 'react-router';
import { ArrowLeft, MapPin, AlertTriangle, Users, Shield, Layers, Navigation } from 'lucide-react';

export function DisasterMap() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#f8f9fa] flex flex-col">
      <div className="bg-white px-6 pt-8 pb-4 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl">Disaster Monitoring</h1>
            <p className="text-xs text-gray-500">Real-time threat analysis</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <FilterChip label="All Zones" active />
          <FilterChip label="Danger Zones" color="red" />
          <FilterChip label="Safe Zones" color="green" />
          <FilterChip label="Rescue Teams" />
        </div>
      </div>

      <div className="flex-1 relative bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-md mx-auto p-6">
            <div className="absolute top-20 left-12 w-32 h-32 bg-[#dc2626] opacity-30 rounded-full blur-2xl"></div>
            <div className="absolute top-32 right-16 w-24 h-24 bg-[#ea580c] opacity-20 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 left-20 w-28 h-28 bg-[#16a34a] opacity-25 rounded-full blur-xl"></div>

            <DangerZone top="15%" left="15%" severity="high" label="Flood Zone" />
            <DangerZone top="25%" right="20%" severity="medium" label="Landslide Risk" />
            <SafeZone bottom="30%" left="25%" label="Safe Zone" />
            <RescueTeam top="50%" left="50%" label="Team Alpha" />
            <RescueTeam bottom="40%" right="30%" label="Team Beta" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#3b82f6] opacity-20 rounded-full animate-ping"></div>
                <div className="relative bg-[#3b82f6] p-3 rounded-full border-4 border-white shadow-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs whitespace-nowrap shadow-sm">
                You
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Layers className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="bg-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm">Active Threats</h3>
          <button className="text-xs text-[#3b82f6]">View All</button>
        </div>

        <div className="space-y-2 mb-4">
          <ThreatItem
            type="Flood Warning"
            distance="2.3 km NE"
            severity="high"
            icon={AlertTriangle}
          />
          <ThreatItem
            type="Crowd Density Alert"
            distance="0.8 km W"
            severity="medium"
            icon={Users}
          />
        </div>

        <button
          onClick={() => navigate('/safe-route')}
          className="w-full bg-[#16a34a] text-white p-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Navigation className="w-5 h-5" />
          Navigate to Safe Shelter
        </button>
      </div>
    </div>
  );
}

function FilterChip({ label, active = false, color = 'blue' }: any) {
  const colors = {
    blue: active ? 'bg-[#3b82f6] text-white' : 'bg-gray-100 text-gray-700',
    red: 'bg-[#fecaca] text-[#991b1b]',
    green: 'bg-[#dcfce7] text-[#166534]',
  };

  return (
    <button className={`px-4 py-2 rounded-full text-xs whitespace-nowrap ${colors[color]}`}>
      {label}
    </button>
  );
}

function DangerZone({ top, left, right, bottom, severity, label }: any) {
  const severityColors = {
    high: 'border-[#dc2626] bg-[#dc2626]',
    medium: 'border-[#ea580c] bg-[#ea580c]',
  };

  return (
    <div
      className="absolute"
      style={{ top, left, right, bottom }}
    >
      <div className={`${severityColors[severity]} bg-opacity-20 border-2 p-2 rounded-lg backdrop-blur-sm`}>
        <AlertTriangle className={`w-5 h-5 ${severity === 'high' ? 'text-[#dc2626]' : 'text-[#ea580c]'}`} />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs whitespace-nowrap shadow-sm">
        {label}
      </div>
    </div>
  );
}

function SafeZone({ top, left, right, bottom, label }: any) {
  return (
    <div
      className="absolute"
      style={{ top, left, right, bottom }}
    >
      <div className="border-2 border-[#16a34a] bg-[#16a34a] bg-opacity-20 p-2 rounded-lg backdrop-blur-sm">
        <Shield className="w-5 h-5 text-[#16a34a]" />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs whitespace-nowrap shadow-sm">
        {label}
      </div>
    </div>
  );
}

function RescueTeam({ top, left, right, bottom, label }: any) {
  return (
    <div
      className="absolute"
      style={{ top, left, right, bottom }}
    >
      <div className="bg-[#3b82f6] p-2 rounded-full border-2 border-white shadow-lg">
        <Users className="w-4 h-4 text-white" />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs whitespace-nowrap shadow-sm">
        {label}
      </div>
    </div>
  );
}

function ThreatItem({ type, distance, severity, icon: Icon }: any) {
  const severityColors = {
    high: 'bg-[#fecaca] border-l-[#dc2626]',
    medium: 'bg-[#fed7aa] border-l-[#ea580c]',
  };

  return (
    <div className={`${severityColors[severity]} border-l-4 rounded-lg p-3 flex items-center gap-3`}>
      <Icon className="w-5 h-5 text-gray-700" />
      <div className="flex-1">
        <h4 className="text-sm">{type}</h4>
        <p className="text-xs text-gray-600">{distance}</p>
      </div>
    </div>
  );
}
