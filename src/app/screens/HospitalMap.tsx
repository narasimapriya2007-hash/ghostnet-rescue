import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Phone, 
  Activity,
  ShieldCheck,
  Clock,
  Heart
} from 'lucide-react';
import { toast } from 'sonner';

export function HospitalMap() {
  const navigate = useNavigate();

  const hospitals = [
    { id: 1, name: 'City Central Hospital', pos: { top: '30%', left: '40%' }, type: 'Emergency' },
    { id: 2, name: 'Grace Medical Center', pos: { top: '60%', left: '70%' }, type: 'Specialized' },
    { id: 3, name: 'Regional Trauma Unit', pos: { top: '20%', left: '80%' }, type: 'Critical' },
    { id: 4, name: 'Westside Clinic', pos: { top: '75%', left: '25%' }, type: 'General' }
  ];

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>

      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate(-1)}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-white/10 shadow-xl bg-white/10 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>

        <h1 className="text-white text-5xl font-black italic tracking-tighter uppercase mb-2">Medical <span className="text-primary">Grid</span></h1>
        <p className="text-white/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">Nearby Hospitals & Facilities</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        {/* Immersive Map UI */}
        <div className="glass rounded-[3.5rem] h-[500px] mb-10 border border-primary/20 shadow-2xl relative overflow-hidden bg-white/5 backdrop-blur-2xl group">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i2048!3i1365!2m3!1e0!2sm!3i633013898!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover grayscale invert"></div>
          
          {/* Radar Animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full animate-[ping_4s_linear_infinite] opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/20 rounded-full animate-[ping_4s_linear_infinite] opacity-30" style={{ animationDelay: '1s' }}></div>

          {/* Hospital Markers */}
          {hospitals.map((hosp) => (
            <div 
              key={hosp.id}
              className="absolute group/marker cursor-pointer"
              style={{ top: hosp.pos.top, left: hosp.pos.left }}
              onClick={() => toast.success(`Selected: ${hosp.name}`)}
            >
              <div className="relative">
                <div className="bg-primary p-3 rounded-full shadow-[0_0_20px_rgba(30,58,138,0.5)] border-2 border-white relative z-10 hover:scale-125 transition-transform">
                  <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary/40 rounded-full animate-ping"></div>
                
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/marker:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 whitespace-nowrap">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">{hosp.name}</p>
                  <p className="text-[8px] font-mono text-primary uppercase font-bold">{hosp.type}</p>
                </div>
              </div>
            </div>
          ))}

          {/* User Location */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-white rounded-full border-4 border-primary shadow-2xl relative">
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-60"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 italic px-2">Active Facilities</h3>
          {hospitals.map((hosp) => (
            <div 
              key={hosp.id}
              className="glass rounded-[2.5rem] p-6 shadow-lg border border-white/5 bg-white/5 backdrop-blur-xl flex items-center justify-between hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="bg-primary/20 p-4 rounded-full border border-primary/20">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white uppercase tracking-tighter">{hosp.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">{hosp.type}</span>
                    <span className="text-[9px] text-white/40 font-mono uppercase font-bold">1.2 KM AWAY</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="glass p-3 rounded-full bg-white/10 border-white/5 text-white active:scale-90 transition-all">
                  <Phone className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => navigate('/route-details', { state: { shelterName: hosp.name } })}
                  className="glass p-3 rounded-full bg-primary/20 border-primary/10 text-primary active:scale-90 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/safe-route')}
          className="w-full bg-primary text-white p-10 rounded-[3rem] flex items-center justify-center gap-6 active:scale-95 transition-all shadow-2xl font-black uppercase tracking-[0.4em] text-sm border-t border-white/20"
        >
          <Navigation className="w-8 h-8" strokeWidth={2.5} />
          Navigate to Nearest
        </button>
      </div>
    </div>
  );
}
