import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Ambulance, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export function AmbulanceTracking() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
      setEta(prev => (prev > 1 ? prev - 0.1 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-destructive/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      
      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/5 blur-[80px]"></div>
        <button
          onClick={() => navigate(-1)}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-white/10 shadow-xl bg-white/10 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>

        <h1 className="text-white text-5xl font-black italic tracking-tighter uppercase mb-2">Unit <span className="text-destructive">A1</span></h1>
        <p className="text-white/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">Live Ambulance Tracking</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="glass rounded-[3.5rem] p-10 shadow-lg border border-white/10 bg-white/10 backdrop-blur-2xl mb-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 blur-[40px]"></div>
          
          <div className="bg-destructive/20 p-10 rounded-full w-fit mx-auto mb-10 shadow-2xl border border-destructive/20 relative">
            <Ambulance className="w-16 h-16 text-destructive animate-bounce" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-destructive/20 rounded-full animate-ping"></div>
          </div>

          <div className="flex items-center justify-between mb-10">
            <div className="text-left">
              <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-1">{Math.floor(eta)} MIN</h3>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest font-black italic">Estimated Arrival</p>
            </div>
            <div className="text-right">
              <h3 className="text-4xl font-black text-destructive tracking-tighter uppercase mb-1">0.8 KM</h3>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest font-black italic">Distance Away</p>
            </div>
          </div>

          <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden mb-10 shadow-inner border border-white/5">
            <div 
              className="h-full bg-destructive shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <button 
              onClick={() => {
                toast.promise(new Promise(res => setTimeout(res, 2000)), {
                  loading: 'Establishing Secure Line...',
                  success: 'Connected to Driver • Use Hands-free',
                  error: 'Signal lost. Retrying...'
                });
              }}
              className="glass flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-white/10 bg-white/5 active:scale-95 transition-all hover:bg-white/10"
            >
              <Phone className="w-8 h-8 text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">Call Driver</span>
            </button>
            <button 
              onClick={() => {
                toast('Secure Tactical Chat', {
                  description: 'Driver: "I am passing the bridge, arrival in 2 mins. Stand by."',
                  action: { label: 'Reply', onClick: () => console.log('Reply clicked') },
                });
              }}
              className="glass flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-white/10 bg-white/5 active:scale-95 transition-all hover:bg-white/10"
            >
              <MessageSquare className="w-8 h-8 text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Chat</span>
            </button>
          </div>
        </div>

        <div className="glass rounded-[3rem] p-10 shadow-lg border border-white/5 bg-white/5 backdrop-blur-xl mb-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-primary/20 p-4 rounded-full border border-primary/20">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="text-base font-black text-white uppercase tracking-tighter">Emergency Protocol Active</h4>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Stay at your current location</p>
            </div>
          </div>

          <div className="space-y-6">
            <TrackingStep icon={MapPin} label="Unit Dispatched" time="12:42" completed />
            <TrackingStep icon={Clock} label="En Route" time="12:45" active />
            <TrackingStep icon={AlertCircle} label="Arrival" time="12:50" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackingStep({ icon: Icon, label, time, completed = false, active = false }: any) {
  return (
    <div className="flex items-center gap-6">
      <div className={`p-3 rounded-full border ${
        completed ? 'bg-primary/20 border-primary/20 text-primary' : 
        active ? 'bg-destructive/20 border-destructive/20 text-destructive animate-pulse' : 
        'bg-white/5 border-white/5 text-white/20'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-black uppercase tracking-widest ${completed || active ? 'text-white' : 'text-white/20'}`}>{label}</span>
          <span className="text-[10px] font-mono text-white/40">{time}</span>
        </div>
      </div>
    </div>
  );
}
