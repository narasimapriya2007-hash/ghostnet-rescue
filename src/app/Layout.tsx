import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, MapPin, Box, Shield, Heart } from "lucide-react";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col font-sans">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'var(--grid-pattern)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
      
      <main className="flex-1 relative z-10 animate-in fade-in duration-700">
        <Outlet key={location.pathname} />
      </main>      
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-8 py-10 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] bg-black/40 backdrop-blur-3xl rounded-t-[3.5rem]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <NavButton 
            icon={Home} 
            label="Home" 
            active={isActive('/dashboard')} 
            onClick={() => navigate('/dashboard')} 
          />
          <NavButton 
            icon={MapPin} 
            label="Map" 
            active={isActive('/disaster-map')} 
            onClick={() => navigate('/disaster-map')} 
          />
          <NavButton 
            icon={Box} 
            label="Relief" 
            active={isActive('/resources')} 
            onClick={() => navigate('/resources')} 
          />
          <NavButton 
            icon={Shield} 
            label="Rescue" 
            active={isActive('/rescue-team')} 
            onClick={() => navigate('/rescue-team')} 
          />
          <NavButton 
            icon={Heart} 
            label="Profile" 
            active={isActive('/family')} 
            onClick={() => navigate('/family')} 
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ icon: Icon, label, active = false, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 transition-all ${active ? 'text-primary' : 'text-foreground/30 hover:text-foreground/60'}`}
    >
      <Icon className={`w-6 h-6 ${active ? 'drop-shadow-[0_0_12px_rgba(79,70,229,0.4)]' : ''}`} strokeWidth={active ? 2.5 : 2} />
      <span className={`text-[8px] font-black tracking-[0.2em] uppercase ${active ? 'opacity-100' : 'opacity-40'}`}>{label}</span>
    </button>
  );
}
