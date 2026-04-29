import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Shield,
  AlertCircle,
  CheckCircle,
  Bell,
  MapPin,
  Clock,
  Volume2,
  Navigation
} from 'lucide-react';

export function GovernmentAlerts() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full text-white flex flex-col font-sans relative overflow-hidden pb-32">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="glass px-6 pt-16 pb-10 border-b border-white/10 relative z-20 bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black italic tracking-tighter uppercase mb-2">Official <span className="text-primary">Alerts</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">Government Warnings & Info</p>
      </div>

      <div className="flex-1 px-6 pt-10 relative z-10">
        <div className="glass border border-primary/20 rounded-[3rem] p-10 mb-10 shadow-xl relative overflow-hidden floating bg-white/60">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px]"></div>
          <div className="flex items-center gap-5 mb-8 relative z-10">
            <div className="bg-primary/10 p-5 rounded-full border border-primary/10 shadow-inner">
              <Volume2 className="w-8 h-8 text-primary animate-pulse" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-base font-black uppercase tracking-tighter">Emergency Broadcast</h3>
              <p className="text-[10px] text-foreground/50 font-mono uppercase tracking-widest font-bold">Government Authorities</p>
            </div>
          </div>

          <div className="glass bg-white/40 border-primary/10 rounded-3xl p-8 mb-8 relative z-10 shadow-inner">
            <h4 className="text-primary font-black italic tracking-tighter uppercase text-sm mb-4">Priority Warning: Flood Alert</h4>
            <p className="text-xs text-foreground/80 font-mono leading-relaxed uppercase tracking-tight font-bold">
              HEAVY RAIN EXPECTED • 6 HOUR WINDOW • EVACUATE LOW-LYING AREAS IMMEDIATELY • SHELTERS ARE OPEN
            </p>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-foreground/40 font-mono uppercase tracking-widest relative z-10 font-bold">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>UPDATED: TODAY, 15:45</span>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <AlertCard
            severity="critical"
            title="EVACUATION PROTOCOL"
            authority="DISTRICT MAGISTRATE COMMAND"
            message="Mandatory evacuation for Riverside Colony and Green Valley areas. Move to nearest designated shelter immediately."
            time="1H AGO"
            verified
          />
          <AlertCard
            severity="high"
            title="PATHWAY CLOSURE"
            authority="TRAFFIC LOGISTICS DEPT"
            message="Highway 42 closed due to flooding. Use alternate route via State Road 15."
            time="2H AGO"
            verified
          />
        </div>

        <button
          onClick={() => navigate('/safe-route')}
          className="w-full bg-primary text-white p-10 rounded-[3rem] flex items-center justify-center gap-6 active:scale-95 transition-all shadow-2xl font-black uppercase tracking-[0.4em] text-sm border-t border-white/20 mb-12"
        >
          <Navigation className="w-8 h-8" strokeWidth={2.5} />
          Find Safe Route
        </button>
      </div>
    </div>
  );
}

function AlertCard({ severity, title, authority, message, time, verified }: any) {
  const severityConfig = {
    critical: {
      border: 'border-destructive/30',
      bg: 'bg-destructive/5',
      icon: AlertCircle,
      iconColor: 'text-destructive',
    },
    high: {
      border: 'border-accent/30',
      bg: 'bg-accent/5',
      icon: AlertCircle,
      iconColor: 'text-accent',
    },
    medium: {
      border: 'border-primary/30',
      bg: 'bg-primary/5',
      icon: Bell,
      iconColor: 'text-primary',
    },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div className={`glass border-l-4 ${config.border} ${config.bg} rounded-3xl p-6 mb-6 bg-white/40 shadow-sm`}>
      <div className="flex items-start gap-5">
        <div className={`p-3 rounded-xl bg-white/40 border border-primary/5 shadow-sm`}>
          <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0`} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 pt-1">
            <h4 className="text-[13px] font-black uppercase tracking-tight text-foreground">{title}</h4>
            {verified && (
              <CheckCircle className="w-4 h-4 text-primary" strokeWidth={2.5} />
            )}
          </div>
          <p className="text-[10px] text-foreground/40 mb-3 font-mono uppercase tracking-widest font-bold">{authority}</p>
          <p className="text-xs text-foreground/70 mb-5 leading-relaxed font-bold">{message}</p>
          <div className="flex items-center gap-2 text-[10px] text-foreground/30 font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-primary" />
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
      color: 'bg-red-500',
      text: 'text-red-500',
    },
    high: {
      color: 'bg-orange-500',
      text: 'text-orange-500',
    },
    medium: {
      color: 'bg-primary',
      text: 'text-primary',
    },
    safe: {
      color: 'bg-green-500',
      text: 'text-green-500',
    },
  };

  const config = statusConfig[status];

  return (
    <div className="glass rounded-xl p-4 flex items-center justify-between border border-white/5">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 ${config.color} rounded-full`}></div>
        <div>
          <h4 className="text-sm">{district}</h4>
          <p className={`text-xs ${config.text}`}>{updates}</p>
        </div>
      </div>
      <button className="text-[10px] font-black text-primary uppercase tracking-widest">Query →</button>
    </div>
  );
}

function ContactRow({ department, number }: any) {
  return (
    <div className="flex items-center justify-between p-4 glass border-white/5 rounded-2xl mb-4">
      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{department}</span>
      <a
        href={`tel:${number}`}
        className="text-[10px] font-black text-primary font-mono tracking-[0.2em] bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20"
      >
        {number}
      </a>
    </div>
  );
}
