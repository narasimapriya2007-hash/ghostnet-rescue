import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Shield, Mail, Phone, Fingerprint, AlertCircle, Globe, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login, guestLogin } = useAuth();
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome to GhostNet Rescue');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[70%] h-[70%] bg-accent/10 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '2.5s' }}></div>

      <div className="z-10 w-full max-w-md flex flex-col items-center">
        <div className="relative mb-12 floating">
          <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-3xl animate-pulse"></div>
          <div className="relative glass p-10 rounded-[3.5rem] border border-white/20 shadow-2xl bg-white/10 backdrop-blur-2xl">
            <Shield className="w-20 h-20 text-white" strokeWidth={1} />
          </div>
        </div>

        <h1 className="text-white text-6xl font-black tracking-tighter mb-2 uppercase italic">
          Ghost<span className="text-primary">Net</span>
        </h1>
        <p className="text-white/60 text-center text-[11px] font-mono tracking-[0.5em] uppercase mb-12 italic font-black">
          Global Rescue Protocol
        </p>

        {!isEmailMode ? (
          <div className="space-y-4 mb-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => toast.info('Phone authentication system offline')}
              className="w-full glass text-foreground/80 p-6 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all border-primary/10 bg-white/50 shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors border border-primary/5 shadow-inner">
                  <Phone className="w-6 h-6 text-primary" strokeWidth={2.5} />
                </div>
                <span className="font-black tracking-widest uppercase text-[11px]">Sign in with Phone</span>
              </div>
              <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"></div>
            </button>

            <button
              onClick={() => setIsEmailMode(true)}
              className="w-full glass text-foreground/80 p-6 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all border-primary/10 bg-white/50 shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors border border-primary/5 shadow-inner">
                  <Mail className="w-6 h-6 text-primary" strokeWidth={2.5} />
                </div>
                <span className="font-black tracking-widest uppercase text-[11px]">Sign in with Email</span>
              </div>
              <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"></div>
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="w-full space-y-5 mb-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40 group-focus-within:text-primary transition-colors" strokeWidth={2.5} />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass bg-white/40 border-primary/10 rounded-2xl py-6 pl-16 pr-6 text-[11px] font-black tracking-widest uppercase placeholder:text-foreground/20 focus:border-primary/40 focus:bg-white/60 transition-all outline-none"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40 group-focus-within:text-primary transition-colors" strokeWidth={2.5} />
              <input
                type="password"
                placeholder="SECURITY KEY"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass bg-white/40 border-primary/10 rounded-2xl py-6 pl-16 pr-6 text-[11px] font-black tracking-widest uppercase placeholder:text-foreground/20 focus:border-primary/40 focus:bg-white/60 transition-all outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white p-8 rounded-[3rem] flex items-center justify-center gap-5 font-black uppercase tracking-[0.4em] shadow-2xl active:scale-95 disabled:opacity-50 transition-all text-xs border-t border-white/20"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Fingerprint className="w-7 h-7" strokeWidth={2.5} />
                  <span>Authenticate</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsEmailMode(false)}
              className="w-full text-foreground/40 text-[9px] font-black uppercase tracking-widest hover:text-primary transition-colors"
            >
              ← Back to login options
            </button>
          </form>
        )}

        <div className="bg-destructive/5 border border-destructive/10 text-foreground p-8 rounded-[2.5rem] mb-10 relative overflow-hidden shadow-sm w-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 blur-[50px] -mr-16 -mt-16 pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-3 relative z-10">
            <AlertCircle className="w-7 h-7 text-destructive" strokeWidth={2.5} />
            <h3 className="text-xl font-black tracking-tighter uppercase italic">Emergency Access</h3>
          </div>
          <p className="text-foreground/50 text-[10px] mb-8 font-mono leading-relaxed relative z-10 uppercase tracking-widest italic font-bold">Access emergency tools immediately without signing in</p>
          <button
            onClick={async () => {
              toast.warning('Emergency Mode Active');
              await guestLogin();
              navigate('/dashboard');
            }}
            className="w-full glass text-destructive p-5 rounded-2xl font-black uppercase tracking-widest border-destructive/20 active:bg-destructive/5 transition-all relative z-10 bg-white/60 shadow-sm"
          >
            Emergency Guest Access
          </button>
        </div>

        <button 
          onClick={() => toast.info('Selecting Regional Language...')}
          className="flex items-center justify-center gap-2 text-foreground/40 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span>Language Selector</span>
        </button>
      </div>

      <p className="text-foreground/40 text-center text-[9px] uppercase tracking-widest mt-8 relative z-10">
        © 2026 GhostNet Support Framework
      </p>
    </div>
  );
}
