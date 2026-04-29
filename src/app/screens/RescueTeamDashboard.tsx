import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  AlertCircle,
  Users,
  Ambulance,
  MapPin,
  Clock,
  CheckCircle,
  TrendingUp,
  Activity
} from 'lucide-react';

export function RescueTeamDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] pb-6">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] px-6 pt-8 pb-20 rounded-b-[2rem]">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="text-white text-3xl mb-2">Rescue Command</h1>
        <p className="text-white/80">Team coordination & analytics</p>
      </div>

      <div className="px-6 -mt-12">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            icon={AlertCircle}
            value="18"
            label="Active SOS"
            color="bg-[#dc2626]"
          />
          <StatCard
            icon={Users}
            value="47"
            label="Volunteers"
            color="bg-[#3b82f6]"
          />
          <StatCard
            icon={Ambulance}
            value="12"
            label="En Route"
            color="bg-[#ea580c]"
          />
          <StatCard
            icon={CheckCircle}
            value="156"
            label="Rescued"
            color="bg-[#16a34a]"
          />
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Active SOS Requests</h3>
            <button className="text-xs text-[#3b82f6]">View All</button>
          </div>

          <div className="space-y-3">
            <SOSRequestCard
              priority="critical"
              type="Medical Emergency"
              location="Sector 12, Block A"
              distance="1.2 km"
              time="2 min ago"
              status="unassigned"
            />
            <SOSRequestCard
              priority="high"
              type="Building Collapse"
              location="Green Valley"
              distance="3.5 km"
              time="8 min ago"
              status="assigned"
              team="Team Alpha"
            />
            <SOSRequestCard
              priority="medium"
              type="Flood Evacuation"
              location="Riverside Colony"
              distance="5.2 km"
              time="15 min ago"
              status="assigned"
              team="Team Beta"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-sm mb-4">Rescue Teams</h3>

          <div className="space-y-3">
            <TeamCard
              name="Team Alpha"
              members={4}
              status="active"
              assignment="Medical Emergency - Sector 12"
              eta="8 min"
            />
            <TeamCard
              name="Team Beta"
              members={5}
              status="active"
              assignment="Flood Evacuation - Riverside"
              eta="12 min"
            />
            <TeamCard
              name="Team Gamma"
              members={3}
              status="available"
              assignment="On standby"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-sm mb-4">Volunteer Coordination</h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#16a34a]" />
                <span className="text-xs text-gray-500">Available</span>
              </div>
              <p className="text-xl text-gray-900">32</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-[#ea580c]" />
                <span className="text-xs text-gray-500">Deployed</span>
              </div>
              <p className="text-xl text-gray-900">15</p>
            </div>
          </div>

          <button className="w-full bg-[#3b82f6] text-white p-3 rounded-xl">
            Dispatch Volunteers
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-sm mb-4">Disaster Heat Map</h3>

          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-48 relative overflow-hidden">
            <div className="absolute top-4 left-4 w-16 h-16 bg-[#dc2626] opacity-40 rounded-full blur-xl"></div>
            <div className="absolute top-12 right-8 w-12 h-12 bg-[#ea580c] opacity-30 rounded-full blur-lg"></div>
            <div className="absolute bottom-8 left-12 w-20 h-20 bg-[#dc2626] opacity-35 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-4 w-14 h-14 bg-[#ea580c] opacity-25 rounded-full blur-lg"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <p className="text-xs text-gray-600">High-risk zones: 3</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm mb-4">Analytics</h3>

          <div className="space-y-4">
            <MetricRow label="Response Time Avg" value="6.2 min" trend="down" />
            <MetricRow label="Success Rate" value="94%" trend="up" />
            <MetricRow label="Active Incidents" value="18" trend="up" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className={`${color} p-3 rounded-full w-fit mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function SOSRequestCard({ priority, type, location, distance, time, status, team }: any) {
  const priorityColors = {
    critical: 'border-[#dc2626] bg-[#fef2f2]',
    high: 'border-[#ea580c] bg-[#fff7ed]',
    medium: 'border-[#fbbf24] bg-[#fefce8]',
  };

  const statusColors = {
    unassigned: 'bg-[#fecaca] text-[#991b1b]',
    assigned: 'bg-[#d1fae5] text-[#065f46]',
  };

  return (
    <div className={`border-l-4 ${priorityColors[priority]} rounded-lg p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-sm mb-1">{type}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <MapPin className="w-3 h-3" />
            <span>{location} • {distance}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
          {status === 'assigned' ? `${team}` : 'Unassigned'}
        </span>
      </div>

      {status === 'unassigned' && (
        <button className="w-full bg-[#3b82f6] text-white text-sm py-2 rounded-lg mt-3">
          Assign Team
        </button>
      )}
    </div>
  );
}

function TeamCard({ name, members, status, assignment, eta }: any) {
  const statusColors = {
    active: 'bg-[#16a34a] text-white',
    available: 'bg-gray-200 text-gray-700',
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#3b82f6] p-2 rounded-full">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm">{name}</h4>
            <p className="text-xs text-gray-500">{members} members</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      <p className="text-xs text-gray-600 mb-2">{assignment}</p>

      {eta && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>ETA: {eta}</span>
        </div>
      )}
    </div>
  );
}

function MetricRow({ label, value, trend }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-900">{value}</span>
        <TrendingUp
          className={`w-4 h-4 ${trend === 'up' ? 'text-[#16a34a]' : 'text-[#dc2626] rotate-180'}`}
        />
      </div>
    </div>
  );
}
