import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GhostNetAPI } from '../../services/api';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Heart,
  Ambulance,
  MapPin,
  Phone,
  MessageSquare,
  Activity,
  AlertCircle,
  Loader2
} from 'lucide-react';

export function MedicalEmergency() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hospitals');
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [ambulances, setAmbulances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [hosp, amb] = await Promise.all([
          GhostNetAPI.getHospitals(),
          GhostNetAPI.getAmbulances()
        ]);
        setHospitals(hosp);
        setAmbulances(amb);
      } catch (err) {
        toast.error('Failed to sync medical resources');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCallAmbulance = async () => {
    toast.promise(GhostNetAPI.activateSOS({ type: 'Medical' }), {
      loading: 'Contacting Emergency Services...',
      success: () => {
        navigate('/ambulance-tracking', { state: { title: 'Ambulance Tracking', subtitle: 'Unit A1 Dispatched' } });
        return 'Ambulance Dispatched!';
      },
      error: 'Dispatch failed. Retrying...'
    });
  };

  const handleCallHospital = (name: string) => {
    toast.success(`Calling ${name}...`);
  };

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black tracking-tighter uppercase mb-2 italic">Medical <span className="text-primary">Help</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase italic font-black">Emergency Medical Services</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="glass rounded-[3rem] p-10 shadow-lg mb-10 border border-primary/10 floating bg-white/60">
          <button 
            onClick={handleCallAmbulance}
            className="w-full bg-primary text-white p-10 rounded-[2.5rem] mb-10 active:scale-[0.98] transition-all shadow-2xl border-t border-white/20"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="bg-white/20 p-6 rounded-full border border-white/10 shadow-xl">
                <Ambulance className="w-12 h-12" strokeWidth={2.5} />
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-black tracking-tighter uppercase mb-2">Call Ambulance</h3>
                <p className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-90 font-bold">Priority Emergency Help</p>
              </div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-6">
            <button 
              onClick={() => handleCallHospital('Nearest Emergency Center')}
              className="glass text-destructive p-8 rounded-[2.5rem] border-destructive/10 hover:bg-destructive/5 transition-all shadow-sm bg-white/40 active:scale-95"
            >
              <Phone className="w-8 h-8 mb-4 mx-auto" strokeWidth={2.5} />
              <span className="text-[11px] font-black uppercase tracking-widest">Call Hospital</span>
            </button>
            <button
              onClick={() => navigate('/first-aid-assistant', { state: { title: 'First Aid Assistant', subtitle: 'Interactive Medical AI' } })}
              className="glass text-primary p-8 rounded-[2.5rem] border-primary/10 hover:bg-primary/5 transition-all shadow-sm bg-white/40 active:scale-95"
            >
              <Heart className="w-8 h-8 mb-4 mx-auto" strokeWidth={2.5} />
              <span className="text-[11px] font-black uppercase tracking-widest">First Aid Guide</span>
            </button>
          </div>
          <button
            onClick={() => navigate('/hospital-map', { state: { title: 'Hospital Map', subtitle: 'Nearby Medical Facilities' } })}
            className="w-full mt-6 glass text-indigo-600 p-6 rounded-2xl border-indigo-100 flex items-center justify-center gap-4 active:scale-[0.98] transition-all bg-white/40"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-[11px] font-black uppercase tracking-widest">Nearby Hospitals Map</span>
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          <TabButton
            label="Hospitals"
            active={activeTab === 'hospitals'}
            onClick={() => setActiveTab('hospitals')}
          />
          <TabButton
            label="Ambulances"
            active={activeTab === 'ambulances'}
            onClick={() => setActiveTab('ambulances')}
          />
          <TabButton
            label="First Aid"
            active={activeTab === 'firstaid'}
            onClick={() => setActiveTab('firstaid')}
          />
        </div>

        {activeTab === 'hospitals' && (
          <div className="space-y-3">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center text-foreground/20 font-mono text-[10px] uppercase tracking-[0.4em] italic font-black">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                Detecting Local Hospitals...
              </div>
            ) : hospitals.map((hosp: any) => (
              <HospitalCard
                key={hosp.id}
                name={hosp.name}
                distance={hosp.distance}
                beds={hosp.beds}
                specialties={hosp.specialties}
                waitTime={hosp.waitTime}
                onCall={() => handleCallHospital(hosp.name)}
              />
            ))}
          </div>
        )}

        {activeTab === 'ambulances' && (
          <div className="space-y-4">
            {ambulances.filter(a => a.eta).map(a => (
              <div key={a.id} className="glass border border-indigo-500/10 bg-white/60 rounded-[3rem] p-10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[40px]"></div>
                <div className="flex items-center gap-6 mb-10 relative z-10">
                  <div className="bg-indigo-500/10 p-6 rounded-full border border-indigo-500/10 shadow-inner">
                    <Ambulance className="w-10 h-10 text-indigo-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-foreground font-black tracking-tighter uppercase text-2xl">Ambulance Arriving</h3>
                    <p className="text-[11px] text-indigo-600 font-mono uppercase tracking-widest font-black italic">ETA: {a.eta} MINUTES</p>
                  </div>
                </div>

                <div className="glass border border-indigo-500/5 rounded-[2rem] p-8 mb-10 relative z-10 bg-white/40 shadow-inner">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-600 font-black border border-indigo-500/10 text-xl shadow-inner">
                      {a.unit}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-foreground uppercase tracking-tighter">Emergency Unit {a.unit}</h4>
                      <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest italic font-bold">{a.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-foreground/40 font-mono uppercase tracking-widest font-bold">
                    <MapPin className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
                    <span>{a.distance} AWAY • HEADING TO YOU</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 relative z-10">
                  <button 
                    onClick={() => toast.success(`Contacting Team ${a.unit}...`)}
                    className="bg-indigo-600 text-white p-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] active:scale-95 transition-all shadow-xl border-t border-white/20"
                  >
                    Call Team
                  </button>
                  <button className="glass border-indigo-500/10 text-foreground/50 p-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] active:scale-95 transition-all bg-white/40 shadow-sm">
                    Send History
                  </button>
                </div>
              </div>
            ))}

            <div className="glass rounded-[2.5rem] p-10 shadow-sm border border-indigo-500/10 bg-white/50">
              <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8 italic">Available Ambulances</h3>
              <div className="space-y-4">
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                ) : ambulances.filter(a => !a.eta).map(a => (
                  <AmbulanceItem key={a.id} unit={a.unit} distance={a.distance} type={a.type} available={a.available} />
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'firstaid' && (
          <div className="space-y-6">
            <div className="glass rounded-[3rem] p-10 shadow-lg border border-primary/10 bg-white/60 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px]"></div>
              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="bg-primary/5 p-5 rounded-full border border-primary/10 shadow-md">
                  <Heart className="w-10 h-10 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase italic">Medical Advice</h3>
                  <p className="text-[10px] text-primary font-mono uppercase tracking-widest font-black italic">Real-time Assistance</p>
                </div>
              </div>
              <button className="w-full bg-primary text-white p-7 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-xl active:scale-[0.98] transition-all relative z-10 border-t border-white/20">
                Contact Specialist
              </button>
            </div>

            <div className="glass rounded-[3rem] p-10 shadow-lg border border-primary/10 bg-white/60 mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px]"></div>
              <div className="flex items-center gap-6 mb-10 relative z-10">
                <div className="bg-primary/10 p-5 rounded-full border border-primary/10 shadow-inner">
                  <MessageSquare className="w-10 h-10 text-primary" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase italic">First Aid Chat</h3>
                  <p className="text-[11px] text-primary font-mono uppercase tracking-widest font-black italic">Speak with a Doctor</p>
                </div>
              </div>
              <button className="w-full bg-primary text-white p-7 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl active:scale-[0.98] transition-all relative z-10 border-t border-white/20">
                Start Chat Now
              </button>
            </div>

            <div className="glass rounded-[2.5rem] p-10 shadow-sm border border-primary/10 bg-white/50 mb-12">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-10 italic">First Aid Guides</h3>
              <div className="space-y-4">
                <GuideItem
                  title="CPR GUIDE"
                  description="Easy steps to help someone"
                  icon={Activity}
                  critical
                />
                <GuideItem
                  title="BLEEDING CONTROL"
                  description="How to stop heavy bleeding"
                  icon={AlertCircle}
                  critical
                />
                <GuideItem
                  title="CHOKING RESPONSE"
                  description="Help someone who can't breathe"
                  icon={Heart}
                />
                <GuideItem
                  title="BURN TREATMENT"
                  description="First aid for burns and heat"
                  icon={AlertCircle}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
        active ? 'bg-primary text-white shadow-md' : 'glass text-foreground/40 hover:text-foreground border-primary/5'
      }`}
    >
      {label}
    </button>
  );
}

function HospitalCard({ name, distance, beds, specialties, waitTime, onCall }: any) {
  return (
    <div className="glass rounded-[2.5rem] p-10 shadow-sm border border-primary/10 mb-8 relative overflow-hidden bg-white/50">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px]"></div>
      <div className="flex items-start gap-8">
        <div className="bg-destructive/10 p-6 rounded-full border border-destructive/10 shadow-inner">
          <Heart className="w-10 h-10 text-destructive" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h4 className="text-2xl font-black text-foreground uppercase tracking-tighter mb-3 italic">{name}</h4>
          <div className="flex items-center gap-5 mb-6">
            <div className="flex items-center gap-2.5 text-[11px] text-foreground/50 font-mono uppercase tracking-widest font-bold">
              <MapPin className="w-4 h-4 text-primary" strokeWidth={2.5} />
              <span>{distance} • {waitTime} WAIT</span>
            </div>
          </div>
          <div className="bg-primary/10 text-primary text-[10px] font-black px-5 py-2 rounded-full inline-block mb-8 uppercase tracking-[0.4em] border border-primary/10 shadow-sm">
            {beds} BEDS
          </div>
          <p className="text-[11px] text-foreground/40 font-mono uppercase mb-10 tracking-widest leading-relaxed font-bold italic">{specialties}</p>
          <div className="grid grid-cols-2 gap-5">
            <button 
              onClick={onCall}
              className="bg-destructive text-white text-[11px] font-black uppercase tracking-[0.4em] py-5 rounded-2xl shadow-xl active:scale-95 transition-all border-t border-white/20"
            >
              Call
            </button>
            <button className="glass border-primary/20 text-foreground/50 text-[11px] font-black uppercase tracking-[0.4em] py-5 rounded-2xl active:scale-95 transition-all bg-white/40 shadow-sm">
              Go There
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AmbulanceItem({ unit, distance, type, available }: any) {
  return (
    <div className="flex items-center gap-4 p-4 glass rounded-2xl border-primary/5 mb-4 bg-white/40">
      <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center text-destructive font-black text-sm border border-destructive/10">
        {unit}
      </div>
      <div className="flex-1">
        <h5 className="text-sm font-bold text-foreground uppercase tracking-tighter">{type}</h5>
        <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest">{distance}</p>
      </div>
      {available ? (
        <span className="text-[8px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/10 animate-pulse">Online</span>
      ) : (
        <span className="text-[8px] font-black text-foreground/20 bg-foreground/5 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/5">Engaged</span>
      )}
    </div>
  );
}

function GuideItem({ title, description, icon: Icon, critical = false }: any) {
  return (
    <button className={`w-full p-5 rounded-2xl flex items-center gap-4 mb-4 glass border-primary/5 bg-white/40 shadow-sm ${
      critical ? 'border-destructive/30 bg-destructive/5' : ''
    }`}>
      <div className={`p-4 rounded-full ${critical ? 'bg-destructive/10 text-destructive' : 'bg-primary/5 text-primary'} border border-primary/5`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 text-left">
        <h5 className={`text-sm font-bold uppercase tracking-tighter ${critical ? 'text-destructive' : 'text-foreground'}`}>{title}</h5>
        <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest italic">{description}</p>
      </div>
    </button>
  );
}
