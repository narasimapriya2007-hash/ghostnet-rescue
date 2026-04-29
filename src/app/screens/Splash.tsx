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
    <div className="h-screen w-full bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
            <Shield className="w-20 h-20 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-white text-4xl tracking-tight mb-3">GhostNet Rescue</h1>

        <p className="text-white/90 text-center text-lg max-w-sm leading-relaxed">
          When networks fail, hope survives.
        </p>

        <div className="mt-12 flex items-center gap-2 text-white/70">
          <Wifi className="w-5 h-5 animate-pulse" />
          <span className="text-sm">Mesh Network Ready</span>
        </div>
      </div>
    </div>
  );
}
