import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GhostNetAPI } from '../../services/api';
import { toast } from 'sonner';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Users,
  Search,
  Filter
} from 'lucide-react';

export function MissionHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'rescues' | 'requests'>('rescues');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyData, requestsData] = await Promise.all([
          GhostNetAPI.getMissionHistory(),
          GhostNetAPI.getHelpRequests()
        ]);
        setHistory(historyData);
        setRequests(requestsData);
      } catch (error) {
        toast.error('Failed to sync history log');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      
      <div className="glass px-6 pt-16 pb-12 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate(-1)}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-white/10 shadow-xl bg-white/10 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>

        <h1 className="text-white text-5xl font-black italic tracking-tighter uppercase mb-2">Rescue <span className="text-primary">History</span></h1>
        <p className="text-white/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">GhostNet Protocol Log</p>
      </div>

      <div className="px-6 -mt-10 relative z-10">
        <div className="flex gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('rescues')}
            className={`flex-1 py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all border-t border-white/10 ${activeTab === 'rescues' ? 'bg-primary text-white shadow-2xl' : 'glass bg-white/5 text-white/40'}`}
          >
            Mission History
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all border-t border-white/10 ${activeTab === 'requests' ? 'bg-primary text-white shadow-2xl' : 'glass bg-white/5 text-white/40'}`}
          >
            Help Requests
          </button>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="py-32 flex flex-col items-center justify-center text-white/20 font-mono text-[10px] uppercase tracking-[0.4em] italic font-black">
              Accessing encrypted logs...
            </div>
          ) : activeTab === 'rescues' ? (
            history.length > 0 ? (
              history.map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))
            ) : (
              <div className="py-20 text-center text-white/20 font-mono text-[10px] uppercase tracking-widest">No completed missions recorded</div>
            )
          ) : (
            requests.length > 0 ? (
              requests.map((item) => (
                <RequestItem key={item.id} item={item} />
              ))
            ) : (
              <div className="py-20 text-center text-white/20 font-mono text-[10px] uppercase tracking-widest">No active help requests</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function HistoryItem({ item }: { item: any }) {
  return (
    <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-xl mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-5">
          <div className="bg-primary/20 p-4 rounded-full border border-primary/20 shadow-inner">
            <CheckCircle className="w-6 h-6 text-primary" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-base font-black text-white uppercase tracking-tighter">{item.rescuer} rescued {item.victim}</h4>
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest font-bold">{item.type} • {item.time}</p>
          </div>
        </div>
        <span className="text-[8px] px-3 py-1 rounded-full bg-primary/20 text-primary font-black uppercase tracking-widest">COMPLETED</span>
      </div>
    </div>
  );
}

function RequestItem({ item }: { item: any }) {
  return (
    <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-xl mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-5">
          <div className="bg-destructive/20 p-4 rounded-full border border-destructive/20 shadow-inner">
            <Clock className="w-6 h-6 text-destructive" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-base font-black text-white uppercase tracking-tighter">{item.name} needs help</h4>
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest font-bold">{item.need} • {item.location}</p>
          </div>
        </div>
        <span className={`text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${item.status === 'pending' ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
          {item.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
