import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertCircle,
  ArrowLeft,
  Flame,
  Waves,
  Wind,
  Home,
  Heart,
  Users,
  Radio,
  MapPin
} from 'lucide-react';

export function SOSActivation() {
  const navigate = useNavigate();
  const [activated, setActivated] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#dc2626] to-[#991b1b]">
      <div className="px-6 pt-8 pb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-8"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {!activated ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-full border-4 border-white/30">
                <AlertCircle className="w-24 h-24 text-white" strokeWidth={2} />
              </div>
            </div>

            <h1 className="text-white text-3xl mb-3">Emergency SOS</h1>
            <p className="text-white/90 mb-12 max-w-sm">
              Select emergency type to alert nearby rescuers and emergency contacts
            </p>

            <div className="w-full max-w-sm space-y-3 mb-12">
              <EmergencyTypeButton icon={Flame} label="Fire Emergency" onClick={() => setActivated(true)} />
              <EmergencyTypeButton icon={Waves} label="Flood / Water Emergency" onClick={() => setActivated(true)} />
              <EmergencyTypeButton icon={Wind} label="Storm / Earthquake" onClick={() => setActivated(true)} />
              <EmergencyTypeButton icon={Home} label="Building Collapse" onClick={() => setActivated(true)} />
              <EmergencyTypeButton icon={Heart} label="Medical Emergency" onClick={() => setActivated(true)} />
              <EmergencyTypeButton icon={Users} label="Crowd Emergency" onClick={() => setActivated(true)} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative bg-white p-8 rounded-full">
                <Radio className="w-24 h-24 text-[#dc2626] animate-pulse" strokeWidth={2} />
              </div>
            </div>

            <h1 className="text-white text-3xl mb-3">SOS ACTIVATED</h1>
            <p className="text-white/90 mb-8 max-w-sm text-lg">
              Sending emergency request through nearby devices...
            </p>

            <div className="w-full max-w-sm bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 mb-8">
              <div className="space-y-4">
                <StatusItem icon={Radio} text="Broadcasting via mesh network" status="active" />
                <StatusItem icon={Users} text="Alerting 3 emergency contacts" status="active" />
                <StatusItem icon={MapPin} text="Sharing your location" status="active" />
                <StatusItem icon={AlertCircle} text="Nearest rescue team: 4.2 km" status="pending" />
              </div>
            </div>

            <div className="w-full max-w-sm bg-white rounded-2xl p-6 mb-6">
              <h3 className="text-[#dc2626] mb-2">Rescue Team Responding</h3>
              <p className="text-gray-600 text-sm mb-4">ETA: 12 minutes</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#3b82f6] rounded-full flex items-center justify-center text-white">
                  RT
                </div>
                <div className="flex-1">
                  <h4 className="text-sm">Team Alpha - District 5</h4>
                  <p className="text-xs text-gray-500">4 members • Medical equipped</p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm space-y-3">
              <button className="w-full bg-white text-[#dc2626] p-4 rounded-2xl">
                Send Voice Message
              </button>
              <button className="w-full bg-white/20 backdrop-blur-sm border-2 border-white text-white p-4 rounded-2xl">
                Share Additional Info
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmergencyTypeButton({ icon: Icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white text-[#dc2626] p-5 rounded-2xl flex items-center gap-4 shadow-xl active:scale-95 transition-transform"
    >
      <Icon className="w-6 h-6" />
      <span className="text-left flex-1">{label}</span>
    </button>
  );
}

function StatusItem({ icon: Icon, text, status }: any) {
  return (
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${status === 'active' ? 'text-[#22c55e]' : 'text-white/60'}`} />
      <span className="text-white text-sm flex-1">{text}</span>
      {status === 'active' && <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></div>}
    </div>
  );
}
