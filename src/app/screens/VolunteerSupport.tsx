import { useNavigate } from 'react-router';
import { ArrowLeft, Star, MapPin, Check, Clock, Award } from 'lucide-react';

export function VolunteerSupport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] pb-6">
      <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] px-6 pt-8 pb-20 rounded-b-[2rem]">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="text-white text-3xl mb-2">Volunteer Rescue</h1>
        <p className="text-white/80">Connect with nearby trained volunteers</p>
      </div>

      <div className="px-6 -mt-12">
        <div className="bg-[#3b82f6] text-white p-5 rounded-2xl mb-6 shadow-xl">
          <h3 className="mb-3">Become a Volunteer</h3>
          <p className="text-sm text-white/90 mb-4">
            Join our network and help save lives in your community
          </p>
          <button className="w-full bg-white text-[#3b82f6] p-3 rounded-xl active:scale-95 transition-transform">
            Register as Volunteer
          </button>
        </div>

        <h3 className="text-gray-700 mb-4">Nearby Active Volunteers</h3>

        <div className="space-y-3">
          <VolunteerCard
            name="Rajesh Kumar"
            distance="0.8 km"
            rating={4.9}
            skills="First Aid, Fire Safety"
            available
          />
          <VolunteerCard
            name="Priya Singh"
            distance="1.2 km"
            rating={4.8}
            skills="Medical, Search & Rescue"
            available
          />
          <VolunteerCard
            name="Ahmed Hassan"
            distance="2.1 km"
            rating={4.7}
            skills="Technical Rescue, Swimming"
            available={false}
          />
          <VolunteerCard
            name="Maria Lopez"
            distance="2.5 km"
            rating={5.0}
            skills="EMT, Crisis Communication"
            available
          />
        </div>

        <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4">Active Rescue Tasks</h3>
          <div className="space-y-3">
            <TaskCard
              title="Medical assistance needed"
              location="Sector 12, Block A"
              distance="1.5 km"
              priority="high"
            />
            <TaskCard
              title="Evacuation support required"
              location="Green Valley Colony"
              distance="3.2 km"
              priority="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function VolunteerCard({ name, distance, rating, skills, available }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-full flex items-center justify-center text-white text-lg">
          {name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm">{name}</h4>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
              <span className="text-sm text-gray-600">{rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{distance} away</span>
            {available ? (
              <span className="text-xs text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full"></div>
                Available
              </span>
            ) : (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                Busy
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mb-3">{skills}</p>
          {available && (
            <button className="w-full bg-[#3b82f6] text-white text-sm py-2 rounded-lg active:scale-95 transition-transform">
              Request Assistance
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ title, location, distance, priority }: any) {
  const priorityColors = {
    high: 'bg-[#fecaca] text-[#991b1b] border-[#dc2626]',
    medium: 'bg-[#fed7aa] text-[#9a3412] border-[#ea580c]',
  };

  return (
    <div className={`border-l-4 ${priorityColors[priority]} bg-white rounded-lg p-3`}>
      <h4 className="text-sm mb-2">{title}</h4>
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
        <MapPin className="w-3 h-3" />
        <span>{location} • {distance}</span>
      </div>
      <button className="text-xs text-[#3b82f6]">Accept Task →</button>
    </div>
  );
}
