import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Shield,
  AlertCircle,
  CheckCircle,
  Bell,
  MapPin,
  Clock,
  Volume2
} from 'lucide-react';

export function GovernmentAlerts() {
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

        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8 text-white" />
          <h1 className="text-white text-3xl">Official Alerts</h1>
        </div>
        <p className="text-white/80">Government & authority announcements</p>
      </div>

      <div className="px-6 -mt-12">
        <div className="bg-[#dc2626] text-white rounded-2xl p-5 mb-6 shadow-xl border-4 border-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white p-2 rounded-full">
              <Volume2 className="w-6 h-6 text-[#dc2626] animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg">Emergency Broadcast</h3>
              <p className="text-xs text-white/80">National Disaster Management Authority</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 mb-3">
            <h4 className="text-white mb-2">SEVERE FLOOD WARNING</h4>
            <p className="text-sm text-white/90">
              Heavy rainfall expected in the next 6 hours. Residents in low-lying areas are advised to evacuate immediately. Emergency shelters are open.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/80">
            <Clock className="w-3 h-3" />
            <span>Issued: Today, 3:45 PM</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Recent Alerts</h3>
            <button className="text-xs text-[#3b82f6]">View All</button>
          </div>

          <div className="space-y-3">
            <AlertCard
              severity="critical"
              title="Evacuation Order"
              authority="District Magistrate Office"
              message="Mandatory evacuation for Riverside Colony and Green Valley areas. Move to nearest designated shelter immediately."
              time="1 hour ago"
              verified
            />
            <AlertCard
              severity="high"
              title="Road Closure Notice"
              authority="Traffic Police Department"
              message="Highway 42 closed due to flooding. Use alternate route via State Road 15."
              time="2 hours ago"
              verified
            />
            <AlertCard
              severity="medium"
              title="Relief Camp Information"
              authority="Municipal Corporation"
              message="Additional relief camps opened at City Stadium and Town Hall. Free food and shelter available 24/7."
              time="3 hours ago"
              verified
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-sm mb-4">District Emergency Updates</h3>

          <div className="space-y-3">
            <DistrictUpdate
              district="Central District"
              status="critical"
              updates="12 active incidents"
            />
            <DistrictUpdate
              district="North District"
              status="high"
              updates="8 active incidents"
            />
            <DistrictUpdate
              district="South District"
              status="safe"
              updates="All clear"
            />
            <DistrictUpdate
              district="East District"
              status="medium"
              updates="4 active incidents"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm mb-4">Emergency Contacts</h3>

          <div className="space-y-2">
            <ContactRow
              department="District Control Room"
              number="1800-XXX-XXXX"
            />
            <ContactRow
              department="Police Emergency"
              number="100"
            />
            <ContactRow
              department="Ambulance"
              number="108"
            />
            <ContactRow
              department="Fire Department"
              number="101"
            />
            <ContactRow
              department="Disaster Management"
              number="1070"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertCard({ severity, title, authority, message, time, verified }: any) {
  const severityConfig = {
    critical: {
      border: 'border-[#dc2626]',
      bg: 'bg-[#fef2f2]',
      icon: AlertCircle,
      iconColor: 'text-[#dc2626]',
    },
    high: {
      border: 'border-[#ea580c]',
      bg: 'bg-[#fff7ed]',
      icon: AlertCircle,
      iconColor: 'text-[#ea580c]',
    },
    medium: {
      border: 'border-[#fbbf24]',
      bg: 'bg-[#fefce8]',
      icon: Bell,
      iconColor: 'text-[#fbbf24]',
    },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div className={`border-l-4 ${config.border} ${config.bg} rounded-lg p-4`}>
      <div className="flex items-start gap-3 mb-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm">{title}</h4>
            {verified && (
              <CheckCircle className="w-4 h-4 text-[#16a34a]" />
            )}
          </div>
          <p className="text-xs text-gray-500 mb-2">{authority}</p>
          <p className="text-sm text-gray-700 mb-3">{message}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DistrictUpdate({ district, status, updates }: any) {
  const statusConfig = {
    critical: {
      color: 'bg-[#dc2626]',
      text: 'text-[#dc2626]',
      bg: 'bg-[#fef2f2]',
    },
    high: {
      color: 'bg-[#ea580c]',
      text: 'text-[#ea580c]',
      bg: 'bg-[#fff7ed]',
    },
    medium: {
      color: 'bg-[#fbbf24]',
      text: 'text-[#f59e0b]',
      bg: 'bg-[#fefce8]',
    },
    safe: {
      color: 'bg-[#16a34a]',
      text: 'text-[#16a34a]',
      bg: 'bg-[#dcfce7]',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-xl p-4 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 ${config.color} rounded-full`}></div>
        <div>
          <h4 className="text-sm">{district}</h4>
          <p className={`text-xs ${config.text}`}>{updates}</p>
        </div>
      </div>
      <button className="text-xs text-[#3b82f6]">Details →</button>
    </div>
  );
}

function ContactRow({ department, number }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-sm text-gray-700">{department}</span>
      <a
        href={`tel:${number}`}
        className="text-sm text-[#3b82f6] font-medium"
      >
        {number}
      </a>
    </div>
  );
}
