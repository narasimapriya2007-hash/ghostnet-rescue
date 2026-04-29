import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { ArrowLeft, Navigation, MapPin, Home, AlertTriangle, Clock, Users, CheckCircle, Shield } from 'lucide-react';

export function SafeRoute() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show notification after 2 seconds to simulate "finding" a route
    const timer = setTimeout(() => setShowNotification(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black tracking-tighter italic uppercase mb-2">Safe <span className="text-primary">Directions</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">Live Navigation & Shelters</p>
      </div>

      <div className="flex-1 px-6 -mt-12">
        {showNotification && (
          <button
            onClick={() => navigate('/route-details')}
            className="w-full glass border-emerald-500/30 bg-emerald-500/10 rounded-[2.5rem] p-8 mb-10 flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-700 active:scale-95 transition-all border-l-4 border-emerald-500 group"
          >
            <div className="flex items-center gap-6">
              <div className="bg-emerald-500/20 p-3 rounded-full border border-emerald-500/30">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="text-left">
                <h4 className="text-emerald-600 font-black uppercase tracking-widest text-sm mb-1 italic">New Route Found</h4>
                <p className="text-foreground/40 text-[10px] font-mono uppercase tracking-widest font-black">Faster & Safer Path Identified</p>
              </div>
            </div>
            <Navigation className="w-6 h-6 text-emerald-500 group-hover:translate-x-2 transition-transform" />
          </button>
        )}

        <div className="glass rounded-[3rem] p-10 shadow-lg mb-10 border border-primary/10 floating bg-white/60">
          <div className="flex items-center gap-6 mb-10 relative z-10">
            <div className="bg-primary/10 p-6 rounded-full border border-primary/10 shadow-inner">
              <Navigation className="w-10 h-10 text-primary" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-[11px] text-primary font-mono uppercase tracking-widest font-black italic">Your Destination</h3>
              <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">Community Center</h2>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest mb-10 relative z-10 font-bold">
            <div className="flex items-center gap-2.5 text-foreground/50">
              <Clock className="w-5 h-5" strokeWidth={2.5} />
              <span>8 MINS</span>
            </div>
            <div className="flex items-center gap-2.5 text-foreground/50">
              <MapPin className="w-5 h-5" strokeWidth={2.5} />
              <span>1.2 KM</span>
            </div>
            <div className="flex items-center gap-2.5 text-primary font-black">
              <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
              <span>SAFE WAY</span>
            </div>
          </div>

          <div className="bg-white/40 rounded-[2.5rem] p-10 border border-primary/5 shadow-inner">
            <div className="space-y-6">
              <RouteStep step="1" instruction="Head northeast on Main Street" distance="0.3 km" />
              <RouteStep step="2" instruction="Turn right at City Plaza" distance="0.5 km" safe />
              <RouteStep step="3" instruction="Continue on Park Avenue" distance="0.4 km" />
              <RouteStep step="4" instruction="Reach Community Hall" destination />
            </div>
          </div>
        </div>

        <div className="glass border-destructive/20 bg-destructive/5 rounded-[2.5rem] p-8 mb-10 flex items-start gap-6 shadow-sm border-l-4">
          <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-0.5" strokeWidth={2.5} />
          <div>
            <h4 className="text-destructive font-black uppercase tracking-widest text-[11px] mb-1 italic">Road Blocked</h4>
            <p className="text-foreground/50 text-[10px] font-mono uppercase tracking-widest font-bold leading-relaxed italic">Main Highway flooded - Finding new route...</p>
          </div>
        </div>

        <h3 className="text-stone-500 mb-3 uppercase tracking-widest text-[10px]">Nearby Havens</h3>
        <div className="space-y-3 mb-20">
          <ShelterCard
            name="Community Hall"
            distance="1.2 km"
            capacity="80%"
            amenities="Food, Water, Medical"
            active
          />
          <ShelterCard
            name="Public School Gymnasium"
            distance="2.5 km"
            capacity="45%"
            amenities="Food, Water"
          />
          <ShelterCard
            name="City Stadium"
            distance="3.8 km"
            capacity="30%"
            amenities="Food, Water, Medical, Blankets"
          />
        </div>
      </div>

      <div className="glass px-6 py-10 border-t border-primary/10 relative z-20 bg-white/70 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[3.5rem]">
        <button
          onClick={() => navigate('/route-details')}
          className="w-full bg-primary text-white p-10 rounded-[3rem] flex items-center justify-center gap-6 active:scale-95 transition-all shadow-2xl font-black uppercase tracking-[0.4em] text-sm border-t border-white/20"
        >
          <Navigation className="w-8 h-8" strokeWidth={2.5} />
          Navigate to Safe Shelter
        </button>
      </div>
    </div>
  );
}

function RouteStep({ step, instruction, distance, safe = false, destination = false }: any) {
  return (
    <div className="flex items-start gap-5 mb-5 last:mb-0">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
        destination ? 'bg-primary text-white shadow-lg' : 'glass text-foreground/40 border-primary/10 bg-white/40 shadow-sm'
      }`}>
        {destination ? <Home className="w-5 h-5" /> : step}
      </div>
      <div className="flex-1 pt-1">
        <p className={`text-[11px] font-bold uppercase tracking-tight ${destination ? 'text-foreground' : 'text-foreground/80'}`}>{instruction}</p>
        {distance && (
          <div className="flex items-center gap-3 mt-1.5">
            <p className="text-[10px] text-foreground/40 font-mono font-bold">{distance}</p>
            {safe && (
              <span className="text-[8px] text-primary bg-primary/10 px-3 py-0.5 rounded-full font-black uppercase tracking-widest border border-primary/20">
                SAFE ZONE
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ShelterCard({ name, distance, capacity, amenities, active = false }: any) {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/shelter-details', { 
        state: { 
          title: name, 
          subtitle: 'Emergency Haven Cluster',
          details: `This shelter has a capacity of ${capacity} and provides ${amenities}. Located ${distance} from your current position.`,
          stats: [
            { label: 'CAPACITY', value: capacity, icon: Users },
            { label: 'DISTANCE', value: distance, icon: MapPin },
            { label: 'RESOURCES', value: amenities.split(', ').length.toString(), icon: Shield },
            { label: 'STATUS', value: 'VERIFIED', icon: CheckCircle }
          ]
        } 
      })}
      className={`glass rounded-[2.5rem] p-6 shadow-sm border-primary/5 mb-4 bg-white/50 cursor-pointer active:scale-[0.98] transition-all hover:bg-white/70 ${active ? 'border-primary/30 ring-1 ring-primary/20' : ''}`}
    >
      <div className="flex items-start gap-5">
        <div className={`p-5 rounded-full shrink-0 ${active ? 'bg-primary/10' : 'glass border-primary/5 bg-white/20'}`}>
          <Home className={`w-7 h-7 ${active ? 'text-primary' : 'text-foreground/20'}`} strokeWidth={active ? 2.5 : 2} />
        </div>
        <div className="flex-1 pt-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-black text-foreground uppercase tracking-tighter">{name}</h4>
            {active && (
              <span className="text-[8px] text-primary bg-primary/10 px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] border border-primary/20">
                TARGET
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-foreground/50 font-mono uppercase font-bold">{distance} away</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-foreground/40 font-mono uppercase font-bold tracking-widest">Fullness</span>
            <div className="flex items-center gap-4">
              <div className="w-24 h-2 bg-foreground/5 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-primary shadow-[0_0_8px_var(--primary)]"
                  style={{ width: capacity }}
                ></div>
              </div>
              <span className="text-[10px] text-primary font-black">{capacity}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-6">
            {amenities.split(', ').map((item: string) => (
              <span key={item} className="text-[8px] font-black text-foreground/40 bg-foreground/5 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/5">
                {item}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate('/disaster-map');
              }}
              className="flex-1 glass py-4 rounded-2xl border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all bg-white/40 shadow-sm"
            >
              View on Map
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate('/route-details', { state: { shelterName: name } });
              }}
              className="flex-1 bg-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg border-t border-white/20"
            >
              Navigate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
