import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Globe,
  Mic,
  Watch,
  Heart,
  Volume2,
  Type,
  Palette,
  Settings
} from 'lucide-react';

export function Accessibility() {
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

        <h1 className="text-white text-3xl mb-2">Accessibility</h1>
        <p className="text-white/80">Smart assistance & personalization</p>
      </div>

      <div className="px-6 -mt-12">
        <div className="bg-white rounded-2xl p-5 shadow-xl mb-6">
          <h3 className="text-sm mb-4">Language & Communication</h3>

          <button className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3 flex items-center gap-3">
            <Globe className="w-5 h-5 text-[#3b82f6]" />
            <div className="flex-1 text-left">
              <h4 className="text-sm">Language</h4>
              <p className="text-xs text-gray-500">English (US)</p>
            </div>
            <span className="text-xs text-[#3b82f6]">Change</span>
          </button>

          <div className="grid grid-cols-3 gap-2">
            <LanguageChip label="हिन्दी" />
            <LanguageChip label="বাংলা" />
            <LanguageChip label="தமிழ்" />
            <LanguageChip label="తెలుగు" />
            <LanguageChip label="ગુજરાતી" />
            <LanguageChip label="ಕನ್ನಡ" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Mic className="w-8 h-8" />
            <div>
              <h3 className="text-lg">Voice Assistant</h3>
              <p className="text-sm text-white/80">Activate emergency features by voice</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-white/90 mb-2">Say:</p>
            <p className="text-white">"Hey GhostNet, activate SOS"</p>
          </div>

          <button className="w-full bg-white text-[#3b82f6] p-3 rounded-xl">
            Enable Voice Commands
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-sm mb-4">Wearable Integration</h3>

          <div className="space-y-3">
            <WearableCard
              icon={Watch}
              name="Apple Watch"
              status="Connected"
              features="Emergency trigger, Health monitoring"
              connected
            />
            <WearableCard
              icon={Watch}
              name="Android Wear"
              status="Not Connected"
              features="Emergency trigger, Location sharing"
              connected={false}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-[#dc2626]" />
            <h3 className="text-sm">Mental Health Support</h3>
          </div>

          <p className="text-xs text-gray-600 mb-4">
            Emotional support and counseling during crisis situations
          </p>

          <div className="space-y-2 mb-4">
            <SupportCard
              title="24/7 Crisis Helpline"
              subtitle="Talk to a counselor immediately"
              action="Call Now"
            />
            <SupportCard
              title="Guided Breathing Exercises"
              subtitle="Calm your mind during stress"
              action="Start"
            />
            <SupportCard
              title="Peer Support Groups"
              subtitle="Connect with others in similar situations"
              action="Join"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm mb-4">Display Settings</h3>

          <div className="space-y-3">
            <SettingItem
              icon={Type}
              label="Large Text"
              description="Increase font size for better readability"
            />
            <SettingItem
              icon={Palette}
              label="High Contrast"
              description="Enhance visual clarity"
            />
            <SettingItem
              icon={Volume2}
              label="Screen Reader"
              description="Enable audio descriptions"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LanguageChip({ label }: any) {
  return (
    <button className="bg-gray-50 border border-gray-200 text-gray-700 p-2 rounded-lg text-sm active:bg-[#3b82f6] active:text-white active:border-[#3b82f6] transition-colors">
      {label}
    </button>
  );
}

function WearableCard({ icon: Icon, name, status, features, connected }: any) {
  return (
    <div className={`border ${connected ? 'border-[#16a34a] bg-[#dcfce7]' : 'border-gray-200 bg-gray-50'} rounded-xl p-4`}>
      <div className="flex items-start gap-3">
        <div className={`${connected ? 'bg-[#16a34a]' : 'bg-gray-200'} p-3 rounded-full`}>
          <Icon className={`w-5 h-5 ${connected ? 'text-white' : 'text-gray-500'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm">{name}</h4>
            <span className={`text-xs px-2 py-1 rounded-full ${
              connected ? 'bg-[#16a34a] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {status}
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-3">{features}</p>
          {!connected && (
            <button className="text-xs text-[#3b82f6]">Connect Device →</button>
          )}
        </div>
      </div>
    </div>
  );
}

function SupportCard({ title, subtitle, action }: any) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
      <div className="flex-1">
        <h4 className="text-sm mb-1">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <button className="bg-[#dc2626] text-white px-4 py-2 rounded-lg text-sm">
        {action}
      </button>
    </div>
  );
}

function SettingItem({ icon: Icon, label, description }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <Icon className="w-5 h-5 text-gray-400" />
      <div className="flex-1">
        <h4 className="text-sm">{label}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <label className="relative inline-block w-12 h-6">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#3b82f6] transition-colors"></div>
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
      </label>
    </div>
  );
}
