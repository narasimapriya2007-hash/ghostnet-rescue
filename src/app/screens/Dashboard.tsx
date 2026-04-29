import { useNavigate } from 'react-router';
import {
  AlertCircle,
  MapPin,
  Wifi,
  Users,
  Home,
  Battery,
  Heart,
  Navigation,
  FileText,
  Shield,
  Settings,
  Radio,
  Bell
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] pb-24">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] px-6 pt-12 pb-24 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl mb-1">Emergency Dashboard</h1>
            <p className="text-white/80 text-sm">Real-time rescue coordination</p>
          </div>
          <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <Bell className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></div>
              <span className="text-white text-sm">Mesh Network Active</span>
            </div>
            <Wifi className="w-5 h-5 text-[#22c55e]" />
          </div>
          <div className="text-white/80 text-xs">12 nearby devices • Signal: Strong</div>
        </div>
      </div>

      <div className="px-6 -mt-16">
        <button
          onClick={() => navigate('/sos')}
          className="w-full bg-gradient-to-br from-[#dc2626] to-[#991b1b] text-white p-8 rounded-3xl shadow-2xl mb-6 active:scale-95 transition-transform border-4 border-white"
        >
          <div className="flex flex-col items-center">
            <div className="bg-white/20 p-4 rounded-full mb-3">
              <AlertCircle className="w-12 h-12" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl mb-1">SOS EMERGENCY</h2>
            <p className="text-white/90 text-sm">Tap to send distress signal</p>
          </div>
        </button>

        <div className="bg-[#fef3c7] border-2 border-[#fbbf24] rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[#92400e] mb-1">Active Alert</h4>
            <p className="text-[#92400e] text-sm">Flood warning in your area - 2.3 km away</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <MapPin className="w-6 h-6 text-[#3b82f6] mb-2" />
            <h4 className="text-sm mb-1">Your Location</h4>
            <p className="text-xs text-gray-500">Sharing with 3 contacts</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <Users className="w-6 h-6 text-[#16a34a] mb-2" />
            <h4 className="text-sm mb-1">Nearby Rescuers</h4>
            <p className="text-xs text-gray-500">8 volunteers active</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <Home className="w-6 h-6 text-[#ea580c] mb-2" />
            <h4 className="text-sm mb-1">Nearest Shelter</h4>
            <p className="text-xs text-gray-500">1.2 km • Community Hall</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <Battery className="w-6 h-6 text-[#22c55e] mb-2" />
            <h4 className="text-sm mb-1">Battery Status</h4>
            <p className="text-xs text-gray-500">78% • Power save mode</p>
          </div>
        </div>

        <h3 className="text-gray-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <QuickAction icon={Heart} label="Medical Help" color="bg-[#dc2626]" onClick={() => navigate('/medical')} />
          <QuickAction icon={Navigation} label="Safe Route" color="bg-[#16a34a]" onClick={() => navigate('/safe-route')} />
          <QuickAction icon={Users} label="Volunteers" color="bg-[#3b82f6]" onClick={() => navigate('/volunteers')} />
          <QuickAction icon={FileText} label="Report Incident" color="bg-[#ea580c]" onClick={() => navigate('/report')} />
        </div>

        <h3 className="text-gray-700 mb-4">Family Safety Status</h3>
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6" onClick={() => navigate('/family')}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#22c55e] rounded-full flex items-center justify-center text-white">
              <span>M</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm">Mom</h4>
              <p className="text-xs text-[#16a34a]">Safe • 15 min ago</p>
            </div>
            <div className="w-2 h-2 bg-[#22c55e] rounded-full"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fbbf24] rounded-full flex items-center justify-center text-white">
              <span>D</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm">Dad</h4>
              <p className="text-xs text-[#f59e0b]">No update • 2 hours ago</p>
            </div>
            <div className="w-2 h-2 bg-[#fbbf24] rounded-full"></div>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <NavButton icon={Home} label="Home" active />
          <NavButton icon={MapPin} label="Map" onClick={() => navigate('/disaster-map')} />
          <NavButton icon={Radio} label="Resources" onClick={() => navigate('/resources')} />
          <NavButton icon={Shield} label="Rescue" onClick={() => navigate('/rescue-team')} />
          <NavButton icon={Settings} label="More" onClick={() => navigate('/accessibility')} />
        </div>
      </nav>
    </div>
  );
}

function QuickAction({ icon: Icon, label, color, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg active:scale-95 transition-transform`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs">{label}</span>
    </button>
  );
}

function NavButton({ icon: Icon, label, active = false, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${active ? 'text-[#3b82f6]' : 'text-gray-400'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs">{label}</span>
    </button>
  );
}
