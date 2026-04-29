import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GhostNetAPI } from '../../services/api';
import { toast } from 'sonner';
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
  MapPin,
  Loader2
} from 'lucide-react';

export function SOSActivation() {
  const navigate = useNavigate();
  const [activated, setActivated] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const handleActivate = async (type: string) => {
    setIsActivating(true);
    try {
      const locationData = await GhostNetAPI.getCurrentLocation().catch(() => ({ lat: 0, lng: 0 }));
      const locationStr = locationData.lat ? `${locationData.lat.toFixed(4)}, ${locationData.lng.toFixed(4)}` : 'Remote';
      
      await GhostNetAPI.registerHelpSeeker({
        name: 'Anonymous Citizen',
        need: `SOS - ${type} EMERGENCY`,
        location: locationStr
      });

      await toast.promise(GhostNetAPI.activateSOS({ type, location: locationStr }), {
        loading: 'Broadcasting Distress Signal...',
        success: 'Distress Signal Received',
        error: 'Signal Blocked. Try satellite link.',
      });
      setActivated(true);
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="px-6 pt-16 pb-6 relative z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        {!activated ? (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-12 floating">
              <div className="absolute inset-0 bg-destructive/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative glass p-12 rounded-full border border-destructive/20 shadow-xl bg-white/70">
                {isActivating ? (
                  <Loader2 className="w-28 h-28 text-destructive animate-spin" strokeWidth={1.5} />
                ) : (
                  <AlertCircle className="w-28 h-28 text-destructive" strokeWidth={1.5} />
                )}
              </div>
            </div>

            <h1 className="text-foreground text-5xl font-black tracking-tighter uppercase mb-2 italic">Call for <span className="text-indigo-600">Help</span></h1>
            <p className="text-indigo-600/60 font-mono text-[11px] tracking-[0.4em] uppercase mb-12 italic font-black">What is your emergency?</p>

            <div className="w-full max-w-sm space-y-4 mb-12">
              <EmergencyTypeButton icon={Flame} label="Fire Help" onClick={() => handleActivate('Fire')} />
              <EmergencyTypeButton icon={Waves} label="Flood Help" onClick={() => handleActivate('Flood')} />
              <EmergencyTypeButton icon={Wind} label="Storm Help" onClick={() => handleActivate('Storm')} />
              <EmergencyTypeButton icon={Home} label="Building Collapse" onClick={() => handleActivate('Collapse')} />
              <EmergencyTypeButton icon={Heart} label="Medical Help" onClick={() => handleActivate('Medical')} />
              <EmergencyTypeButton icon={Users} label="Crowd / Safety Help" onClick={() => handleActivate('Safety')} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-12 floating">
              <div className="relative glass p-12 rounded-full border border-primary/20 shadow-2xl bg-white/70">
                <Radio className="w-28 h-28 text-primary animate-pulse" strokeWidth={2} />
              </div>
            </div>

            <h1 className="text-foreground text-5xl font-black tracking-tighter uppercase mb-2 italic">Help is <span className="text-primary">Coming</span></h1>
            <p className="text-primary/60 font-mono text-[11px] tracking-[0.3em] uppercase mb-12 italic font-black">Your location is shared with rescuers</p>

            <div className="w-full max-w-sm glass border-primary/10 rounded-[3rem] p-10 mb-10 shadow-lg bg-white/70">
              <div className="space-y-8">
                <StatusItem icon={Radio} text="Safe Connection" status="active" />
                <StatusItem icon={Users} text="Notifying Family" status="active" />
                <StatusItem icon={MapPin} text="Location Sent" status="active" />
                <StatusItem icon={AlertCircle} text="Rescue Team: 4.2 KM away" status="pending" />
              </div>
            </div>

            <div className="w-full max-w-sm glass border-primary/20 rounded-[3rem] p-10 mb-12 shadow-2xl bg-white/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px]"></div>
              <h3 className="text-primary font-black tracking-tighter uppercase mb-2 italic text-2xl relative z-10">Rescue Team is on the way</h3>
              <p className="text-foreground/40 text-[11px] font-mono uppercase tracking-widest mb-10 italic font-black relative z-10">Help will arrive in 12:00 MINUTES</p>
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black border border-primary/10 text-2xl shadow-inner">
                  R1
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-base font-black text-foreground uppercase tracking-tighter">Team Alpha</h4>
                  <p className="text-[10px] text-foreground/40 font-mono uppercase font-bold italic">Advanced Medical Unit</p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm space-y-6">
              <button
                onClick={() => navigate('/disaster-map')}
                className="w-full bg-primary text-white p-8 rounded-[2rem] font-black uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all text-[12px] border-t border-white/20"
              >
                Track Rescue ETA
              </button>
              <button
                onClick={() => setActivated(false)}
                className="w-full glass border-destructive/20 text-destructive p-8 rounded-[2rem] font-black uppercase tracking-[0.4em] active:scale-95 transition-all bg-white/60 shadow-sm text-[12px]"
              >
                Cancel SOS
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
      className="w-full glass text-foreground/80 p-6 rounded-2xl flex items-center gap-5 shadow-sm active:scale-[0.98] transition-all border-primary/5 bg-white/70 group hover:border-primary/40 hover:shadow-md"
    >
      <div className="bg-primary/5 p-3 rounded-xl border border-primary/5 group-hover:bg-primary/10 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <span className="text-left flex-1 font-black uppercase tracking-widest text-[11px] group-hover:text-foreground transition-colors">{label}</span>
    </button>
  );
}

function StatusItem({ icon: Icon, text, status }: any) {
  return (
    <div className="flex items-center gap-4">
      <Icon className={`w-5 h-5 ${status === 'active' ? 'text-primary' : 'text-foreground/10'}`} />
      <span className="text-foreground/40 text-[10px] flex-1 font-mono uppercase tracking-[0.2em]">{text}</span>
      {status === 'active' && <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>}
    </div>
  );
}
