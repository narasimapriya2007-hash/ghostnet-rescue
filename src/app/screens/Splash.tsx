import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Wifi } from 'lucide-react';

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(92,122,103,0.05),_transparent_70%)]"></div>
      
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="z-10 flex flex-col items-center">
        <div className="relative mb-8 floating">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative glass p-8 rounded-[2.5rem] shadow-sm border-primary/10 bg-white/40">
            <Shield className="w-20 h-20 text-primary" strokeWidth={1} />
          </div>
        </div>

        <h1 className="text-foreground text-5xl font-black tracking-tighter mb-2 uppercase">
          Ghost<span className="text-primary">Net</span>
        </h1>

        <p className="text-foreground/40 text-center text-[10px] font-mono tracking-[0.4em] uppercase italic font-bold">
          Emergency Rescue Support
        </p>

        <div className="mt-12 flex items-center gap-3 text-foreground/40 font-bold">
          <Wifi className="w-5 h-5 animate-pulse text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest">Connecting...</span>
        </div>
      </div>
    </div>
  );
}
