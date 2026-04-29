import { useNavigate, useLocation } from 'react-router';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  Wind
} from 'lucide-react';
import { toast } from 'sonner';

export function RouteDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const shelterName = location.state?.shelterName || 'Central Shelter A';

  const handleStartNavigation = () => {
    toast.success('Live Navigation Started • Stay on the Green Path');
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground pb-32 font-sans relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'var(--grid-pattern)', backgroundSize: '32px 32px' }}></div>
      
      <div className="bg-gradient-to-br from-emerald-50/50 to-background px-6 pt-16 pb-24 rounded-b-[4rem] shadow-sm border-b border-emerald-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/safe-route')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-emerald-500/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black tracking-tighter uppercase mb-2 italic">Safe <span className="text-emerald-500">Route</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase italic font-black">Navigation Protocol Active</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        {/* Mock Map UI */}
        <div className="glass rounded-[3.5rem] h-[450px] mb-10 border border-emerald-500/10 shadow-2xl relative overflow-hidden bg-emerald-50/20 group">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i2048!3i1365!2m3!1e0!2sm!3i633013898!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover"></div>
          
          {/* Path Visualization */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path 
              d="M 50 400 L 150 300 L 250 350 L 300 200 L 350 100" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeDasharray="16 12"
              className="animate-[dash_20s_linear_infinite]"
            />
          </svg>

          {/* Blocked Roads Indicators */}
          <div className="absolute top-[320px] left-[180px] flex flex-col items-center gap-2">
            <div className="bg-destructive/20 p-2 rounded-full border border-destructive/30 animate-pulse">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <span className="text-[8px] font-black text-destructive uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded-full">Road Blocked</span>
          </div>

          <div className="absolute top-[220px] left-[100px] flex flex-col items-center gap-2">
            <div className="bg-destructive/20 p-2 rounded-full border border-destructive/30 animate-pulse">
              <Wind className="w-6 h-6 text-destructive" />
            </div>
            <span className="text-[8px] font-black text-destructive uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded-full">High Winds</span>
          </div>

          {/* Destination Pin */}
          <div className="absolute top-[80px] left-[340px] flex flex-col items-center gap-2">
            <div className="bg-emerald-500 p-3 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-white">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full shadow-lg">Shelter A</span>
          </div>

          {/* Current Location Pin */}
          <div className="absolute bottom-[40px] left-[40px]">
            <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-xl relative">
              <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-40"></div>
            </div>
          </div>
        </div>

        {/* Shelter Destination Card */}
        <div className="glass rounded-[3rem] p-10 shadow-lg border border-emerald-500/10 bg-white/60 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px]"></div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="bg-emerald-500/10 p-5 rounded-full border border-emerald-500/10 shadow-inner">
                <ShieldCheck className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">{shelterName}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-foreground/40 font-mono font-bold uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>12 Min Arrival</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-emerald-600 tracking-tighter">1.8 KM</p>
              <p className="text-[9px] text-foreground/30 font-mono uppercase tracking-widest font-black italic">Remaining</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <span className="h-px flex-1 bg-emerald-500/10"></span>
            <span className="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.3em]">Safe Zone Verified</span>
            <span className="h-px flex-1 bg-emerald-500/10"></span>
          </div>

          <div className="grid grid-cols-2 gap-5 mb-10">
            <div className="glass bg-white/40 p-5 rounded-2xl border border-emerald-500/5">
              <p className="text-[9px] text-foreground/30 uppercase font-black mb-1">Risk Level</p>
              <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Minimal</p>
            </div>
            <div className="glass bg-white/40 p-5 rounded-2xl border border-emerald-500/5">
              <p className="text-[9px] text-foreground/30 uppercase font-black mb-1">Crowd Level</p>
              <p className="text-xs font-black text-amber-500 uppercase tracking-widest">Moderate</p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleStartNavigation}
          className="w-full bg-emerald-500 text-white p-10 rounded-[3rem] shadow-2xl active:scale-[0.98] transition-all border-t border-white/20 group relative overflow-hidden mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-40"></div>
          <div className="flex flex-col items-center relative z-10">
            <div className="bg-white/20 p-6 rounded-full mb-6 shadow-xl group-hover:scale-105 transition-transform border border-white/10">
              <Navigation className="w-12 h-12" strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-1 uppercase">Start Navigation</h2>
            <p className="text-white/80 text-[10px] font-mono uppercase tracking-[0.5em]">Global GPS Sync Active</p>
          </div>
        </button>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
}
