import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GhostNetAPI, Supply } from '../../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  Droplet,
  Utensils,
  Pill,
  Heart,
  TrendingUp,
  MapPin,
  DollarSign,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

export function ResourceSupport() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const data = await GhostNetAPI.getSupplies();
        setSupplies(data);
      } catch (error) {
        toast.error('Failed to sync relief inventory');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSupplies();
  }, []);

  const [donationAmount, setDonationAmount] = useState(25);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleRequestHelp = async () => {
    if (selectedItems.length === 0) {
      throw new Error('Select at least one category');
    }
    
    try {
      const locationData = await GhostNetAPI.getCurrentLocation().catch(() => ({ lat: 0, lng: 0 }));
      const locationStr = locationData.lat ? `${locationData.lat.toFixed(4)}, ${locationData.lng.toFixed(4)}` : 'Remote';
      
      await GhostNetAPI.registerHelpSeeker({
        name: user?.name || 'Anonymous',
        need: selectedItems.join(', '),
        location: locationStr
      });
      
      setSelectedItems([]);
      return 'Request Sent Successfully';
    } catch (err) {
      throw new Error('Failed to send request');
    }
  };

  return (
    <div className="min-h-screen w-full text-white pb-32 font-sans relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="glass px-6 pt-16 pb-24 rounded-b-[4rem] shadow-2xl border-b border-white/10 relative overflow-hidden bg-white/10 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px]"></div>
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3.5 rounded-full mb-10 active:scale-90 transition-transform border-primary/10 shadow-xl bg-white/60 relative z-10"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
        </button>

        <h1 className="text-foreground text-5xl font-black italic tracking-tighter uppercase mb-2">Relief <span className="text-primary">Supplies</span></h1>
        <p className="text-foreground/40 font-mono text-[11px] tracking-[0.4em] uppercase font-black italic">Check Availability & Global Resources</p>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-2 gap-4 mb-10">
          {isLoading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="glass rounded-[2rem] p-6 h-40 animate-pulse border-primary/5 bg-white/40"></div>
            ))
          ) : supplies.map(supply => (
            <ResourceCard
              key={supply.id}
              icon={supply.category === 'Medical' ? Pill : supply.category === 'Food' ? Utensils : Droplet}
              label={supply.name}
              availability={supply.quantity}
              color={supply.status === 'out' ? 'bg-destructive/10 text-destructive border-destructive/10' : 'bg-primary/10 text-primary border-primary/10'}
            />
          ))}
        </div>

        <div className="glass rounded-[2.5rem] p-8 shadow-sm mb-10 border border-primary/10 bg-white/50">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 italic">Nearby Relief Centers</h3>
          <div className="space-y-4">
            <ReliefCampCard
              name="Community Center Alpha"
              distance="1.2 km"
              supplies={['Food', 'Water', 'Medical']}
              capacity={80}
              onClick={() => navigate('/relief-details', { state: { title: 'Community Center Alpha', subtitle: 'Regional Relief Hub' } })}
            />
            <ReliefCampCard
              name="Public School Hall"
              distance="2.5 km"
              supplies={['Food', 'Water', 'Blankets']}
              capacity={45}
              onClick={() => navigate('/relief-details', { state: { title: 'Public School Hall', subtitle: 'Emergency Shelter' } })}
            />
          </div>
        </div>

        <div className="glass border border-primary/10 text-foreground rounded-[3rem] p-10 mb-10 shadow-lg relative overflow-hidden floating bg-white/60">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px]"></div>
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="bg-primary/10 p-5 rounded-full border border-primary/10 shadow-inner">
              <DollarSign className="w-8 h-8 text-primary" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tighter uppercase">Donate to Relief</h3>
              <p className="text-[10px] text-foreground/50 font-mono uppercase tracking-widest font-bold">Help those in need</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 mb-10 relative z-10">
            {[10, 25, 50].map((val) => (
              <button
                key={val}
                onClick={() => setDonationAmount(val)}
                className={`glass p-6 rounded-2xl border-primary/10 transition-all font-black text-2xl bg-white/40 shadow-sm active:scale-95 ${donationAmount === val ? 'text-primary border-primary bg-primary/5' : 'text-foreground/30'}`}
              >
                ${val}
              </button>
            ))}
          </div>

          <button
            onClick={() => toast.promise(GhostNetAPI.donate(donationAmount), {
              loading: 'Processing Secure Payment...',
              success: (data) => {
                navigate('/donation-success', { state: { title: 'Donation Confirmed', subtitle: `ID: ${data.transactionId}` } });
                return `Transaction ${data.transactionId} confirmed`;
              },
              error: 'Donation failed',
            })}
            className="w-full bg-primary text-white p-7 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-xl active:scale-95 transition-all relative z-10 border-t border-white/20"
          >
            Confirm Donation
          </button>
        </div>

        <div className="glass rounded-[2rem] p-8 shadow-sm mb-10 border border-primary/10 bg-white/40">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Active Ledgers</h3>
            <span className="text-[9px] font-black text-primary bg-primary/5 px-4 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-widest border border-primary/10 shadow-sm">
              <CheckCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
              Verified Tracking
            </span>
          </div>

          <div className="space-y-4">
            <TransactionItem
              name="Medical Logistics"
              progress={85}
              eta="2H"
              status="In Transit"
            />
            <TransactionItem
              name="Water Purifiers"
              progress={100}
              eta="COMPLETED"
              status="Delivered"
            />
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-10 shadow-sm border border-primary/10 bg-white/50 mb-12">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 italic">Request Supplies</h3>
          <p className="text-foreground/50 text-[10px] font-mono uppercase tracking-widest mb-10 leading-relaxed font-bold">
            Ask for essential items to be delivered to your location
          </p>

          <div className="space-y-4 mb-12">
            <button
              onClick={() => toggleItem('Food')}
              className={`w-full glass p-6 rounded-2xl text-[11px] font-black uppercase tracking-widest text-left flex items-center gap-5 transition-all shadow-sm ${selectedItems.includes('Food') ? 'border-primary bg-primary/5' : 'border-primary/5 bg-white/30'}`}
            >
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/5">
                <Utensils className={`w-6 h-6 ${selectedItems.includes('Food') ? 'text-primary' : 'text-foreground/20'}`} />
              </div>
              Food Supply
            </button>
            <button
              onClick={() => toggleItem('Water')}
              className={`w-full glass p-6 rounded-2xl text-[11px] font-black uppercase tracking-widest text-left flex items-center gap-5 transition-all shadow-sm ${selectedItems.includes('Water') ? 'border-primary bg-primary/5' : 'border-primary/5 bg-white/30'}`}
            >
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/5">
                <Droplet className={`w-6 h-6 ${selectedItems.includes('Water') ? 'text-primary' : 'text-foreground/20'}`} />
              </div>
              Water Supply
            </button>
            <button
              onClick={() => toggleItem('Medical')}
              className={`w-full glass p-6 rounded-2xl text-[11px] font-black uppercase tracking-widest text-left flex items-center gap-5 transition-all shadow-sm ${selectedItems.includes('Medical') ? 'border-primary bg-primary/5' : 'border-primary/5 bg-white/30'}`}
            >
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/5">
                <Pill className={`w-6 h-6 ${selectedItems.includes('Medical') ? 'text-primary' : 'text-foreground/20'}`} />
              </div>
              Medical Supply
            </button>
          </div>

          <button
            onClick={() => {
              toast.promise(handleRequestHelp(), {
                loading: 'Sending Request...',
                success: (msg) => {
                  navigate('/supply-confirmation', { state: { title: 'Request Confirmed', subtitle: 'Relief Logistics Active' } });
                  return msg;
                },
                error: (err) => err.message,
              });
            }}
            className="w-full bg-primary text-white p-7 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-xl active:scale-95 transition-all border-t border-white/20"
          >
            Send Supply Request
          </button>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ icon: Icon, label, availability, color }: any) {
  const percentage = parseInt(availability);
  const isLow = percentage < 50;

  return (
    <div className="glass rounded-[2rem] p-6 shadow-sm border border-primary/10 bg-white/60">
      <div className={`${color} p-4 rounded-xl w-fit mb-6 border`}>
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] mb-4 italic">{label}</h4>
      <div className="flex items-center justify-between mb-4">
        <span className={`text-2xl font-black italic tracking-tighter ${isLow ? 'text-destructive' : 'text-primary'}`}>
          {availability}
        </span>
        <span className="text-[8px] text-foreground/30 uppercase font-mono tracking-widest">Synced</span>
      </div>
      <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${isLow ? 'bg-destructive' : 'bg-primary'}`}
          style={{ width: availability }}
        ></div>
      </div>
    </div>
  );
}

function ReliefCampCard({ name, distance, supplies, capacity, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`glass p-6 rounded-[1.5rem] border border-primary/10 mb-4 bg-white/60 shadow-sm ${onClick ? 'cursor-pointer active:scale-[0.98] transition-all hover:bg-white/80' : ''}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h4 className="text-sm font-bold text-foreground uppercase tracking-tighter mb-2">{name}</h4>
          <div className="flex items-center gap-2 text-[10px] text-foreground/40 font-mono uppercase tracking-widest">
            <MapPin className="w-3 h-3 text-primary" />
            <span>{distance} AWAY</span>
          </div>
        </div>
        <span className="text-[10px] font-black text-foreground/30 font-mono">{capacity}% CAPACITY</span>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {supplies.map((supply: string) => (
          <span key={supply} className="text-[8px] font-black bg-white/40 border border-primary/5 px-3 py-1 rounded-full text-foreground/50 uppercase tracking-widest">
            {supply}
          </span>
        ))}
      </div>

      <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${capacity}%` }}
        ></div>
      </div>
    </div>
  );
}

function TransactionItem({ name, progress, eta, status }: any) {
  return (
    <div className="glass rounded-[1.5rem] p-6 border border-primary/10 mb-4 bg-white/40 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold text-foreground uppercase tracking-tighter">{name}</h4>
        <span className={`text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${
          status === 'In Transit' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-foreground/5 text-foreground/40'
        }`}>
          {status}
        </span>
      </div>
      <div className="w-full bg-foreground/5 h-1.5 rounded-full mb-4 overflow-hidden">
        <div
          className="bg-primary h-full rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-foreground/30">
        <span>ETA: {eta}</span>
        <span>{progress}% SECURED</span>
      </div>
    </div>
  );
}
