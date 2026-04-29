import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Activity, ShieldCheck, MapPin, Clock } from 'lucide-react';

export function DetailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state?.title || 'Information Details';
  const subtitle = location.state?.subtitle || 'Response Protocol Active';
  const details = location.state?.details || null;
  const stats = location.state?.stats || [];

  return (
    <div className="min-h-screen w-full bg-background text-foreground pb-32 font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'var(--grid-pattern)', backgroundSize: '32px 32px' }}></div>
      
      <div className="bg-gradient-to-br from-indigo-50/50 to-background px-6 pt-16 pb-24 rounded-b-[4rem] shadow-sm border-b border-primary/5 relative overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>
        <h1 className="text-foreground text-4xl font-black italic tracking-tighter uppercase mb-2">{title}</h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">{subtitle}</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="glass rounded-[3rem] p-10 shadow-lg border border-primary/10 bg-white/10 backdrop-blur-2xl mb-10 text-center">
          <div className="bg-primary/20 p-8 rounded-full w-fit mx-auto mb-8 shadow-inner border border-primary/20">
            <ShieldCheck className="w-16 h-16 text-primary" strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-black tracking-tighter uppercase mb-4 italic">Protocol Sync Complete</h3>
          <p className="text-white/60 text-sm font-mono uppercase tracking-widest leading-relaxed font-bold italic mb-8">
            {details || 'This module is connected to the GhostNet Response Grid. Live data is being synchronized from regional rescue clusters.'}
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.length > 0 ? stats.map((stat: any, index: number) => (
              <div key={index} className="glass bg-white/5 p-6 rounded-3xl border border-white/5">
                {stat.icon && <stat.icon className="w-6 h-6 text-primary mb-3 mx-auto" />}
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{stat.label}</p>
                <p className="text-lg font-black text-white tracking-tighter">{stat.value}</p>
              </div>
            )) : (
              <>
                <div className="glass bg-white/5 p-6 rounded-3xl border border-white/5">
                  <Activity className="w-6 h-6 text-primary mb-3 mx-auto" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Live Status</p>
                  <p className="text-lg font-black text-white tracking-tighter">ACTIVE</p>
                </div>
                <div className="glass bg-white/5 p-6 rounded-3xl border border-white/5">
                  <Clock className="w-6 h-6 text-primary mb-3 mx-auto" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Last Sync</p>
                  <p className="text-lg font-black text-white tracking-tighter">1m AGO</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
