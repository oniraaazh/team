
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeadershipContext } from '../App';
import { MentalState } from '../types';
// Added Activity to resolve "Cannot find name 'Activity'" error
import { Zap, MessageCircle, Brain, Target, Shield, AlertCircle, ArrowLeft, Coffee, Sunrise, Sparkles, Award, Activity } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(LeadershipContext);

  if (!context) return null;

  const { mentalState, setMentalState, teamHealth, notify, points } = context;

  const handleMentalChange = (state: MentalState) => {
    setMentalState(state);
    let msg = '';
    switch(state) {
      case MentalState.STRONG : msg = 'أركز يا ريس، فهمك عالي الليلة!'; break;
      case MentalState.DISTRACTED: msg = 'يا زول أثبت، التشتت بضيع المجهود.'; break;
      case MentalState.WEAK: msg = 'خطر: طاقتك نازلة، أخد ليك "جبنة" وروق بالك.'; break;
    }
    notify(msg, state === MentalState.STRONG ? 'success' : state === MentalState.DISTRACTED ? 'info' : 'error');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 page-enter">
      
      {/* Vision Banner */}
      <section className="bento-card overflow-hidden h-80 relative group border-none shadow-2xl">
        <div className="img-container w-full h-full">
          <img 
            src="input_file_1.png" 
            alt="Success Celebration" 
            className="opacity-60 group-hover:scale-105 transition-all duration-1000 block" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#040907] via-black/30 to-transparent flex flex-col justify-end p-12 text-right">
          <div className="flex items-center gap-3 mb-3 justify-end">
            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#1DB954]">رؤية القمة</span>
            <Sparkles className="text-[#1DB954]" size={22} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-shiny leading-tight max-w-2xl ml-auto">القيادة هي صناعة اللحظات التي لا تُنسى في حياة الناس.</h2>
        </div>
      </section>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'الهيبة التراكمية', val: points, icon: <Sparkles size={16}/>, color: 'text-[#1DB954]' },
          { label: 'صحة الفريق', val: `${Math.round(teamHealth)}%`, icon: <Activity size={16}/>, color: 'text-blue-400' },
          { label: 'الرتبة الحالية', val: 'REKAZ', icon: <Award size={16}/>, color: 'text-purple-400' },
          { label: 'المهام العالقة', val: '3', icon: <Target size={16}/>, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="bento-card p-6 flex flex-col items-center justify-center text-center space-y-2 border-white/5">
            <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">{stat.label}</p>
            <p className="text-lg font-black">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Mental State Selector */}
      <section className="bento-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-white/5 bg-gradient-to-l from-[#1DB954]/10 to-transparent">
        <div className="text-right">
          <h3 className="text-2xl font-black mb-1">بوصلة التركيز</h3>
          <p className="text-sm opacity-60 font-medium">حالتك الذهنية هي اللي بتحدد جودة قراراتك الليلة مع الناس.</p>
        </div>
        <div className="flex p-1.5 bg-black/40 rounded-[2rem] border border-white/10 shadow-inner">
          <button 
            onClick={() => handleMentalChange(MentalState.STRONG)}
            className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${mentalState === MentalState.STRONG ? 'bg-[#1DB954] text-black shadow-xl scale-105' : 'text-[#D1FAE5]/30 hover:text-[#D1FAE5]/60'}`}
          >
            راكز
          </button>
          <button 
            onClick={() => handleMentalChange(MentalState.DISTRACTED)}
            className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${mentalState === MentalState.DISTRACTED ? 'bg-yellow-600/80 text-black shadow-xl scale-105' : 'text-[#D1FAE5]/30 hover:text-[#D1FAE5]/60'}`}
          >
            مشوش
          </button>
          <button 
            onClick={() => handleMentalChange(MentalState.WEAK) }
            className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${mentalState === MentalState.WEAK ? 'bg-red-600/80 text-black shadow-xl scale-105' : 'text-[#D1FAE5]/30 hover:text-[#D1FAE5]/60'}`}
          >
            تعبان
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Suggested Action */}
        <div className="bento-card p-10 flex flex-col border-white/5 group">
          <div className="flex items-center justify-between mb-8 flex-row-reverse">
            <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954] shadow-lg">
              <Coffee size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 px-4 py-2 rounded-full border border-white/10">واجب القائد</span>
          </div>
          <div className="flex items-center gap-5 mb-8 flex-row-reverse">
            <div className="w-16 h-16 rounded-full bg-[#1DB954]/10 flex items-center justify-center overflow-hidden border-2 border-[#1DB954]/30 shadow-2xl emerald-glow">
              <span className="text-2xl font-black text-[#1DB954]">ط</span>
            </div>
            <div className="text-right">
              <h4 className="font-black text-2xl">الطيب علي</h4>
              <p className="text-xs text-[#1DB954] font-bold mt-1 uppercase tracking-widest italic">الحالة: خطر انسحاب</p>
            </div>
          </div>
          <p className="text-base opacity-70 leading-relaxed mb-10 text-right font-medium italic">
            "الطيب ما ظهر في اللّمة من 3 يوم. أضرب ليهو مسكال طمنو واسأل من أهله، ما تسأله من الشغل. القلوب بتنجبر بالكلمة الطيبة."
          </p>
          <button 
            onClick={() => {
              notify('جاري الانتقال لدوائر العلاقات للتدخل السلوكي', 'info');
              navigate('/people');
            }}
            className="mt-auto w-full py-5 bg-[#1DB954] text-black font-black rounded-3xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#1DB954]/20"
          >
            <span className="text-lg">أقوم بالواجب</span>
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Leadership Decision */}
        <div className="bento-card p-10 flex flex-col border-white/5">
          <div className="flex items-center justify-between mb-8 flex-row-reverse">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 shadow-lg">
              <Sunrise size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 px-4 py-2 rounded-full border border-white/10">موقف استراتيجي</span>
          </div>
          <h4 className="text-2xl font-black mb-4 text-right">خلاف في "النواة"</h4>
          <p className="text-base opacity-70 leading-relaxed mb-10 text-right font-medium">
            واحد من الركائز الأساسية بقى يتكلم كلام سلبي قدام الضيوف الجدد. السكات بمشي الشغل غلط، والشدة بتكسر تماسك الفريق. حتعمل شنو يا ريس؟
          </p>
          <button 
            onClick={() => {
              notify('سيتم توجيهك لمختبر الفهم لاتخاذ قرارك', 'info');
              navigate('/mind');
            }}
            className="mt-auto w-full py-5 bg-white/5 border border-white/10 text-[#D1FAE5] font-black rounded-3xl hover:bg-white/10 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>اتخاذ القرار الحكيم</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
