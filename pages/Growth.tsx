
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, AlertCircle, Sparkles, TrendingUp, TrendingDown, 
  Target, Info, ChevronLeft 
} from 'lucide-react';
import { analyzeTeamHealth } from '../services/geminiService';
import { MOCK_TEAM } from '../constants';
import { LeadershipContext } from '../App';

const Particle: React.FC<{ color: string; delay: number }> = ({ color, delay }) => {
  const style = useMemo(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${delay}s`,
    backgroundColor: color,
  }), [color, delay]);

  return (
    <div 
      className="absolute w-1 h-1 rounded-full opacity-20 animate-float"
      style={style}
    />
  );
};

const GrowthPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const context = useContext(LeadershipContext);
  const navigate = useNavigate();

  const getHealthSummary = async () => {
    setLoading(true);
    const dataString = MOCK_TEAM.map(m => `${m.name}(${m.rank}, ${m.commitment}%)`).join(', ');
    const result = await analyzeTeamHealth(dataString);
    setAnalysis(result);
    setLoading(false);
  };

  useEffect(() => {
    getHealthSummary();
  }, []);

  if (!context) return null;
  const { teamHealth } = context;

  const isCritical = teamHealth < 40;
  const isWarning = teamHealth >= 40 && teamHealth < 70;
  const healthColor = isCritical ? '#ef4444' : isWarning ? '#eab308' : '#1DB954';
  const pulseSpeed = isCritical ? '0.8s' : isWarning ? '1.5s' : '3s';

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24 page-enter">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bento-card p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group border-white/5">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <Particle key={i} color={healthColor} delay={i * 0.2} />
            ))}
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full blur-[100px] transition-all duration-500" 
               style={{ backgroundColor: healthColor }} />
          
          <div className="relative w-64 h-64 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="128" cy="128" r="115" stroke="rgba(255,255,255,0.03)" strokeWidth="18" fill="transparent" />
              <circle 
                cx="128" cy="128" r="115" 
                stroke={healthColor} strokeWidth="18" fill="transparent" 
                strokeDasharray={2 * Math.PI * 115} 
                strokeDashoffset={2 * Math.PI * 115 * (1 - teamHealth/100)}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black text-shiny drop-shadow-lg" style={{ animation: `pulse-text ${pulseSpeed} infinite ease-in-out` }}>
                {Math.round(teamHealth)}%
              </span>
              <div className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full border border-white/10" 
                   style={{ backgroundColor: `${healthColor}11` }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: healthColor }} />
                <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: healthColor }}>
                  {isCritical ? 'وضع حرج' : isWarning ? 'تنبيه تدخل' : 'مستقر إيجابياً'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6 flex-1 relative z-10 text-right">
            <h2 className="text-3xl font-black">مؤشر حيوية التيم</h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              {isCritical 
                ? "تنبيه: الفريق يمر بمرحلة تراجع حادة. التدخل المباشر ضروري جداً لمنع الانهيار."
                : isWarning 
                  ? "تحذير: توجد مؤشرات تشتت في الدوائر الخارجية. ينصح بزيادة وتيرة التواصل."
                  : "توازن الفريق حالياً في المنطقة الآمنة. استمر في تعزيز ثقافة التقدير."}
            </p>
            <div className="flex gap-4">
              <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex-1 text-center">
                <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-widest">الرتب النشطة</p>
                <p className="text-xl font-black">12</p>
              </div>
              <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex-1 text-center">
                <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-widest">توقع النمو</p>
                <p className="text-xl font-black" style={{ color: healthColor }}>
                  {isCritical ? '-5%' : isWarning ? '+4%' : '+18%'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bento-card p-8 border-[#1DB954]/10 bg-gradient-to-br from-[#1DB954]/5 to-transparent">
            <div className="flex items-center justify-between mb-6">
              <Target size={24} className="text-[#1DB954]" />
              <TrendingUp size={16} className="text-[#1DB954]" />
            </div>
            <h3 className="text-lg font-black mb-2 text-right">زخم النواة</h3>
            <p className="text-xs text-gray-500 font-medium text-right leading-relaxed">الأعضاء الأساسيون يقدمون الآن 90% من الدعم النفسي للتيم تلقائياً.</p>
          </div>

          <div className="bento-card p-8 border-red-500/10 bg-gradient-to-br from-red-500/5 to-transparent">
            <div className="flex items-center justify-between mb-6">
              <AlertCircle size={24} className="text-red-500" />
              <TrendingDown size={16} className="text-red-500" />
            </div>
            <h3 className="text-lg font-black mb-2 text-right">نقاط الضعف</h3>
            <p className="text-xs text-gray-500 font-medium text-right leading-relaxed">خطر انفصال في الدائرة الثالثة بسبب نقص التواصل المباشر مع القائد.</p>
          </div>
        </div>
      </div>

      <section className="bento-card p-10 border-white/5 relative overflow-hidden bg-black/40">
        <div className="relative z-10 text-right">
          <div className="flex items-center gap-4 mb-10 flex-row-reverse">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#1DB954] emerald-glow">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black">تقرير الذكاء الاصطناعي السلوكي</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">بناءً على نشاط آخر 7 أيام</p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-6 py-10">
              <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse ml-auto" />
              <div className="h-4 bg-white/5 rounded-full w-full animate-pulse ml-auto" />
              <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse ml-auto" />
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-gray-300 font-medium leading-loose text-lg whitespace-pre-wrap">
              {analysis || "جارٍ تجهيز البيانات التحليلية..."}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
        .animate-float {
          animation: float 5s infinite ease-out;
        }
        @keyframes pulse-text {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default GrowthPage;
