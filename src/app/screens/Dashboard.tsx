import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GhostNetAPI, Incident } from '../../services/api';
import { toast } from 'sonner';
import {
  AlertCircle,
  MapPin,
  Wifi,
  Users,
  Home,
  Battery,
  Heart,
  Navigation,
  Ambulance,
  FileText,
  Shield,
  Settings,
  Radio,
  Bell,
  Loader2,
  CheckCircle
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [localAlert, setLocalAlert] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [incidentData, statsData, alertsData] = await Promise.all([
          GhostNetAPI.getIncidents(),
          GhostNetAPI.getDashboardStats(),
          GhostNetAPI.getLocalAlerts()
        ]);
        setIncidents(incidentData);
        setStats(statsData);
        if (alertsData.length > 0) setLocalAlert(alertsData[0].message);
      } catch (error) {
        toast.error('Failed to sync emergency data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen w-full text-foreground pb-32 font-sans relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <div className="flex items-center justify-between mb-12 relative z-10">
          <div>
            <h1 className="text-foreground text-5xl font-black tracking-tighter uppercase mb-2 italic">
              Emergency <span className="text-primary">Help</span>
            </h1>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 ${isLoading ? 'bg-amber-400' : 'bg-primary'} rounded-full animate-pulse shadow-[0_0_10px_var(--primary)]`}></div>
              <p className="text-foreground/40 font-mono text-[10px] tracking-[0.4em] uppercase italic font-black">
                {isLoading ? 'Synchronizing GhostNet...' : 'Protocol Online • Global Sync active'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/accessibility')}
            className="glass p-4 rounded-2xl active:scale-90 transition-all border-primary/10 shadow-xl bg-white/60 group"
          >
            <Settings className="w-6 h-6 text-primary group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>

        <div className="glass rounded-[3rem] p-10 shadow-lg border border-primary/10 bg-white/60 mb-10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Active Alerts</h3>
            {isLoading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="py-10 flex flex-col items-center justify-center text-foreground/20 font-mono text-[9px] uppercase tracking-widest italic font-bold">
                Synchronizing with GhostNet...
              </div>
            ) : incidents.length > 0 ? (
              incidents.map((incident) => (
                <AlertItem
                  key={incident.id}
                  type={incident.type}
                  location={incident.location}
                  time={incident.time}
                  severity={incident.status}
                  verified={incident.verified}
                />
              ))
            ) : (
              <div className="py-10 flex flex-col items-center justify-center text-foreground/20 font-mono text-[9px] uppercase tracking-widest italic font-bold">
                No active incidents detected
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 -mt-16">
        <button
          onClick={() => navigate('/sos')}
          className="w-full bg-destructive text-white p-10 rounded-[3rem] shadow-2xl mb-10 active:scale-[0.98] transition-all border-t border-white/20 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-40"></div>
          <div className="flex flex-col items-center relative z-10">
            <div className="bg-white/20 p-6 rounded-full mb-6 shadow-xl group-hover:scale-105 transition-transform border border-white/10">
              <AlertCircle className="w-14 h-14" strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-1 uppercase">Send SOS</h2>
            <p className="text-white/80 text-[10px] font-mono uppercase tracking-[0.5em]">Emergency Override</p>
          </div>
        </button>

        <div className="glass border-destructive/20 bg-destructive/5 rounded-[2.5rem] p-8 mb-10 flex items-start gap-6 shadow-sm border-l-4">
          <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-destructive font-black uppercase tracking-[0.1em] text-xs mb-1">Local Threat Alert</h4>
            <p className="text-foreground/70 text-[10px] font-mono uppercase leading-relaxed tracking-wider">
              {localAlert || 'Flood warning in Sector 4 • Seek higher ground'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-8">
          <StatusCard icon={MapPin} label="Safe Zones" value={stats?.safeZones ? `${stats.safeZones} Nearby` : '3 Nearby'} color="text-primary" onClick={() => navigate('/disaster-map')} />
          <StatusCard icon={Users} label="Nearby Users" value={stats?.nearbyUsers ? `${stats.nearbyUsers} People` : '8 People'} color="text-primary" onClick={() => navigate('/volunteers')} />
          <StatusCard icon={Home} label="Destination" value={stats?.destination || '1.2 KM'} color="text-accent" onClick={() => navigate('/safe-route')} />
          <StatusCard icon={Battery} label="Phone Battery" value={stats?.battery ? `${stats.battery}%` : '78%'} color="text-primary" />
        </div>

        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-primary font-black text-[10px] uppercase tracking-[0.4em]">Services</h3>
          <span className="h-px flex-1 bg-primary/10 ml-4"></span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-12">
          <QuickAction icon={Heart} label="Medical Aid" color="glass border-destructive/10 text-destructive bg-white/40" onClick={() => navigate('/medical')} />
          <QuickAction icon={Navigation} label="Safe Route" color="glass border-primary/10 text-primary bg-white/40" onClick={() => navigate('/safe-route')} />
          <QuickAction icon={Ambulance} label="Ambulance" color="glass border-destructive/10 text-destructive bg-white/40" onClick={() => navigate('/ambulance-tracking')} />
          <QuickAction icon={CheckCircle} label="Mission Logs" color="glass border-accent/10 text-accent bg-white/40" onClick={() => navigate('/mission-history')} />
        </div>

        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">Family Safety Status</h3>
          <span className="h-px flex-1 bg-primary/10 ml-4"></span>
        </div>
        <div className="glass rounded-[3rem] p-10 shadow-sm mb-12 border border-primary/10 bg-white/50 cursor-pointer active:scale-[0.98] transition-all" onClick={() => navigate('/family')}>
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black border border-primary/10 text-2xl shadow-inner">
              <span>M</span>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-foreground uppercase tracking-tighter">Mom</h4>
              <p className="text-[10px] text-primary font-mono uppercase tracking-widest font-bold italic">Safe • Active 15m ago</p>
            </div>
            <div className="w-3.5 h-3.5 bg-primary rounded-full animate-pulse shadow-[0_0_12px_var(--primary)]"></div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent font-black border border-accent/10 text-2xl shadow-inner">
              <span>D</span>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-foreground uppercase tracking-tighter">Dad</h4>
              <p className="text-[10px] text-accent font-mono uppercase tracking-widest font-bold italic">Safe • Last seen 2h ago</p>
            </div>
            <div className="w-3.5 h-3.5 bg-accent rounded-full shadow-[0_0_12px_var(--accent)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusCard({ icon: Icon, label, value, color, onClick }: any) {
  return (
    <div 
      className={`glass rounded-3xl p-6 shadow-sm border border-primary/5 bg-white/50 ${onClick ? 'cursor-pointer active:scale-95 transition-all hover:bg-white/70' : ''}`}
      onClick={onClick}
    >
      <Icon className={`w-6 h-6 ${color} mb-3`} />
      <h4 className="text-[10px] font-bold text-foreground/40 mb-1 uppercase tracking-[0.2em]">{label}</h4>
      <p className="text-sm font-black text-foreground uppercase tracking-tighter">{value}</p>
    </div>
  );
}

function QuickAction({ icon: Icon, label, color, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`${color} p-6 rounded-3xl flex flex-col items-center gap-3 shadow-sm backdrop-blur-md active:scale-95 transition-all group hover:shadow-md border border-primary/5`}
    >
      <div className="p-4 rounded-2xl bg-white/20 group-hover:bg-white/40 transition-colors">
        <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function AlertItem({ type, location, time, severity, verified }: any) {
  const severityColors = {
    critical: 'bg-destructive/10 text-destructive border-destructive/20',
    high: 'bg-accent/10 text-accent border-accent/20',
    medium: 'bg-primary/10 text-primary border-primary/20',
    low: 'bg-primary/5 text-primary/60 border-primary/10',
  };

  return (
    <div 
      onClick={() => navigate('/disaster-map')}
      className={`glass p-6 rounded-2xl border-l-4 flex items-center justify-between group active:scale-[0.98] transition-all bg-white/40 shadow-sm mb-4 cursor-pointer hover:bg-white/60 ${severityColors[severity as keyof typeof severityColors] || severityColors.medium}`}
    >
      <div className="flex items-center gap-5">
        <div className="bg-white/60 p-4 rounded-xl shadow-inner border border-primary/5">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h4 className="text-sm font-bold tracking-tighter uppercase italic">{type}</h4>
            {verified && <CheckCircle className="w-4 h-4 text-primary" />}
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-foreground/40 font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{location} • {time}</span>
          </div>
        </div>
      </div>
      <div className="w-2.5 h-2.5 bg-current rounded-full animate-pulse shadow-[0_0_8px_currentColor]"></div>
    </div>
  );
}

