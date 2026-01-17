
import React, { useState, useContext, useCallback } from 'react';
import { LeadershipContext } from '../App';
import { 
  Brain, Sparkles, CheckSquare, XSquare, History, Loader2, 
  Lightbulb, Zap, Target, Coffee 
} from 'lucide-react';
import { getDecisionFeedback, getAICoachAnalysis } from '../services/geminiService';
import { DAILY_SCENARIO } from '../constants';

const MindPage: React.FC = () => {
  const context = useContext(LeadershipContext);
  const [executed, setExecuted] = useState('');
  const [escaped, setEscaped] = useState('');
  const [coachResponse, setCoachResponse] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  if (!context) return null;
  const { addPoints, notify } = context;

  const handleAICoachSession = async () => {
    if (!executed.trim() && !escaped.trim()) {
      notify('يا ريس، أكتب كلام الصدق أول عشان نحلل الفهم', 'error');
      return;
    }

    setAnalyzing(true);
    setCoachResponse(null);

    try {
      const lastDecisionText = selectedDecision 
        ? DAILY_SCENARIO.options.find(o => o.id === selectedDecision)?.text || 'None'
        : 'لم يتم اتخاذ قرار بعد';

      const analysis = await getAICoachAnalysis(executed, escaped, lastDecisionText);
      setCoachResponse(analysis);
      addPoints(50);
      notify('تم تحديث جلسة الفراسة الذكية بنجاح', 'success');
    } catch (error) {
      notify('فشل الاتصال بمدرب الحكمة، حاول مرة ثانية', 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDecision = useCallback(async (optionId: string, text: string) => {
    if (loadingFeedback) return;
    
    setSelectedDecision(optionId);
    setLoadingFeedback(true);
    setFeedback(null);
    
    try {
      const aiFeedback = await getDecisionFeedback(DAILY_SCENARIO.description, text);
      setFeedback(aiFeedback || null);
      addPoints(30);
      notify('تم تسجيل حكمة القرار وأثره على الفريق', 'success');
    } catch (error) {
      notify('حدث خطأ في قراءة الفراسة الآلية', 'error');
    } finally {
      setLoadingFeedback(false);
    }
  }, [addPoints, loadingFeedback, notify]);

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24 text-[#D1FAE5]">
      <header className="text-center space-y-4 mb-14">
        <h1 className="text-4xl font-black text-shiny">عقل القائد (مختبر الوعي)</h1>
        <p className="opacity-60 font-medium max-w-lg mx-auto leading-relaxed">
          القيادة تبدأ بالصدق مع النفس والقدرة على اتخاذ قرارات حكيمة في عز الضغوط.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Daily Scenario Card */}
          <section className="bento-card p-8 border-white/5 relative overflow-hidden bg-gradient-to-br from-[#1DB954]/5 to-transparent">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954]">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-black">قرار قيادي (موقف اليوم)</h3>
            </div>
            
            <div className="bg-black/20 rounded-3xl p-6 mb-8 border border-white/5">
              <h4 className="font-black text-[#1DB954] mb-2">{DAILY_SCENARIO.title}</h4>
              <p className="text-sm opacity-80 leading-relaxed text-right">{DAILY_SCENARIO.description}</p>
            </div>

            <div className="space-y-3">
              {DAILY_SCENARIO.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleDecision(opt.id, opt.text)}
                  className={`w-full p-5 rounded-2xl text-right transition-all border flex items-center justify-between group ${
                    selectedDecision === opt.id 
                      ? 'bg-[#1DB954]/20 border-[#1DB954] shadow-[0_0_20px_rgba(29,185,84,0.1)]' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span className={`text-sm font-bold ${selectedDecision === opt.id ? 'text-[#1DB954]' : 'text-[#D1FAE5]/70'}`}>
                    {opt.text}
                  </span>
                  {selectedDecision === opt.id && <Zap size={16} className="text-[#1DB954] animate-pulse" />}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="mt-6 p-6 bg-white/5 border-r-4 border-[#1DB954] rounded-2xl animate-in slide-in-from-right duration-500">
                <div className="flex items-center gap-2 mb-3 text-[#1DB954]">
                  <Lightbulb size={18} />
                  <span className="text-xs font-black uppercase tracking-widest">أثر القرار السلوكي</span>
                </div>
                <div className="text-sm opacity-90 leading-relaxed whitespace-pre-wrap">{feedback}</div>
              </div>
            )}
          </section>

          {/* Honesty Log Card */}
          <section className="bento-card p-8 border-white/5 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954]">
                <History size={24} />
              </div>
              <h3 className="text-2xl font-black">سجل الصدق والمكاشفة</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black opacity-40 uppercase tracking-[0.2em] px-2">
                  <CheckSquare size={14} className="text-[#1DB954]" />
                  <span>الإنجازات السلوكية اليوم</span>
                </label>
                <textarea 
                  value={executed}
                  onChange={(e) => setExecuted(e.target.value)}
                  placeholder="شنو العملتو بالجد؟"
                  className="w-full h-32 bg-white/5 border border-white/5 rounded-3xl p-5 text-sm text-[#D1FAE5] focus:border-[#1DB954]/30 focus:ring-0 focus:bg-white/10 resize-none transition-all font-medium outline-none"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black opacity-40 uppercase tracking-[0.2em] px-2">
                  <XSquare size={14} className="text-red-500" />
                  <span>التهرب والززوغان اليوم</span>
                </label>
                <textarea 
                  value={escaped}
                  onChange={(e) => setEscaped(e.target.value)}
                  placeholder="شنو الزغت منو الليلة؟"
                  className="w-full h-32 bg-white/5 border border-white/5 rounded-3xl p-5 text-sm text-[#D1FAE5] focus:border-red-500/20 focus:ring-0 focus:bg-white/10 resize-none transition-all font-medium outline-none"
                />
              </div>
            </div>

            <button 
              onClick={handleAICoachSession}
              disabled={analyzing}
              className="mt-8 w-full py-5 bg-[#1DB954] text-black font-black rounded-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50 group"
            >
              {analyzing ? <Loader2 className="animate-spin" size={20} /> : <Brain size={20} className="group-hover:scale-110 transition-transform" />}
              <span className="text-lg">{analyzing ? 'جاري قراءة الفراسة...' : 'استشارة مدرب الحكمة (AI)'}</span>
            </button>
          </section>
        </div>

        {/* Right Column: AI Coach Feedback */}
        <div className="space-y-8">
          <section className="bento-card p-8 border-white/5 h-full flex flex-col min-h-[400px]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-black">تحليل الكوتش السلوكي</h3>
            </div>

            {!coachResponse && !analyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 opacity-30">
                <Brain size={64} strokeWidth={1} />
                <p className="text-sm font-medium">سجل صدقك وخذ قرارك لفتح تحليل الكوتش الذكي.</p>
              </div>
            )}

            {analyzing && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#1DB954]/20 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-[#1DB954]">
                    <Brain size={32} className="animate-pulse" />
                  </div>
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1DB954] animate-pulse">جاري استنطاق الوعي</p>
              </div>
            )}

            {coachResponse && !analyzing && (
              <div className="flex-1 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="bg-[#1DB954]/5 border border-[#1DB954]/10 rounded-3xl p-6 relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <Coffee size={120} />
                  </div>
                  <div className="text-sm leading-relaxed font-medium whitespace-pre-wrap text-right text-[#D1FAE5]/90">
                    {coachResponse}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MindPage;
