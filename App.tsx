
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { 
  Home as HomeIcon, Brain, Users, Compass, Activity, Shield, Settings, 
  Menu, X, Sparkles, CheckCircle, Info, AlertTriangle, User 
} from 'lucide-react';
import HomePage from './pages/Home';
import MindPage from './pages/Mind';
import PeoplePage from './pages/People';
import LeadershipPage from './pages/Leadership';
import GrowthPage from './pages/Growth';
import IdentityPage from './pages/Identity';
import SettingsPage from './pages/Settings';
import OnboardingPage from './pages/Onboarding';
import { MentalState, LeadershipStage } from './types';
import { LEADERSHIP_STAGES as INITIAL_STAGES } from './constants';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface LeadershipContextType {
  mentalState: MentalState;
  setMentalState: (s: MentalState) => void;
  teamHealth: number;
  setTeamHealth: (h: number | ((prev: number) => number)) => void;
  points: number;
  addPoints: (p: number) => void;
  rank: string;
  identityStatement: string;
  setIdentityStatement: (s: string) => void;
  teamMessage: string;
  setTeamMessage: (m: string) => void;
  stages: LeadershipStage[];
  toggleTask: (stageId: string, taskId: string) => void;
  settings: Record<string, any>;
  updateSetting: (key: string, val: any) => void;
  notify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const LeadershipContext = createContext<LeadershipContextType | undefined>(undefined);

const ToastContainer: React.FC<{ toasts: Toast[], remove: (id: number) => void }> = ({ toasts, remove }) => (
  <div className="fixed top-6 left-6 z-[100] space-y-3 pointer-events-none">
    {toasts.map(t => (
      <div key={t.id} className={`flex items-center gap-3 p-4 pr-6 rounded-2xl border backdrop-blur-3xl animate-in slide-in-from-left duration-300 pointer-events-auto shadow-2xl bg-[#06110d]/95 border-[#D1FAE5]/10 text-[#D1FAE5]`}>
        {t.type === 'success' ? <CheckCircle size={18} className="text-[#1DB954]" /> : t.type === 'error' ? <AlertTriangle size={18} className="text-red-400" /> : <Info size={18} className="text-blue-400" />}
        <span className="text-sm font-bold">{t.message}</span>
        <button onClick={() => remove(t.id)} className="ml-2 hover:opacity-50 text-[#D1FAE5]/50"><X size={14} /></button>
      </div>
    ))}
  </div>
);

const SidebarLink: React.FC<{ to: string, icon: React.ReactNode, label: string, onClick?: () => void }> = ({ to, icon, label, onClick }) => (
  <NavLink to={to} onClick={onClick} className={({ isActive }) => 
    `flex items-center space-x-3 space-x-reverse p-4 rounded-2xl transition-all duration-300 ${
      isActive ? 'bg-[#1DB954]/15 text-[#D1FAE5] font-bold translate-x-1 shadow-[inset_0_0_20px_rgba(29,185,84,0.1)] border border-[#1DB954]/20' : 'text-[#D1FAE5]/40 hover:text-[#D1FAE5] hover:bg-white/5'
    }`
  }>
    <span className="flex-shrink-0">{icon}</span>
    <span className="text-sm tracking-wide">{label}</span>
  </NavLink>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const context = useContext(LeadershipContext);

  const getTitle = () => {
    const path = location.pathname;
    switch(path) {
      case '/': return 'الرئيسية (مرآة القائد)';
      case '/mind': return 'عقل القائد';
      case '/people': return 'دوائر التأثير';
      case '/leadership': return 'رحلة القيادة';
      case '/growth': return 'صحة الفريق';
      case '/identity': return 'هوية القائد';
      case '/settings': return 'الإعدادات';
      default: return 'Team Leader';
    }
  };

  return (
    <div className="h-full w-full flex flex-row-reverse bg-[#040907] overflow-hidden text-[#D1FAE5]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#060b09] border-l border-[#D1FAE5]/5 p-6 h-full shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center space-x-3 space-x-reverse mb-10 px-2">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center overflow-hidden border-2 border-[#1DB954]/20 shadow-lg logo-container">
            <img src="input_file_4.png" alt="Logo" className="w-full h-full p-2" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-[#D1FAE5]">LEADERS TEAM</h1>
            <p className="text-[8px] text-[#1DB954] font-bold uppercase tracking-widest opacity-80">القيادة فراسة وركوز</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto custom-scroll">
          <SidebarLink to="/" icon={<HomeIcon size={20} />} label="الرئيسية" />
          <SidebarLink to="/mind" icon={<Brain size={20} />} label="عقل القائد" />
          <SidebarLink to="/people" icon={<Users size={20} />} label="العلاقات" />
          <SidebarLink to="/leadership" icon={<Compass size={20} />} label="رحلة القيادة" />
          <SidebarLink to="/growth" icon={<Activity size={20} />} label="صحة الفريق" />
          <SidebarLink to="/identity" icon={<Shield size={20} />} label="هوية القائد" />
        </nav>

        <div className="pt-6 border-t border-[#D1FAE5]/5 mt-auto">
          <SidebarLink to="/settings" icon={<Settings size={20} />} label="الإعدادات" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="flex-shrink-0 z-30 bg-[#040907]/80 backdrop-blur-2xl border-b border-[#D1FAE5]/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-[#D1FAE5]/70 hover:text-[#1DB954] transition-colors">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-shiny">{getTitle()}</h2>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="hidden sm:flex items-center bg-[#D1FAE5]/5 rounded-full px-4 py-1.5 border border-[#D1FAE5]/10">
              <Sparkles size={14} className="text-[#1DB954] ml-2" />
              <span className="text-xs font-black text-[#D1FAE5] tracking-tight">{context?.points || 0} هيبة</span>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#1DB954]/40 bg-[#0a1410] shadow-lg emerald-glow">
              <img src="input_file_3.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div key={location.pathname} className="flex-1 overflow-y-auto custom-scroll p-4 md:p-8 page-enter">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#040907]/95 backdrop-blur-xl" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-[#060b09] p-8 flex flex-col shadow-2xl border-l border-[#D1FAE5]/10" onClick={e => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                    <img src="input_file_4.png" alt="Logo" className="w-full h-full p-2" />
                  </div>
                  <h1 className="font-black text-xs tracking-widest text-[#D1FAE5]">LEADERS TEAM</h1>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-[#D1FAE5]/5 rounded-full text-[#D1FAE5] hover:bg-[#D1FAE5]/10"><X size={20} /></button>
             </div>
             <nav className="space-y-4">
                <SidebarLink to="/" icon={<HomeIcon size={20}/>} label="الرئيسية" onClick={() => setIsSidebarOpen(false)} />
                <SidebarLink to="/mind" icon={<Brain size={20}/>} label="عقل القائد" onClick={() => setIsSidebarOpen(false)} />
                <SidebarLink to="/people" icon={<Users size={20}/>} label="العلاقات" onClick={() => setIsSidebarOpen(false)} />
                <SidebarLink to="/leadership" icon={<Compass size={20}/>} label="رحلة القيادة" onClick={() => setIsSidebarOpen(false)} />
                <SidebarLink to="/growth" icon={<Activity size={20}/>} label="صحة الفريق" onClick={() => setIsSidebarOpen(false)} />
                <SidebarLink to="/identity" icon={<Shield size={20}/>} label="هوية القائد" onClick={() => setIsSidebarOpen(false)} />
                <SidebarLink to="/settings" icon={<Settings size={20}/>} label="الإعدادات" onClick={() => setIsSidebarOpen(false)} />
             </nav>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => localStorage.getItem('tl_onboarded') === 'true');
  const [mentalState, setMentalState] = useState<MentalState>(() => (localStorage.getItem('tl_mental') as MentalState) || MentalState.STRONG);
  const [teamHealth, setTeamHealth] = useState(() => Number(localStorage.getItem('tl_health')) || 84);
  const [points, setPoints] = useState(() => Number(localStorage.getItem('tl_points')) || 1250);
  const [identityStatement, setIdentityStatement] = useState(() => localStorage.getItem('tl_identity') || "أنا ركاز لفريقي، أقود بالحكمة والصدق لأبني قادة حقيقيين.");
  const [teamMessage, setTeamMessage] = useState(() => localStorage.getItem('tl_team_msg') || "إيد على إيد تجدع بعيد.");
  const [stages, setStages] = useState<LeadershipStage[]>(() => {
    const saved = localStorage.getItem('tl_stages');
    return saved ? JSON.parse(saved) : INITIAL_STAGES;
  });
  const [settings, setSettings] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('tl_settings');
    return saved ? JSON.parse(saved) : {
      ai_intervention_enabled: true,
      ai_behavioral_depth: 70,
      ai_strategic_depth: 50,
      ai_coaching_style: 'firm'
    };
  });
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('tl_mental', mentalState);
    localStorage.setItem('tl_health', teamHealth.toString());
    localStorage.setItem('tl_points', points.toString());
    localStorage.setItem('tl_identity', identityStatement);
    localStorage.setItem('tl_team_msg', teamMessage);
    localStorage.setItem('tl_stages', JSON.stringify(stages));
    localStorage.setItem('tl_settings', JSON.stringify(settings));
  }, [mentalState, teamHealth, points, identityStatement, teamMessage, stages, settings]);

  const addPoints = (p: number) => setPoints(prev => prev + p);
  
  const notify = (msg: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message: msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const toggleTask = (stageId: string, taskId: string) => {
    setStages(prev => prev.map(s => {
      if (s.id !== stageId) return s;
      const newTasks = s.tasks.map(t => {
        if (t.id !== taskId) return t;
        if (!t.completed) {
          addPoints(50);
          setTeamHealth(h => Math.min(100, h + 1));
          notify(`أبشر! تم إنجاز: ${t.text}`, 'success');
        }
        return { ...t, completed: !t.completed };
      });
      const progress = Math.round((newTasks.filter(t => t.completed).length / newTasks.length) * 100);
      return { ...s, tasks: newTasks, progress };
    }));
  };

  const updateSetting = (key: string, val: any) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  return (
    <LeadershipContext.Provider value={{ 
      mentalState, setMentalState, teamHealth, setTeamHealth, points, addPoints, 
      rank: 'REKAZ', identityStatement, setIdentityStatement, teamMessage, setTeamMessage,
      stages, toggleTask, settings, updateSetting, notify
    }}>
      <ToastContainer toasts={toasts} remove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
      {!isOnboarded ? (
        <OnboardingPage onComplete={() => { localStorage.setItem('tl_onboarded', 'true'); setIsOnboarded(true); }} />
      ) : (
        <HashRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mind" element={<MindPage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/growth" element={<GrowthPage />} />
              <Route path="/identity" element={<IdentityPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </HashRouter>
      )}
    </LeadershipContext.Provider>
  );
};

export default App;
