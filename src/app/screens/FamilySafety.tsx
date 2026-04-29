import { useNavigate } from 'react-router';
import { ArrowLeft, Users, CheckCircle, AlertCircle, Clock, MapPin, Phone, Plus } from 'lucide-react';

export function FamilySafety() {
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

        <h1 className="text-white text-3xl mb-2">Family Safety</h1>
        <p className="text-white/80">Track and connect with loved ones</p>
      </div>

      <div className="px-6 -mt-12">
        <button className="w-full bg-gradient-to-br from-[#16a34a] to-[#22c55e] text-white p-6 rounded-2xl mb-6 shadow-xl active:scale-95 transition-transform">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8" />
            <h3 className="text-2xl">I Am Safe</h3>
          </div>
          <p className="text-sm text-white/90">Tap to notify all emergency contacts</p>
        </button>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Emergency Contacts</h3>
            <button className="text-[#3b82f6] text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          <div className="space-y-3">
            <ContactCard
              name="Mom"
              lastUpdate="Safe • 15 min ago"
              status="safe"
              distance="2.3 km away"
              initial="M"
            />
            <ContactCard
              name="Dad"
              lastUpdate="No update • 2 hours ago"
              status="unknown"
              distance="Unknown location"
              initial="D"
            />
            <ContactCard
              name="Sister - Riya"
              lastUpdate="Safe • 5 min ago"
              status="safe"
              distance="5.1 km away"
              initial="R"
            />
            <ContactCard
              name="Brother - Arjun"
              lastUpdate="Needs help • 1 min ago"
              status="danger"
              distance="1.2 km away"
              initial="A"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h3 className="text-sm mb-4">Missing Person Locator</h3>
          <p className="text-gray-600 text-sm mb-4">
            Report or search for missing family members
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-[#dc2626] text-white p-3 rounded-xl text-sm">
              Report Missing
            </button>
            <button className="border border-gray-300 text-gray-700 p-3 rounded-xl text-sm">
              Search Database
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm mb-4">Recent Updates</h3>
          <div className="space-y-3">
            <UpdateItem
              name="Mom"
              action="marked safe"
              time="15 minutes ago"
              type="safe"
            />
            <UpdateItem
              name="Sister - Riya"
              action="shared location"
              time="5 minutes ago"
              type="safe"
            />
            <UpdateItem
              name="Brother - Arjun"
              action="sent SOS signal"
              time="1 minute ago"
              type="danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ name, lastUpdate, status, distance, initial }: any) {
  const statusConfig = {
    safe: {
      bgColor: 'bg-[#16a34a]',
      textColor: 'text-[#16a34a]',
      dotColor: 'bg-[#22c55e]',
    },
    unknown: {
      bgColor: 'bg-[#f59e0b]',
      textColor: 'text-[#f59e0b]',
      dotColor: 'bg-[#fbbf24]',
    },
    danger: {
      bgColor: 'bg-[#dc2626]',
      textColor: 'text-[#dc2626]',
      dotColor: 'bg-[#ef4444]',
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
      <div className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center text-white text-lg`}>
        {initial}
      </div>
      <div className="flex-1">
        <h4 className="text-sm mb-1">{name}</h4>
        <p className={`text-xs ${config.textColor} mb-1`}>{lastUpdate}</p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="w-3 h-3" />
          <span>{distance}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className={`w-3 h-3 ${config.dotColor} rounded-full`}></div>
        <button className="text-[#3b82f6]">
          <Phone className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function UpdateItem({ name, action, time, type }: any) {
  const typeConfig = {
    safe: {
      icon: CheckCircle,
      color: 'text-[#16a34a]',
      bgColor: 'bg-[#dcfce7]',
    },
    danger: {
      icon: AlertCircle,
      color: 'text-[#dc2626]',
      bgColor: 'bg-[#fecaca]',
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
      <div className={`${config.bgColor} p-2 rounded-full`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{name}</span> {action}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          <Clock className="w-3 h-3" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
