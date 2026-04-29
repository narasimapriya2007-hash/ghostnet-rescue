import { useNavigate } from 'react-router';
import { ArrowLeft, Users, CheckCircle, AlertCircle, Clock, MapPin, Phone, Plus } from 'lucide-react';

export function FamilySafety() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black tracking-tighter uppercase mb-2 italic">Family <span className="text-primary">Safety</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">Family & Contacts Tracking</p>
      </div>

      <div className="px-6 -mt-12">
        <button 
          onClick={() => {
            toast.success('Status: SAFE broadcasted to family');
            navigate('/dashboard');
          }}
          className="w-full bg-primary text-white p-10 rounded-[3rem] mb-12 shadow-2xl active:scale-95 transition-transform relative overflow-hidden group border-t border-white/20"
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div className="flex items-center justify-center gap-5 mb-3 relative z-10">
            <CheckCircle className="w-12 h-12" strokeWidth={2.5} />
            <h3 className="text-4xl font-black tracking-tighter uppercase">I Am Safe</h3>
          </div>
          <p className="text-white/80 text-[10px] font-mono uppercase tracking-[0.4em] relative z-10 font-bold">Inform your family immediately</p>
        </button>

        <div className="glass rounded-[3rem] p-10 shadow-lg mb-10 border border-primary/10 bg-white/60">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Your Family</h3>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-full border border-primary/10 shadow-sm hover:bg-primary/20 transition-all">
              <Plus className="w-4 h-4" strokeWidth={3} />
              Add Contact
            </button>
          </div>

          <div className="space-y-4">
            <ContactCard
              name="Mom"
              lastUpdate="Safe • 15 min ago"
              status="safe"
              distance="2.3 km away"
              initial="M"
            />
            <ContactCard
              name="Dad"
              lastUpdate="Last seen • 2 hours ago"
              status="unknown"
              distance="Location hidden"
              initial="D"
            />
            <ContactCard
              name="Sister - Riya"
              lastUpdate="Safe • 5 min ago"
              status="safe"
              distance="5.1 km away"
              initial="R"
            />
            <ContactCard
              name="Brother - Arjun"
              lastUpdate="Emergency Help Requested"
              status="danger"
              distance="1.2 km away"
              initial="A"
            />
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-8 shadow-sm mb-10 border border-primary/10 bg-white/50">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 italic">Missing Person Protocol</h3>
          <p className="text-foreground/60 text-xs mb-8 font-mono uppercase leading-relaxed tracking-wider font-bold">
            Start an emergency search for someone who is missing
          </p>
          <div className="grid grid-cols-2 gap-5">
            <button 
              onClick={() => navigate('/missing-person-form', { state: { title: 'Missing Person Form', subtitle: 'Search Protocol Alpha' } })}
              className="glass border-destructive/20 text-destructive p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:bg-destructive/5 bg-white/20 shadow-sm hover:shadow-md transition-shadow"
            >
              Report Missing
            </button>
            <button className="glass border-primary/20 text-primary p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:bg-primary/5 bg-white/20 shadow-sm hover:shadow-md transition-shadow">
              Search Area
            </button>
          </div>
        </div>

        <div className="glass rounded-[3rem] p-10 shadow-sm mb-12 border border-primary/10 bg-white/50">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-10 italic">Recent Updates</h3>
          <div className="space-y-6">
            <UpdateItem
              name="MOM"
              action="SAFE"
              time="15 MIN AGO"
              type="safe"
            />
            <UpdateItem
              name="RIYA"
              action="ACTIVE"
              time="5 MIN AGO"
              type="safe"
            />
            <UpdateItem
              name="ARJUN"
              action="EMERGENCY HELP"
              time="1 MIN AGO"
              type="danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ name, lastUpdate, status, distance, initial }: any) {
  const navigate = useNavigate();
  const statusConfig = {
    safe: {
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      dotColor: 'bg-indigo-500',
      shadow: 'shadow-[0_0_12px_rgba(79,70,229,0.4)]',
    },
    unknown: {
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      dotColor: 'bg-amber-500',
      shadow: 'shadow-[0_0_12px_rgba(234,179,8,0.4)]',
    },
    danger: {
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      dotColor: 'bg-rose-500',
      shadow: 'shadow-[0_0_12px_rgba(244,63,94,0.4)]',
    },
  };

  const config = (statusConfig as any)[status];

  return (
    <div 
      onClick={() => navigate('/family-member-details', { state: { title: name, subtitle: lastUpdate } })}
      className="flex items-center gap-6 p-6 glass rounded-3xl border-indigo-500/10 mb-4 bg-white/50 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
    >
      <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center ${config.textColor} font-black text-2xl border border-indigo-500/10 shadow-inner`}>
        {initial}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-black text-foreground uppercase tracking-tighter mb-1">{name}</h4>
        <p className={`text-[10px] font-mono uppercase ${config.textColor} mb-2 tracking-widest font-black italic`}>{lastUpdate}</p>
        <div className="flex items-center gap-2 text-[10px] text-foreground/40 uppercase font-bold">
          <MapPin className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2.5} />
          <span>{distance}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className={`w-3 h-3 ${config.dotColor} rounded-full animate-pulse ${config.shadow}`}></div>
        <button className="bg-indigo-50 p-3 rounded-xl text-indigo-600 active:scale-90 transition-all border border-indigo-100 hover:bg-indigo-100">
          <Phone className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function UpdateItem({ name, action, time, type }: any) {
  const typeConfig = {
    safe: {
      icon: CheckCircle,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
    },
    danger: {
      icon: AlertCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/5',
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-4 p-4 glass rounded-2xl border-primary/5 mb-4 bg-white/40">
      <div className={`${config.bgColor} p-3 rounded-full border border-primary/5`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-foreground uppercase tracking-tighter">
          {name} <span className="font-mono text-[10px] text-foreground/40">{action}</span>
        </p>
        <div className="flex items-center gap-2 text-[9px] text-foreground/30 font-mono uppercase tracking-widest mt-2">
          <Clock className="w-3 h-3" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
