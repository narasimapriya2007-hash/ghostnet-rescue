import { useNavigate } from 'react-router';
import { ArrowLeft, Navigation, MapPin, Home, AlertTriangle, Clock, Users } from 'lucide-react';

export function SafeRoute() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#f8f9fa] flex flex-col">
      <div className="bg-gradient-to-br from-[#16a34a] to-[#22c55e] px-6 pt-8 pb-20 rounded-b-[2rem]">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="text-white text-3xl mb-2">Safe Route</h1>
        <p className="text-white/80">Navigate to safety avoiding danger zones</p>
      </div>

      <div className="flex-1 px-6 -mt-12">
        <div className="bg-white rounded-2xl p-4 shadow-xl mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#16a34a] p-3 rounded-full">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm text-gray-500">Destination</h3>
              <h2 className="text-lg">Community Hall Shelter</h2>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>8 min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>1.2 km</span>
            </div>
            <div className="flex items-center gap-2 text-[#16a34a]">
              <Navigation className="w-4 h-4" />
              <span>Safe Route</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-3">
              <RouteStep step="1" instruction="Head northeast on Main Street" distance="0.3 km" />
              <RouteStep step="2" instruction="Turn right at City Plaza" distance="0.5 km" safe />
              <RouteStep step="3" instruction="Continue on Park Avenue" distance="0.4 km" />
              <RouteStep step="4" instruction="Arrive at Community Hall" destination />
            </div>
          </div>
        </div>

        <div className="bg-[#fef3c7] border-2 border-[#fbbf24] rounded-2xl p-4 mb-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[#92400e] mb-1">Road Blocked</h4>
            <p className="text-[#92400e] text-sm">Highway 42 flooded - Route updated automatically</p>
          </div>
        </div>

        <h3 className="text-gray-700 mb-3">Nearby Shelters</h3>
        <div className="space-y-3 mb-20">
          <ShelterCard
            name="Community Hall"
            distance="1.2 km"
            capacity="80%"
            amenities="Food, Water, Medical"
            active
          />
          <ShelterCard
            name="Public School Gymnasium"
            distance="2.5 km"
            capacity="45%"
            amenities="Food, Water"
          />
          <ShelterCard
            name="City Stadium"
            distance="3.8 km"
            capacity="30%"
            amenities="Food, Water, Medical, Blankets"
          />
        </div>
      </div>

      <div className="bg-white px-6 py-4 shadow-lg border-t border-gray-200">
        <button className="w-full bg-[#16a34a] text-white p-4 rounded-2xl active:scale-95 transition-transform">
          Start Navigation
        </button>
      </div>
    </div>
  );
}

function RouteStep({ step, instruction, distance, safe = false, destination = false }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
        destination ? 'bg-[#16a34a] text-white' : 'bg-gray-200 text-gray-700'
      }`}>
        {destination ? <Home className="w-4 h-4" /> : step}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{instruction}</p>
        {distance && (
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-gray-500">{distance}</p>
            {safe && (
              <span className="text-xs text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                Safe passage
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ShelterCard({ name, distance, capacity, amenities, active = false }: any) {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm ${active ? 'border-2 border-[#16a34a]' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-full ${active ? 'bg-[#16a34a]' : 'bg-gray-100'}`}>
          <Home className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-600'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm">{name}</h4>
            {active && (
              <span className="text-xs text-[#16a34a] bg-[#dcfce7] px-2 py-1 rounded-full">
                Selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{distance} away</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Capacity</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#16a34a]"
                  style={{ width: capacity }}
                ></div>
              </div>
              <span className="text-xs text-gray-600">{capacity}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">{amenities}</p>
        </div>
      </div>
    </div>
  );
}
