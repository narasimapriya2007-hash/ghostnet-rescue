import { useNavigate } from 'react-router';
import { Shield, Mail, Phone, Fingerprint, AlertCircle, Globe } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1e3a8a] to-[#3b82f6] flex flex-col px-6 py-8">
      <div className="flex items-center gap-3 mb-12">
        <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
        <h2 className="text-white text-2xl">GhostNet Rescue</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-white text-3xl mb-2">Welcome Back</h1>
        <p className="text-white/80 mb-8">Sign in to access emergency services</p>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-white text-[#1e3a8a] p-4 rounded-2xl flex items-center gap-3 shadow-lg active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5" />
            <span>Continue with Phone</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-white text-[#1e3a8a] p-4 rounded-2xl flex items-center gap-3 shadow-lg active:scale-95 transition-transform"
          >
            <Mail className="w-5 h-5" />
            <span>Continue with Email</span>
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 p-4 rounded-2xl flex items-center gap-3 active:scale-95 transition-transform"
          >
            <Fingerprint className="w-5 h-5" />
            <span>Biometric Login</span>
          </button>
        </div>

        <div className="bg-[#dc2626] text-white p-5 rounded-2xl mb-6 shadow-xl border-2 border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6" />
            <h3 className="text-lg">Emergency Access</h3>
          </div>
          <p className="text-sm text-white/90 mb-4">Skip login and access emergency features immediately</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-white text-[#dc2626] p-4 rounded-xl active:scale-95 transition-transform"
          >
            Access as Guest
          </button>
        </div>

        <button className="flex items-center justify-center gap-2 text-white/80 text-sm">
          <Globe className="w-4 h-4" />
          <span>Change Language</span>
        </button>
      </div>

      <p className="text-white/60 text-center text-xs">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}
