import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GhostNetAPI, Incident } from '../../services/api';
import { toast } from 'sonner';
import {
  ArrowLeft,
  AlertCircle,
  Users,
  Ambulance,
  MapPin,
  Clock,
  CheckCircle,
  TrendingUp,
  Activity,
  Loader2
} from 'lucide-react';

export function RescueTeamDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await GhostNetAPI.getIncidents();
        setRequests(data);
      } catch (error) {
        toast.error('Operations feed synchronization failed');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground pb-32 font-sans relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'var(--grid-pattern)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="bg-gradient-to-br from-indigo-50/50 to-background px-6 pt-16 pb-24 rounded-b-[4rem] shadow-sm border-b border-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black italic tracking-tighter uppercase mb-2">Rescue <span className="text-primary">Dashboard</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">Emergency Rescue Support</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-2 gap-5 mb-12">
          <StatCard
            icon={AlertCircle}
            value="18"
            label="CRITICAL ALERTS"
            color="bg-destructive/10 text-destructive border-destructive/10 shadow-sm"
            onClick={() => navigate('/disaster-map')}
          />
          <StatCard
            icon={TrendingUp}
            value="94%"
            label="OPS SUCCESS"
            color="bg-primary/10 text-primary border-primary/10 shadow-sm"
            onClick={() => navigate('/analytics-details', { state: { title: 'Operations Analytics', subtitle: 'Efficiency Metrics' } })}
          />
          <StatCard
            icon={Ambulance}
            value="12"
            label="RESCUE TEAMS"
            color="bg-accent/10 text-accent border-accent/10 shadow-sm"
          />
          <StatCard
            icon={CheckCircle}
            value="156"
            label="MISSION HISTORY"
            color="bg-primary/10 text-primary border-primary/10 shadow-sm"
            onClick={() => navigate('/mission-history')}
          />
        </div>

        <div className="glass rounded-[2.5rem] p-10 shadow-sm mb-10 border border-primary/10 bg-white/50">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Critical Alerts</h3>
            {isLoading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center text-foreground/20 font-mono text-[10px] uppercase tracking-[0.4em] italic font-black">
                Syncing Operational Feed...
              </div>
            ) : requests.length > 0 ? (
              requests.map((request) => (
                <SOSRequestCard
                  key={request.id}
                  priority={request.status === 'critical' || request.status === 'high' ? request.status : 'medium'}
                  type={request.type}
                  location={request.location}
                  distance="LINKED"
                  time={request.time}
                  status={request.verified ? 'assigned' : 'unassigned'}
                  team={request.verified ? 'TEAM ALPHA' : undefined}
                />
              ))
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-foreground/20 font-mono text-[10px] uppercase tracking-[0.4em] italic font-black">
                All regions secured
              </div>
            )}
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-10 shadow-sm mb-10 border border-primary/10 bg-white/50">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-10 italic">Rescue Teams</h3>
          <div className="space-y-4">
            <TeamCard
              name="TEAM ALPHA"
              members={4}
              status="ACTIVE"
              assignment="MEDICAL SECTOR 12"
              eta="8 MIN"
              onClick={() => navigate('/team-details', { state: { title: 'Team Alpha', subtitle: 'Advanced Medical Response' } })}
            />
            <TeamCard
              name="TEAM BETA"
              members={5}
              status="ACTIVE"
              assignment="SUPPLY DELIVERY - ZONE 9"
              eta="12 MIN"
              onClick={() => navigate('/team-details', { state: { title: 'Team Beta', subtitle: 'Logistics & Supply Support' } })}
            />
          </div>
        </div>

        <div className="glass rounded-[3rem] p-12 mb-12 border border-primary/10 relative overflow-hidden floating bg-white/60 shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px]"></div>
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-10 italic">Operations Stats</h3>
          <div 
            className="space-y-8 cursor-pointer active:scale-[0.98] transition-all"
            onClick={() => navigate('/analytics-details', { 
              state: { 
                title: 'Operations Analytics', 
                subtitle: 'Real-time Efficiency Metrics',
                details: 'Current performance metrics across the GhostNet Rescue grid. All systems are operating within nominal parameters.',
                stats: [
                  { label: 'RESPONSE', value: '6.2 MIN', icon: Clock },
                  { label: 'SUCCESS', value: '94%', icon: TrendingUp },
                  { label: 'ACTIVE', value: '18', icon: Activity },
                  { label: 'UPTIME', value: '99.9%', icon: Shield }
                ]
              } 
            })}
          >
            <MetricRow label="RESPONSE TIME" value="6.2 MIN" trend="down" />
            <MetricRow label="SUCCESS RATE" value="94%" trend="up" />
            <MetricRow label="ACTIVE INCIDENTS" value="18" trend="up" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`glass rounded-2xl p-6 shadow-sm border border-primary/5 bg-white/60 ${onClick ? 'cursor-pointer active:scale-95 transition-all hover:bg-white/70' : ''}`}
    >
      <div className={`${color} p-4 rounded-xl w-fit mb-6 border`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-3xl font-black text-foreground tracking-tighter mb-1 uppercase italic">{value}</p>
      <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-[0.3em] italic">{label}</p>
    </div>
  );
}

function SOSRequestCard({ priority, type, location, distance, time, status, team }: any) {
  const priorityColors = {
    critical: 'border-destructive bg-destructive/5',
    high: 'border-accent bg-accent/5',
    medium: 'border-primary bg-primary/5',
  };

  return (
    <div className={`glass border-l-4 ${priorityColors[priority]} rounded-2xl p-6 mb-6 relative overflow-hidden bg-white/40 shadow-sm`}>
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <h4 className="text-sm font-bold text-foreground uppercase tracking-tighter mb-2">{type}</h4>
          <div className="flex items-center gap-3 text-[10px] text-foreground/40 font-mono uppercase mb-2 tracking-widest">
            <MapPin className="w-3 h-3 text-primary" />
            <span>{location} • {distance}</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-foreground/30 font-mono uppercase tracking-widest">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>
        <span className={`text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${
          status === 'unassigned' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
        }`}>
          {status === 'assigned' ? team : 'WAITING'}
        </span>
      </div>

      {status === 'unassigned' && (
        <button
          onClick={() => toast.promise(GhostNetAPI.assignTeam(type), {
            loading: 'Assigning Team...',
            success: 'Help is on the way',
            error: 'Unable to assign',
          })}
          className="w-full bg-primary text-white text-[11px] font-black uppercase tracking-[0.4em] py-5 rounded-2xl mt-6 shadow-xl active:scale-95 transition-all border-t border-white/20"
        >
          Assign Rescue Team
        </button>
      )}
    </div>
  );
}

function TeamCard({ name, members, status, assignment, eta, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`glass p-8 rounded-[2rem] border border-primary/10 mb-6 bg-white/60 shadow-sm ${onClick ? 'cursor-pointer active:scale-[0.98] transition-all hover:bg-white/80' : ''}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-5">
          <div className="bg-primary/10 p-4 rounded-full border border-primary/10 shadow-inner">
            <Users className="w-6 h-6 text-primary" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-base font-black text-foreground uppercase tracking-tighter">{name}</h4>
            <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest font-bold">{members} MEMBERS</p>
          </div>
        </div>
        <span className="text-[9px] px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black uppercase tracking-widest border border-primary/20">
          {status}
        </span>
      </div>
      <p className="text-[11px] text-foreground/50 font-mono uppercase tracking-widest mb-6 italic font-bold">{assignment}</p>
      {eta && (
        <div className="flex items-center gap-3 text-[10px] text-foreground/30 font-mono uppercase tracking-widest font-bold">
          <Clock className="w-4 h-4 text-primary" strokeWidth={2.5} />
          <span>ETA: {eta}</span>
        </div>
      )}
    </div>
  );
}

function MetricRow({ label, value, trend }: any) {
  return (
    <div className="flex items-center justify-between p-5 glass border-primary/5 rounded-2xl bg-white/20">
      <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest italic">{label}</span>
      <div className="flex items-center gap-4">
        <span className="text-sm font-black text-foreground tracking-tighter">{value}</span>
        <TrendingUp
          className={`w-4 h-4 ${trend === 'up' ? 'text-primary' : 'text-destructive rotate-180'}`}
        />
      </div>
    </div>
  );
}
