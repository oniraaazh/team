
import React, { useState, useContext } from 'react';
import { 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Users, 
  AlertCircle, 
  Target, 
  Heart,
  Circle,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { LeadershipContext } from '../App';

const LeadershipPage: React.FC = () => {
  const context = useContext(LeadershipContext);
  const [expandedStage, setExpandedStage] = useState<string | null>('s1');

  if (!context) return null;
  const { stages, toggleTask } = context;

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'behavioral': return <Zap size={14} />;
      case 'strategic': return <Target size={14} />;
      case 'human': return <Heart size={14} />;
      default: return <Circle size={14} />;
    }
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'behavioral': return 'text-emerald-500 bg-emerald-500/10';
      case 'strategic': return 'text-blue-500 bg-blue-500/10';
      case 'human': return 'text-rose-500 bg-rose-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStageIcon = (id: string) => {
    switch(id) {
      case 's1': return <Zap />;
      case 's2': return <Users />;
      case 's3': return <ShieldCheck />;
      default: return <Sparkles />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-black text-shiny">رحلة القيادة</h1>
        <p className="text-gray-500 max-w-lg mx-auto font-medium">كل مرحلة تفتح عند إثبات السلوك الصحيح، لا بالوقت أو المال.</p>
      </header>

      <div className="space-y-4">
        {stages.map((stage, idx) => {
          const isExpanded = expandedStage === stage.id;
          // Logic: unlock s2 if s1 is 100%, s3 if s2 is 100%, etc.
          const isLocked = idx > 0 && stages[idx-1].progress < 100;

          return (
            <div 
              key={stage.id} 
              className={`bento-card overflow-hidden transition-all duration-500 ${isLocked ? 'opacity-40 grayscale pointer-events-none' : 'hover:border-[#1DB954]/30'}`}
            >
              <div 
                className={`p-8 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer`}
                onClick={() => !isLocked && setExpandedStage(isExpanded ? null : stage.id)}
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${isLocked ? 'bg-white/5' : 'bg-[#1DB954]/10 text-[#1DB954]'}`}>
                    {isLocked ? <Lock size={24} /> : getStageIcon(stage.id)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black">{stage.arabicName || stage.name}</h3>
                    <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-widest">المرحلة {idx + 1}</p>
                  </div>
                </div>
                
                {!isLocked && (
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="flex-1 md:w-32">
                      <div className="flex justify-between text-[10px] font-black mb-1">
                        <span>التقدم</span>
                        <span>{stage.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1DB954] transition-all duration-1000" style={{ width: `${stage.progress}%` }} />
                      </div>
                    </div>
                    <div className="p-2 text-gray-500">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                )}
                
                {isLocked && (
                  <p className="text-[10px] font-black text-gray-600 italic">يُفتح عند إتمام المرحلة السابقة بنسبة 100%</p>
                )}
              </div>

              {!isLocked && isExpanded && stage.tasks.length > 0 && (
                <div className="px-8 pb-8 pt-2 space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="h-px bg-white/5 mb-6" />
                  <div className="grid gap-3">
                    {stage.tasks.map(task => (
                      <div 
                        key={task.id} 
                        onClick={() => toggleTask(stage.id, task.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
                          task.completed ? 'bg-[#1DB954]/5 border-[#1DB954]/20' : 'bg-white/5 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTaskColor(task.type)}`}>
                            {getTaskIcon(task.type)}
                          </div>
                          <div className="space-y-0.5">
                            <p className={`text-sm font-bold ${task.completed ? 'text-[#1DB954]' : 'text-gray-200'}`}>
                              {task.text}
                            </p>
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">
                              {task.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {task.completed ? (
                            <div className="w-6 h-6 rounded-full bg-[#1DB954] flex items-center justify-center text-white">
                              <CheckCircle2 size={16} />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-[#1DB954]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeadershipPage;
