
import React, { useContext } from 'react';
// Added Compass to the imports to resolve the missing name error
import { User, Bell, Lock, Sparkles, LogOut, ChevronLeft, Shield, AlertCircle, MessageSquare, Moon, Globe, Zap, Heart, Activity, Sliders, Volume2, ShieldAlert, Compass } from 'lucide-react';
import { LeadershipContext } from '../App';

const SettingsSection: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="text-[#1DB954]">{icon}</div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#1DB954]">{title}</h3>
      </div>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </section>
);

const SettingsItem: React.FC<{ 
  icon: React.ReactNode, 
  label: string, 
  value?: string, 
  toggle?: boolean, 
  active?: boolean,
  onToggle?: (val: boolean) => void,
  color?: string,
  description?: string
}> = ({ icon, label, value, toggle, active, onToggle, color = "text-gray-400", description }) => (
  <div 
    className="flex items-center justify-between p-6 bg-white/[0.03] rounded-[2.5rem] border border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer group"
    onClick={() => toggle && onToggle && onToggle(!active)}
  >
    <div className="flex items-center space-x-5 space-x-reverse">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <span className="font-bold text-gray-200 block">{label}</span>
        {description && <span className="text-[10px] text-gray-500 font-medium block mt-0.5">{description}</span>}
      </div>
    </div>
    <div className="flex items-center space-x-3 space-x-reverse">
      {value && <span className="text-xs text-gray-500 font-black tracking-tighter uppercase">{value}</span>}
      {toggle ? (
        <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-[#1DB954]' : 'bg-white/10'}`}>
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-300 ${active ? 'right-1' : 'right-7'}`} />
        </div>
      ) : (
        <ChevronLeft size={18} className="text-gray-700 group-hover:text-white transition-all" />
      )}
    </div>
  </div>
);

const SettingsSlider: React.FC<{
  icon: React.ReactNode,
  label: string,
  value: number,
  onChange: (val: number) => void,
  color?: string,
  min?: number,
  max?: number,
  description: string
}> = ({ icon, label, value, onChange, color = "text-purple-500", min = 0, max = 100, description }) => (
  <div className="p-8 bg-white/[0.03] rounded-[2.5rem] border border-white/5 space-y-6 group hover:bg-white/[0.05] transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-5 space-x-reverse">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 ${color} group-hover:emerald-glow transition-all`}>
          {icon}
        </div>
        <div>
          <span className="font-bold text-gray-200 block">{label}</span>
          <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-0.5">{description}</span>
        </div>
      </div>
      <span className="text-2xl font-black text-shiny">{value}%</span>
    </div>
    <div className="relative pt-2">
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#1DB954] hover:accent-[#1DB954]/80 transition-all"
      />
      <div className="flex justify-between text-[8px] font-black text-gray-600 uppercase tracking-[0.2em] mt-3">
        <span>تحليلي</span>
        <span>توجيهي</span>
      </div>
    </div>
  </div>
);

const SegmentedControl: React.FC<{
  options: { id: string, label: string }[],
  activeId: string,
  onChange: (id: string) => void,
  label: string
}> = ({ options, activeId, onChange, label }) => (
  <div className="p-8 bg-white/[0.03] rounded-[2.5rem] border border-white/5 space-y-4">
    <div className="flex justify-between items-center px-2">
      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5">
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeId === opt.id ? 'bg-[#1DB954] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const SettingsPage: React.FC = () => {
  const context = useContext(LeadershipContext);
  if (!context) return null;
  const { settings, updateSetting, rank } = context;

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-32 pt-6">
      <header className="text-center space-y-4 mb-14">
        <h1 className="text-4xl font-black text-shiny">إعدادات القائد</h1>
        <p className="text-gray-500 font-medium max-w-lg mx-auto">تحكم في الطريقة التي يتفاعل بها النظام مع فريقك ومعك كقائد.</p>
      </header>

      {/* AI Intervention Logic */}
      <SettingsSection title="الذكاء الاصطناعي والتدخل" icon={<Sparkles size={16} />}>
        <SettingsItem 
          icon={<Zap size={20} />} 
          label="تفعيل الكوتش الذكي" 
          toggle 
          active={settings.ai_intervention_enabled} 
          onToggle={(v) => updateSetting('ai_intervention_enabled', v)}
          color="text-purple-500" 
          description="تفعيل التحليلات السلوكية والتوجيهات المباشرة من النظام."
        />
        
        {settings.ai_intervention_enabled && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-500">
              <SettingsSlider 
                icon={<Activity size={20} />} 
                label="الذكاء السلوكي" 
                description="قوة رصد التغيرات النفسية"
                value={settings.ai_behavioral_depth}
                onChange={(v) => updateSetting('ai_behavioral_depth', v)}
              />
              <SettingsSlider 
                icon={<Compass size={20} />} 
                label="الذكاء الاستراتيجي" 
                description="عمق التحليل التقني والمهامي"
                value={settings.ai_strategic_depth}
                color="text-blue-500"
                onChange={(v) => updateSetting('ai_strategic_depth', v)}
              />
            </div>
            <SegmentedControl 
              label="أسلوب الكوتشينج"
              activeId={settings.ai_coaching_style}
              onChange={(v) => updateSetting('ai_coaching_style', v)}
              options={[
                { id: 'analytical', label: 'تحليلي بارد' },
                { id: 'supportive', label: 'داعم ومرن' },
                { id: 'firm', label: 'حازم ومواجه' }
              ]}
            />
          </>
        )}
      </SettingsSection>

      {/* Advanced Notifications */}
      <SettingsSection title="تفضيلات الإشعارات" icon={<Bell size={16} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingsItem 
            icon={<ShieldAlert size={18} />} 
            label="تنبيهات المخاطر العالية" 
            toggle 
            active={settings.notify_member_risk}
            onToggle={(v) => updateSetting('notify_member_risk', v)}
            color="text-red-500" 
            description="إشعار فوري عند رصد صمت أو تراجع حاد لأي عضو."
          />
          <SettingsItem 
            icon={<Shield size={18} />} 
            label="ترقيات الرتب" 
            toggle 
            active={settings.notify_rank_up}
            onToggle={(v) => updateSetting('notify_rank_up', v)}
            color="text-emerald-500" 
            description="احتفل بنجاحات فريقك عند تحقيق سلوك قيادي جديد."
          />
          <SettingsItem 
            icon={<Activity size={18} />} 
            label="انهيار صحة الفريق" 
            toggle 
            active={settings.notify_health_drop}
            onToggle={(v) => updateSetting('notify_health_drop', v)}
            color="text-orange-500" 
            description="تحذير عند هبوط مؤشر الصحة تحت 50%."
          />
          <SettingsItem 
            icon={<Volume2 size={18} />} 
            label="الوضع الصامت" 
            toggle 
            active={settings.quiet_mode}
            onToggle={(v) => updateSetting('quiet_mode', v)}
            color="text-gray-500" 
            description="إيقاف كافة التنبيهات خارج ساعات العمل الرسمية."
          />
        </div>
      </SettingsSection>

      {/* Visuals & Display */}
      <SettingsSection title="المظهر والنظام" icon={<Sliders size={16} />}>
        <div className="space-y-4">
          <SettingsItem icon={<Moon size={18} />} label="الوضع الليلي الدائم" toggle active={settings.dark_mode} onToggle={(v) => updateSetting('dark_mode', v)} color="text-yellow-500" />
          <SettingsItem icon={<Globe size={18} />} label="اللغة والتوطين" value="العربية" />
        </div>
      </SettingsSection>

      {/* Security & Account */}
      <SettingsSection title="الحساب والأمان" icon={<Lock size={16} />}>
        <div className="space-y-4">
          <SettingsItem icon={<User size={20} />} label="المعلومات الشخصية" color="text-blue-200" />
          <SettingsItem icon={<Shield size={20} />} label="تاريخ الرتب السلوكي" value={rank} color="text-[#1DB954]" />
          <SettingsItem icon={<LogOut size={20} />} label="تسجيل الخروج" color="text-red-400" onToggle={handleLogout} />
        </div>
      </SettingsSection>

      <div className="pt-20 text-center opacity-20">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield size={16} />
          <p className="text-sm font-black tracking-[0.3em] uppercase">Team Leader</p>
        </div>
        <p className="text-[10px] font-medium tracking-[0.5em] uppercase">Sustainable Leadership OS</p>
        <p className="text-[10px] font-medium mt-4 italic">v2.5.0 - Behavioral Intelligence Update</p>
      </div>
    </div>
  );
};

export default SettingsPage;
