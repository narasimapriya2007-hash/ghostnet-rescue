import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GhostNetAPI, Volunteer } from '../../services/api';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Star, MapPin, Check, Clock, Award, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function VolunteerSupport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleJoin = async () => {
    try {
      const locationData = await GhostNetAPI.getCurrentLocation().catch(() => ({ lat: 0, lng: 0 }));
      const locationStr = locationData.lat ? `${locationData.lat.toFixed(4)}, ${locationData.lng.toFixed(4)}` : 'Remote';
      
      await GhostNetAPI.joinAsVolunteer({
        name: user?.name || 'Anonymous Volunteer',
        location: locationStr,
        role: 'General Rescue Support'
      });
      
      // Refresh list
      const updated = await GhostNetAPI.getVolunteers();
      setVolunteers(updated);
      return 'Welcome to the network!';
    } catch (err) {
      throw new Error('Signup failed');
    }
  };

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const data = await GhostNetAPI.getVolunteers();
        setVolunteers(data);
      } catch (error) {
        toast.error('Failed to sync response teams');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black italic tracking-tighter uppercase mb-2">Volunteer <span className="text-primary">Network</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">Find and Join Global Rescue Teams</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="glass border border-primary/20 rounded-[3rem] p-10 mb-10 shadow-xl relative overflow-hidden floating bg-white/60">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px]"></div>
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="bg-primary/10 p-6 rounded-full mb-6 shadow-inner border border-primary/10">
              <Users className="w-12 h-12 text-primary" strokeWidth={2.5} />
            </div>
            <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Become a Volunteer</h3>
            <p className="text-foreground/50 text-[10px] font-mono uppercase tracking-widest mb-10 leading-relaxed font-bold">
              Sign up to help others in your area and join the community rescue effort
            </p>
            <button
              onClick={() => {
                toast.promise(handleJoin(), {
                  loading: 'Processing Application...',
                  success: (msg) => {
                    navigate('/volunteer-registration', { state: { title: 'Registration Complete', subtitle: 'Regional Rescuer Active' } });
                    return msg;
                  },
                  error: (err) => err.message,
                });
              }}
              className="w-full bg-primary text-white p-7 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-xl active:scale-95 transition-all border-t border-white/20"
            >
              Sign Up to Help
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-black text-primary/60 uppercase tracking-[0.5em] italic">Active Response Teams</h3>
            {isLoading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
          </div>
          
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-foreground/20 font-mono text-[10px] uppercase tracking-[0.4em] italic font-black">
              Detecting Local Rescuers...
            </div>
          ) : volunteers.length > 0 ? (
            volunteers.map((volunteer) => (
              <VolunteerCard
                key={volunteer.id}
                id={volunteer.id}
                name={volunteer.name}
                distance={volunteer.location}
                rating={4.8} // Mock rating
                skills={volunteer.role}
                available={volunteer.status === 'active'}
              />
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-foreground/20 font-mono text-[10px] uppercase tracking-[0.4em] italic font-black">
              No responders currently in range
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VolunteerCard({ id, name, distance, rating, skills, available }: any) {
  const navigate = useNavigate();
  return (
    <div className="glass rounded-[2.5rem] p-8 border border-primary/10 mb-6 bg-white/50 shadow-sm">
      <div className="flex items-start gap-6">
        <div 
          className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-2xl border border-primary/10 shadow-inner cursor-pointer"
          onClick={() => navigate('/volunteer-details', { state: { title: name, subtitle: skills } })}
        >
          {name.charAt(0)}
        </div>
        <div className="flex-1 pt-1">
          <div className="flex items-center justify-between mb-3">
            <h4 
              className="text-sm font-bold text-foreground uppercase tracking-tighter cursor-pointer"
              onClick={() => navigate('/volunteer-details', { state: { title: name, subtitle: skills } })}
            >
              {name}
            </h4>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-primary" fill="currentColor" />
              <span className="text-[10px] text-primary font-black">{rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-2 text-[10px] text-foreground/40 font-mono uppercase tracking-widest font-bold">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{distance} AWAY</span>
            </div>
            {available ? (
              <span className="text-[8px] text-primary bg-primary/10 px-4 py-1.5 rounded-full flex items-center gap-2 font-black uppercase tracking-widest border border-primary/20">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                AVAILABLE
              </span>
            ) : (
              <span className="text-[8px] text-foreground/20 bg-foreground/5 px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-primary/5">
                BUSY
              </span>
            )}
          </div>
          <p className="text-[10px] text-foreground/40 font-mono uppercase mb-8 tracking-widest leading-relaxed font-bold italic">{skills}</p>
          {available && (
            <button
              onClick={() => toast.promise(GhostNetAPI.requestVolunteerHelp(id), {
                loading: 'Sending SOS to Responder...',
                success: () => {
                  navigate('/volunteer-request-success', { state: { title: 'Help Requested', subtitle: 'Responder Dispatched' } });
                  return 'Help is on the way!';
                },
                error: 'Communication failed',
              })}
              className="w-full glass bg-white/40 border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] py-4 rounded-2xl active:scale-95 transition-all shadow-sm hover:shadow-md"
            >
              Request Help
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
