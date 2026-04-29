import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GhostNetAPI } from '../../services/api';
import {
  ArrowLeft,
  Camera,
  Video,
  MapPin,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

export function IncidentReport() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await toast.promise(GhostNetAPI.reportIncident({}), {
        loading: 'Uploading Evidence...',
        success: 'Report Transmitted',
        error: 'Upload Failed',
      });
      navigate('/report-success', { state: { title: 'Report Transmitted', subtitle: 'ID: GRID-8329-X' } });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
    <div className="min-h-screen w-full text-white flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      
      <div className="relative mb-10 floating">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative glass p-10 rounded-full shadow-2xl bg-white/70">
          <CheckCircle className="w-24 h-24 text-primary" strokeWidth={2} />
        </div>
      </div>

      <h1 className="text-foreground text-4xl font-black tracking-tighter uppercase mb-3 text-center">Report Submitted</h1>
      <p className="text-foreground/60 text-center mb-14 max-w-sm font-mono uppercase tracking-widest text-[10px] font-bold leading-relaxed">
        Your report has been shared with rescue teams and authorities successfully
      </p>

      <div className="w-full max-w-sm space-y-5">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-primary text-white p-6 rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all text-[11px] border-t border-white/20"
        >
          Return to Dashboard
        </button>
        <button
          onClick={() => setSubmitted(false)}
          className="w-full glass border-primary/10 text-foreground/40 p-6 rounded-2xl font-black uppercase tracking-[0.3em] active:scale-95 transition-all bg-white/40 shadow-sm text-[11px]"
        >
          Submit Another Report
        </button>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black italic tracking-tighter uppercase mb-2">Report <span className="text-primary">Incident</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">Help others by reporting problems</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="glass rounded-[2.5rem] p-8 shadow-sm mb-10 border border-primary/10 bg-white/50">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 italic">Incident Type</h3>
          <div className="grid grid-cols-2 gap-3 mb-10">
            <IncidentTypeChip label="Fire" />
            <IncidentTypeChip label="Flood" />
            <IncidentTypeChip label="Accident" />
            <IncidentTypeChip label="Building Damage" />
            <IncidentTypeChip label="Road Block" />
            <IncidentTypeChip label="Other" />
          </div>

          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 italic">Location</h3>
          <div className="glass border-primary/10 rounded-2xl p-6 mb-10 shadow-inner bg-white/30">
            <div className="flex items-center gap-5 mb-4">
              <MapPin className="w-7 h-7 text-primary" strokeWidth={2.5} />
              <div className="flex-1">
                <p className="text-[10px] font-black text-foreground uppercase tracking-widest">Current Location</p>
                <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest">Sector 12 • Zone 04-X</p>
              </div>
              <button className="text-[9px] font-black text-primary uppercase tracking-widest border border-primary/20 px-4 py-2 rounded-full bg-white/40">Update</button>
            </div>
          </div>

          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 italic">Description</h3>
          <textarea
            className="w-full glass border-primary/10 rounded-2xl p-6 text-[13px] mb-10 min-h-[140px] resize-none text-foreground/80 placeholder:text-foreground/20 focus:border-primary/40 transition-all outline-none bg-white/30 shadow-inner"
            placeholder="Describe what you see... Be specific about the situation and people affected."
          />

          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 italic">Photos & Video</h3>
          <div className="grid grid-cols-2 gap-5 mb-10">
            <button 
              onClick={() => toast.info('Accessing System Camera...')}
              className="glass border-2 border-dashed border-primary/10 rounded-3xl p-10 flex flex-col items-center gap-4 active:bg-white/5 transition-all hover:border-primary/40 bg-white/20"
            >
              <Camera className="w-10 h-10 text-primary/30" strokeWidth={1.5} />
              <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">Media Picker</span>
            </button>
            <button 
              onClick={() => toast.info('Initializing Video Grid...')}
              className="glass border-2 border-dashed border-primary/10 rounded-3xl p-10 flex flex-col items-center gap-4 active:bg-white/5 transition-all hover:border-primary/40 bg-white/20"
            >
              <Video className="w-10 h-10 text-primary/30" strokeWidth={1.5} />
              <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">Record Video</span>
            </button>
          </div>

          <div className="glass border-accent/20 bg-accent/5 rounded-2xl p-6 mb-6 flex items-start gap-5">
            <AlertCircle className="w-7 h-7 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-accent font-black uppercase tracking-widest text-[10px] mb-1 italic">Privacy Notice</h4>
              <p className="text-foreground/40 text-[10px] font-mono uppercase leading-relaxed tracking-widest font-bold">
                Your report will be shared with authorized emergency teams only
              </p>
            </div>
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-8 shadow-sm mb-10 border border-primary/10 bg-white/50">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-8 italic">Recent Reports</h3>
          <div className="space-y-3">
            <ReportItem
              type="Flood"
              location="0.5 km away"
              time="5 min ago"
              verified
            />
            <ReportItem
              type="Road Blocked"
              location="1.2 km away"
              time="12 min ago"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-primary text-white p-8 rounded-[3rem] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-6 font-black uppercase tracking-[0.4em] text-sm border-t border-white/20 disabled:opacity-50"
        >
          <Upload className="w-7 h-7" strokeWidth={2.5} />
          {isSubmitting ? 'Transmitting...' : 'Submit Report'}
        </button>
      </div>
    </div>
  );
}

function IncidentTypeChip({ label }: any) {
  return (
    <button className="glass border-primary/10 text-foreground/40 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:bg-primary/10 active:text-primary active:border-primary/40 transition-all bg-white/20 shadow-sm">
      {label}
    </button>
  );
}

function ReportItem({ type, location, time, verified = false }: any) {
  return (
    <div className="flex items-center gap-5 p-5 glass rounded-3xl border-primary/5 mb-4 bg-white/40 shadow-sm">
      <div className="bg-primary/10 p-4 rounded-full border border-primary/10">
        <FileText className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-sm font-bold text-foreground uppercase tracking-tighter">{type}</h5>
          {verified && (
            <span className="text-[8px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">
              VERIFIED
            </span>
          )}
        </div>
        <p className="text-[10px] text-foreground/40 font-mono uppercase tracking-widest font-bold">{location} • {time}</p>
      </div>
    </div>
  );
}
