import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { ArrowLeft, MapPin, AlertTriangle, Users, Shield, Layers, Navigation } from 'lucide-react';

export function DisasterMap() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-background flex flex-col text-white overflow-hidden relative">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[0.5] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'var(--map-bg)' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>
      
      <div className="glass px-6 pt-16 pb-6 border-b border-white/5 relative z-20 bg-white/10 backdrop-blur-sm">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/5 blur-[80px]"></div>
        <div className="flex items-center gap-5 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-3.5 glass border-primary/10 rounded-full active:scale-90 transition-all shadow-xl bg-white/60"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">Emergency <span className="text-primary">Map</span></h1>
            <p className="text-[11px] text-white/60 font-mono uppercase tracking-[0.4em] italic font-black">Live Danger & Safety Zones</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          <FilterChip label="All Areas" active onClick={() => toast.info('Showing All Areas')} />
          <FilterChip label="Risk Areas" color="red" onClick={() => toast.info('Showing Risk Areas')} />
          <FilterChip label="Safe Shelters" color="blue" onClick={() => toast.info('Showing Safe Shelters')} />
          <FilterChip label="Rescue Teams" onClick={() => toast.info('Showing Rescue Teams')} />
        </div>
      </div>

      <div className="flex-1 relative bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(92,122,103,0.05),_transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--primary) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full p-6">
            <div className="absolute top-20 left-12 w-64 h-64 bg-destructive opacity-20 rounded-full blur-[100px]"></div>
            <div className="absolute top-32 right-16 w-48 h-48 bg-primary opacity-20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-32 left-20 w-56 h-56 bg-accent opacity-20 rounded-full blur-[100px]"></div>

            <DangerZone top="15%" left="15%" severity="high" label="Flood Zone" />
            <DangerZone top="25%" right="20%" severity="medium" label="Landslide Risk" />
            <SafeZone bottom="30%" left="25%" label="Safe Zone" />
            <RescueTeam top="50%" left="50%" label="Team Alpha" />
            <RescueTeam bottom="40%" right="30%" label="Team Beta" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary opacity-30 rounded-full animate-ping"></div>
                <div className="relative glass p-5 rounded-full border-2 border-primary shadow-[0_0_50px_rgba(0,242,255,0.4)] bg-white/70">
                  <MapPin className="w-8 h-8 text-primary" strokeWidth={2.5} />
                </div>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 glass border-primary/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap shadow-2xl bg-primary text-white">
                YOU
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 glass rounded-xl shadow-lg p-2 border border-white/10">
          <button
            onClick={() => toast.success('Grid Layers Synchronized')}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Layers className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>

      <div className="glass px-6 py-6 border-t border-white/10 relative z-20 bg-black/40 backdrop-blur-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">Active Alerts</h3>
          <button
            onClick={() => toast.loading('Scanning Area...', { duration: 2000 })}
            className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full border border-primary/10 shadow-sm"
          >
            Refresh Map
          </button>
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
          onClick={() => navigate('/safe-route', { state: { title: 'Safe Route', subtitle: 'Evacuation Path' } })}
          className="w-full bg-primary text-white p-10 rounded-[3rem] flex items-center justify-center gap-6 active:scale-95 transition-all shadow-2xl font-black uppercase tracking-[0.4em] text-sm border-t border-white/20"
        >
          <Navigation className="w-8 h-8" strokeWidth={2.5} />
          Get Safe Directions
        </button>
      </div>
    </div>
  );
}

function FilterChip({ label, active = false, color = 'blue', onClick }: any) {
  const colors = {
    blue: active ? 'bg-primary text-white shadow-md' : 'glass text-foreground/40 border-primary/10 bg-white/30',
    red: 'glass border-destructive/20 text-destructive bg-white/30',
    indigo: 'glass border-primary/20 text-primary bg-white/30',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all active:scale-95 ${colors[color]}`}
    >
      {label}
    </button>
  );
}

function DangerZone({ top, left, right, bottom, severity, label }: any) {
  const severityColors = {
    high: 'border-destructive bg-destructive/10 shadow-[0_0_20px_rgba(244,63,94,0.4)]',
    medium: 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(255,170,0,0.3)]',
  };

  return (
    <div
      className="absolute"
      style={{ top, left, right, bottom }}
    >
      <div className={`${severityColors[severity as keyof typeof severityColors]} border-2 p-4 rounded-2xl backdrop-blur-md animate-pulse`}>
        <AlertTriangle className={`w-8 h-8 ${severity === 'high' ? 'text-destructive' : 'text-accent'}`} strokeWidth={2.5} />
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap shadow-md border border-white/20 bg-white/80">
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
      <div className="border-2 border-primary bg-primary/20 p-2 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(0,242,255,0.2)]">
        <Shield className="w-5 h-5 text-primary" />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest whitespace-nowrap shadow-sm border-white/10">
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
      <div className="bg-primary p-2 rounded-full border-2 border-white/20 shadow-[0_0_15px_rgba(0,242,255,0.4)]">
        <Users className="w-4 h-4 text-background" />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest whitespace-nowrap shadow-sm border-white/10">
        {label}
      </div>
    </div>
  );
}

function ThreatItem({ type, distance, severity, icon: Icon }: any) {
  const severityColors = {
    high: 'glass border-l-destructive border-primary/5',
    medium: 'glass border-l-primary border-primary/5',
  };

  return (
    <div 
      onClick={() => navigate('/safe-route', { state: { title: 'Evacuation Route', subtitle: 'Priority Exit Path' } })}
      className={`${severityColors[severity]} border-l-4 rounded-lg p-3 flex items-center gap-3 bg-white/40 shadow-sm cursor-pointer hover:bg-white/60 active:scale-95 transition-all`}
    >
      <Icon className="w-5 h-5 text-foreground/30" />
      <div className="flex-1">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-tight">{type}</h4>
        <p className="text-[10px] text-foreground/40 font-mono uppercase">{distance}</p>
      </div>
    </div>
  );
}
