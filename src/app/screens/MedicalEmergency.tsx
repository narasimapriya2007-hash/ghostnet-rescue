import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Heart,
  Ambulance,
  MapPin,
  Phone,
  MessageSquare,
  Activity,
  AlertCircle
} from 'lucide-react';

export function MedicalEmergency() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hospitals');

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] pb-6">
      <div className="bg-gradient-to-br from-[#dc2626] to-[#991b1b] px-6 pt-8 pb-20 rounded-b-[2rem]">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="text-white text-3xl mb-2">Medical Emergency</h1>
        <p className="text-white/80">Immediate medical assistance & guidance</p>
      </div>

      <div className="px-6 -mt-12">
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <button className="w-full bg-[#dc2626] text-white p-5 rounded-2xl mb-4 active:scale-95 transition-transform">
            <div className="flex items-center justify-center gap-3">
              <Ambulance className="w-7 h-7" />
              <div className="text-left">
                <h3 className="text-lg">Request Ambulance</h3>
                <p className="text-sm text-white/90">Emergency medical transport</p>
              </div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-[#fef2f2] text-[#dc2626] p-4 rounded-xl border border-[#dc2626]/20">
              <Phone className="w-5 h-5 mb-2" />
              <span className="text-sm">Call Hospital</span>
            </button>
            <button
              onClick={() => setActiveTab('firstaid')}
              className="bg-[#fef2f2] text-[#dc2626] p-4 rounded-xl border border-[#dc2626]/20"
            >
              <Heart className="w-5 h-5 mb-2" />
              <span className="text-sm">First Aid AI</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          <TabButton
            label="Hospitals"
            active={activeTab === 'hospitals'}
            onClick={() => setActiveTab('hospitals')}
          />
          <TabButton
            label="Ambulances"
            active={activeTab === 'ambulances'}
            onClick={() => setActiveTab('ambulances')}
          />
          <TabButton
            label="First Aid"
            active={activeTab === 'firstaid'}
            onClick={() => setActiveTab('firstaid')}
          />
        </div>

        {activeTab === 'hospitals' && (
          <div className="space-y-3">
            <HospitalCard
              name="City General Hospital"
              distance="2.1 km"
              beds="12 available"
              specialties="Emergency, Trauma, ICU"
              waitTime="15 min"
            />
            <HospitalCard
              name="St. Mary Medical Center"
              distance="3.5 km"
              beds="8 available"
              specialties="Emergency, Surgery"
              waitTime="22 min"
            />
            <HospitalCard
              name="District Health Clinic"
              distance="1.8 km"
              beds="5 available"
              specialties="Primary Care, Emergency"
              waitTime="10 min"
            />
          </div>
        )}

        {activeTab === 'ambulances' && (
          <div className="space-y-4">
            <div className="bg-[#dcfce7] border-2 border-[#16a34a] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#16a34a] p-3 rounded-full">
                  <Ambulance className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#166534]">Ambulance En Route</h3>
                  <p className="text-sm text-[#166534]/80">ETA: 8 minutes</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 mb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#3b82f6] rounded-full flex items-center justify-center text-white">
                    A1
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm">Ambulance Unit A1</h4>
                    <p className="text-xs text-gray-500">Advanced Life Support</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>1.2 km away • Heading to your location</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="bg-[#16a34a] text-white p-3 rounded-xl text-sm">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Call Driver
                </button>
                <button className="bg-white text-[#16a34a] border border-[#16a34a] p-3 rounded-xl text-sm">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Message
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4">
              <h4 className="text-sm mb-3">Nearby Ambulances</h4>
              <div className="space-y-2">
                <AmbulanceItem unit="A2" distance="2.5 km" type="Basic Life Support" available />
                <AmbulanceItem unit="A3" distance="3.8 km" type="Advanced Life Support" available={false} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'firstaid' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8" />
                <div>
                  <h3 className="text-lg">AI First Aid Assistant</h3>
                  <p className="text-sm text-white/80">Get instant medical guidance</p>
                </div>
              </div>
              <button className="w-full bg-white text-[#3b82f6] p-3 rounded-xl">
                Start AI Consultation
              </button>
            </div>

            <div className="bg-white rounded-2xl p-4">
              <h4 className="text-sm mb-4">Emergency Guides</h4>
              <div className="space-y-2">
                <GuideItem
                  title="CPR Instructions"
                  description="Cardiopulmonary Resuscitation guide"
                  icon={Activity}
                  critical
                />
                <GuideItem
                  title="Stop Bleeding"
                  description="Control severe bleeding"
                  icon={AlertCircle}
                  critical
                />
                <GuideItem
                  title="Choking Response"
                  description="Heimlich maneuver steps"
                  icon={Heart}
                />
                <GuideItem
                  title="Burn Treatment"
                  description="First aid for burns"
                  icon={AlertCircle}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
        active ? 'bg-[#dc2626] text-white' : 'bg-white text-gray-700'
      }`}
    >
      {label}
    </button>
  );
}

function HospitalCard({ name, distance, beds, specialties, waitTime }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="bg-[#dc2626] p-3 rounded-full">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm mb-1">{name}</h4>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{distance} • {waitTime} wait</span>
          </div>
          <div className="bg-[#dcfce7] text-[#166534] text-xs px-2 py-1 rounded-full inline-block mb-2">
            {beds}
          </div>
          <p className="text-xs text-gray-600 mb-3">{specialties}</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-[#dc2626] text-white text-xs py-2 rounded-lg">
              Alert Hospital
            </button>
            <button className="border border-gray-300 text-gray-700 text-xs py-2 rounded-lg">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AmbulanceItem({ unit, distance, type, available }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 bg-[#dc2626] rounded-full flex items-center justify-center text-white text-sm">
        {unit}
      </div>
      <div className="flex-1">
        <h5 className="text-sm">{type}</h5>
        <p className="text-xs text-gray-500">{distance}</p>
      </div>
      {available ? (
        <span className="text-xs text-[#16a34a] bg-[#dcfce7] px-2 py-1 rounded-full">Available</span>
      ) : (
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">Busy</span>
      )}
    </div>
  );
}

function GuideItem({ title, description, icon: Icon, critical = false }: any) {
  return (
    <button className={`w-full p-3 rounded-xl flex items-center gap-3 ${
      critical ? 'bg-[#fef2f2] border border-[#dc2626]/20' : 'bg-gray-50'
    }`}>
      <div className={`p-2 rounded-full ${critical ? 'bg-[#dc2626]' : 'bg-gray-200'}`}>
        <Icon className={`w-4 h-4 ${critical ? 'text-white' : 'text-gray-600'}`} />
      </div>
      <div className="flex-1 text-left">
        <h5 className="text-sm">{title}</h5>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </button>
  );
}
