import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Globe,
  Mic,
  Watch,
  Heart,
  Volume2,
  Type,
  Palette,
  Settings,
  LogOut,
  User,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Accessibility() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    toast.promise(new Promise(res => setTimeout(res, 1000)), {
      loading: 'Securing session...',
      success: () => {
        logout();
        navigate('/login');
        return 'Logged out successfully';
      },
      error: 'Logout failed',
    });
  };

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black tracking-tighter uppercase mb-2 italic">App <span className="text-primary">Settings</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase italic font-black">Global Preference Setup</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        {/* User Profile Section */}
        <div className="glass rounded-[2.5rem] p-8 shadow-xl mb-10 border border-primary/20 bg-white/70 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px] -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/10 shadow-inner overflow-hidden">
              {user ? (
                <div className="w-full h-full flex items-center justify-center bg-primary text-white text-3xl font-black italic">
                  {user.name.charAt(0)}
                </div>
              ) : (
                <User className="w-10 h-10 text-primary/40" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black tracking-tighter uppercase italic text-foreground">
                {user?.name || 'Guest User'}
              </h3>
              <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest font-black italic mb-2">
                {user?.email || 'Not Authenticated'}
              </p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Verified Responder</span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-foreground/20" />
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-8 shadow-sm mb-10 border border-primary/10 bg-white/50">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-8 italic">Language Settings</h3>

          <button className="w-full glass border-primary/10 rounded-2xl p-6 mb-10 flex items-center gap-5 active:bg-primary/5 transition-all shadow-sm bg-white/40">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Globe className="w-7 h-7 text-primary" strokeWidth={2.5} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-black text-foreground uppercase tracking-tighter">Current Language</h4>
              <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest font-bold">English (UK)</p>
            </div>
            <span className="text-[9px] font-black text-primary uppercase tracking-widest border border-primary/20 px-4 py-1.5 rounded-full bg-white/40">Active</span>
          </button>

          <div className="grid grid-cols-3 gap-3">
            <LanguageChip label="हिन्दी" />
            <LanguageChip label="বাংলা" />
            <LanguageChip label="தமிழ்" />
            <LanguageChip label="తెలుగు" />
            <LanguageChip label="ગુજરાતી" />
            <LanguageChip label="ಕನ್ನಡ" />
          </div>
        </div>

        <div className="glass border border-primary/10 text-foreground rounded-[3rem] p-10 mb-10 shadow-lg relative overflow-hidden floating bg-white/60">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px]"></div>
          <div className="flex items-center gap-6 mb-10 relative z-10">
            <div className="bg-primary/10 p-5 rounded-full shadow-inner border border-primary/10">
              <Mic className="w-10 h-10 text-primary" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tighter uppercase">Voice Control</h3>
              <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest font-bold italic">Speak to the app</p>
            </div>
          </div>

          <div className="glass bg-white/40 border-primary/10 rounded-3xl p-8 mb-10 relative z-10 shadow-inner">
            <p className="text-[10px] text-foreground/40 font-mono uppercase mb-4 tracking-widest font-bold">Say this to start:</p>
            <p className="text-foreground font-black italic tracking-tight uppercase text-lg">"Help me GhostNet"</p>
          </div>

          <button className="w-full bg-primary text-white p-7 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-xl active:scale-95 transition-all relative z-10 border-t border-white/20">
            Enable Voice Control
          </button>
        </div>

        <div className="glass rounded-[2rem] p-8 shadow-sm mb-10 border border-primary/10 bg-white/40">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-8">Wearable Sync</h3>
          <div className="space-y-4">
            <WearableCard
              icon={Watch}
              name="APPLE WATCH V10"
              status="CONNECTED"
              features="Emergency trigger active"
              connected
            />
            <WearableCard
              icon={Watch}
              name="ANDROID WEAR X"
              status="OFFLINE"
              features="Location sync inactive"
              connected={false}
            />
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-8 shadow-sm mb-10 border border-primary/10 bg-white/50">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-10 italic">Visual Settings</h3>
          <div className="space-y-6">
            <SettingItem
              icon={Type}
              label="LARGE TEXT"
              description="Make text easier to read"
            />
            <SettingItem
              icon={Palette}
              label="HIGH CONTRAST"
              description="Better color visibility"
            />
            <SettingItem
              icon={Volume2}
              label="SCREEN READER"
              description="Speak screen content"
            />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full glass border-destructive/20 text-destructive p-8 rounded-[3rem] flex items-center justify-center gap-5 active:scale-95 transition-all shadow-2xl font-black uppercase tracking-[0.5em] text-xs bg-white/60 mb-12"
        >
          <LogOut className="w-6 h-6" strokeWidth={2.5} />
          Terminate Session
        </button>
      </div>
    </div>
  );
}

function LanguageChip({ label }: any) {
  return (
    <button className="glass border-primary/10 text-foreground/40 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:bg-primary/10 active:text-primary transition-all bg-white/20 shadow-sm">
      {label}
    </button>
  );
}

function WearableCard({ icon: Icon, name, status, features, connected }: any) {
  return (
    <div className={`glass border ${connected ? 'border-primary/20 bg-primary/5' : 'border-primary/5 bg-white/10'} rounded-2xl p-6 mb-4 shadow-sm`}>
      <div className="flex items-start gap-4">
        <div className={`${connected ? 'bg-primary/10' : 'bg-foreground/5'} p-4 rounded-full`}>
          <Icon className={`w-6 h-6 ${connected ? 'text-primary' : 'text-foreground/10'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-tighter">{name}</h4>
            <span className={`text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${
              connected ? 'bg-primary/10 text-primary' : 'bg-foreground/5 text-foreground/20'
            }`}>
              {status}
            </span>
          </div>
          <p className="text-[10px] text-foreground/40 font-mono uppercase mb-4 tracking-widest leading-relaxed">{features}</p>
          {!connected && (
            <button className="text-[9px] font-black text-primary uppercase tracking-widest">Sync Device →</button>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingItem({ icon: Icon, label, description }: any) {
  return (
    <div className="flex items-center gap-6 p-6 glass rounded-3xl border-primary/5 mb-4 bg-white/40 shadow-sm">
      <div className="p-3 bg-primary/10 rounded-xl border border-primary/5">
        <Icon className="w-7 h-7 text-primary" strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <h4 className="text-[13px] font-black text-foreground uppercase tracking-tight">{label}</h4>
        <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest font-bold">{description}</p>
      </div>
      <label className="relative inline-block w-14 h-8">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={() => toast.success(`Setting Updated: ${label}`)}
        />
        <div className="w-14 h-8 bg-foreground/10 rounded-full peer peer-checked:bg-primary transition-all shadow-inner border border-primary/10"></div>
        <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-md"></div>
      </label>
    </div>
  );
}
