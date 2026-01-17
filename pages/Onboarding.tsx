
import React, { useState } from 'react';
import { Shield, ChevronRight, Check, Anchor, Sparkles } from 'lucide-react';

interface OnboardingPageProps {
  onComplete: () => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const nextStep = () => setStep(prev => prev + 1);

  const steps = [
    {
      title: "Welcome Leader",
      arabicTitle: "حبابك يا ريس في تيم ليدر",
      subtitle: "المنصة دي بنيناها عشان تطور فهمك القيادي وتبني فريق راكز وقوي.",
      content: (
        <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-[#1DB954]/20 border border-[#D1FAE5]/10 overflow-hidden relative">
            <img src="./input_file_4.png" alt="Leaders Team Logo" className="w-full h-full object-contain p-2 block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-black text-[#1DB954] flex items-center justify-center gap-3">
              <Sparkles /> ابني الناس، ما تبني أرقام
            </h1>
            <p className="text-[#D1FAE5]/70 max-w-sm font-medium leading-relaxed">نحن هنا ما بنحسب قروش، بنحسب رجالة وفراسة وتأثير في حياة الناس.</p>
          </div>
          <button 
            onClick={nextStep}
            className="w-full py-4 bg-[#1DB954] text-black rounded-2xl font-black text-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2 space-x-reverse shadow-xl shadow-[#1DB954]/20"
          >
            <span>أبشر بالخير | دخول</span>
            <ChevronRight size={20} />
          </button>
        </div>
      )
    },
    {
      title: "Define Your Mission",
      arabicTitle: "حدد هدفك السامي",
      subtitle: "ليه عايز تبني فريق؟ ده البحدد سمتك كقائد.",
      content: (
        <div className="space-y-4 animate-in slide-in-from-right duration-500">
          {[
            { id: 'impact', label: 'أثر طيب في حياة الناس', desc: 'تغيير حياة الفريق للأفضل.' },
            { id: 'freedom', label: 'استقلال وحرية مالية', desc: 'بناء سيستم يشتغل براهو.' },
            { id: 'influence', label: 'بناء هيبة وتأثير', desc: 'أكون مرجع وموجه للناس.' },
            { id: 'not_sure', label: 'لسه بفتش في طريقي', desc: 'خلي التجربة توجهني.' }
          ].map(opt => (
            <button 
              key={opt.id}
              onClick={() => {
                setAnswers({...answers, mission: opt.id});
                nextStep();
              }}
              className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-right hover:border-[#1DB954] hover:bg-[#1DB954]/10 transition-all group"
            >
              <h4 className="font-bold text-[#D1FAE5] group-hover:text-[#1DB954]">{opt.label}</h4>
              <p className="text-xs opacity-40 mt-1">{opt.desc}</p>
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Identity Confirmed",
      arabicTitle: "الركوز والسمت جاهز",
      subtitle: "أنت الآن جاهز عشان تقود ناسك بالحكمة.",
      content: (
        <div className="flex flex-col items-center space-y-8 animate-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-full bg-[#1DB954]/20 border border-[#1DB954] flex items-center justify-center text-[#1DB954]">
            <Check size={40} />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#1DB954]">سمت القائد اكتمل</h3>
            <p className="text-[#1DB954]/70 mt-2">دربك في بناء القادة بيبدأ من هنا.</p>
          </div>
          <button 
            onClick={onComplete}
            className="w-full py-4 bg-[#1DB954] text-black rounded-2xl font-black text-lg hover:brightness-110 transition-all shadow-xl shadow-[#1DB954]/20"
          >
            دخول الحوش | START
          </button>
        </div>
      )
    }
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="min-h-screen bg-[#040907] flex items-center justify-center p-6 text-[#D1FAE5]">
      <div className="max-w-md w-full space-y-8">
        {step > 1 && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-[#D1FAE5]">{currentStep.arabicTitle}</h2>
            <p className="text-[#D1FAE5]/60 text-sm">{currentStep.subtitle}</p>
          </div>
        )}
        
        {currentStep.content}

        <div className="flex justify-center space-x-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i + 1 === step ? 'w-8 bg-[#1DB954]' : 'w-2 bg-[#1DB954]/20'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
