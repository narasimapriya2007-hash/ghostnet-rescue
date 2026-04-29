import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Droplet,
  Utensils,
  Pill,
  Heart,
  TrendingUp,
  MapPin,
  DollarSign,
  CheckCircle
} from 'lucide-react';

export function ResourceSupport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] pb-6">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] px-6 pt-8 pb-20 rounded-b-[2rem]">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="text-white text-3xl mb-2">Relief Resources</h1>
        <p className="text-white/80">Essential supplies & aid tracking</p>
      </div>

      <div className="px-6 -mt-12">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <ResourceCard
            icon={Utensils}
            label="Food"
            availability="78%"
            color="bg-[#16a34a]"
          />
          <ResourceCard
            icon={Droplet}
            label="Water"
            availability="92%"
            color="bg-[#3b82f6]"
          />
          <ResourceCard
            icon={Pill}
            label="Medicine"
            availability="45%"
            color="bg-[#dc2626]"
          />
          <ResourceCard
            icon={Heart}
            label="Blankets"
            availability="65%"
            color="bg-[#ea580c]"
          />
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-sm mb-4">Nearby Relief Camps</h3>
          <div className="space-y-3">
            <ReliefCampCard
              name="Community Hall"
              distance="1.2 km"
              supplies={['Food', 'Water', 'Medical']}
              capacity={80}
            />
            <ReliefCampCard
              name="School Gymnasium"
              distance="2.5 km"
              supplies={['Food', 'Water', 'Blankets']}
              capacity={45}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8" />
            <div>
              <h3 className="text-lg">Support Relief Efforts</h3>
              <p className="text-sm text-white/80">Your donation helps save lives</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 p-3 rounded-xl">
              <span className="text-lg">$10</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 p-3 rounded-xl">
              <span className="text-lg">$25</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 p-3 rounded-xl">
              <span className="text-lg">$50</span>
            </button>
          </div>

          <button className="w-full bg-white text-[#3b82f6] p-4 rounded-xl">
            Donate Now
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Donation Transparency</h3>
            <span className="text-xs text-[#16a34a] bg-[#dcfce7] px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Blockchain Verified
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-4">
            All donations are tracked on blockchain for complete transparency
          </p>

          <div className="space-y-3">
            <TransactionItem
              amount="$5,240"
              purpose="Medical Supplies"
              progress={85}
              verified
            />
            <TransactionItem
              amount="$3,890"
              purpose="Food Distribution"
              progress={100}
              verified
            />
            <TransactionItem
              amount="$2,150"
              purpose="Shelter Materials"
              progress={60}
              verified
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm mb-4">Request Resources</h3>
          <p className="text-xs text-gray-600 mb-4">
            If you need emergency supplies, submit a request
          </p>

          <div className="space-y-2 mb-4">
            <button className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm text-left flex items-center gap-3">
              <Utensils className="w-5 h-5 text-gray-400" />
              Request Food
            </button>
            <button className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm text-left flex items-center gap-3">
              <Droplet className="w-5 h-5 text-gray-400" />
              Request Water
            </button>
            <button className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm text-left flex items-center gap-3">
              <Pill className="w-5 h-5 text-gray-400" />
              Request Medicine
            </button>
          </div>

          <button className="w-full bg-[#1e3a8a] text-white p-3 rounded-xl">
            Submit Request
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
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className={`${color} p-3 rounded-full w-fit mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-sm mb-2">{label}</h4>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-lg ${isLow ? 'text-[#dc2626]' : 'text-[#16a34a]'}`}>
          {availability}
        </span>
        <span className="text-xs text-gray-500">available</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${isLow ? 'bg-[#dc2626]' : 'bg-[#16a34a]'}`}
          style={{ width: availability }}
        ></div>
      </div>
    </div>
  );
}

function ReliefCampCard({ name, distance, supplies, capacity }: any) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-sm mb-1">{name}</h4>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{distance} away</span>
          </div>
        </div>
        <span className="text-xs text-gray-500">{capacity}% full</span>
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {supplies.map((supply: string) => (
          <span key={supply} className="text-xs bg-white px-2 py-1 rounded-full text-gray-700">
            {supply}
          </span>
        ))}
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3b82f6]"
          style={{ width: `${capacity}%` }}
        ></div>
      </div>
    </div>
  );
}

function TransactionItem({ amount, purpose, progress, verified }: any) {
  return (
    <div className="border-l-4 border-[#16a34a] bg-gray-50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h5 className="text-sm">{purpose}</h5>
          <p className="text-xs text-gray-500">{amount} raised</p>
        </div>
        {verified && (
          <CheckCircle className="w-4 h-4 text-[#16a34a]" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#16a34a]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-600">{progress}%</span>
      </div>
    </div>
  );
}
