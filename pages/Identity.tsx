
import React, { useState, useContext } from 'react';
import { 
  Award, Fingerprint, Save, X, Edit3, Camera, Sparkles, Image as ImageIcon, 
  Loader2, Wand2, RefreshCw, Shield, Send 
} from 'lucide-react';
import { LeadershipContext } from '../App';
import { generateLeadershipVision } from '../services/geminiService';

const IdentityPage: React.FC = () => {
  const context = useContext(LeadershipContext);
  const [isEditingStatement, setIsEditingStatement] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [visionImage, setVisionImage] = useState<string | null>(() => localStorage.getItem('tl_vision_artifact'));
  
  if (!context) return null;
  const { identityStatement, setIdentityStatement, teamMessage, setTeamMessage, notify, addPoints } = context;
  
  const [tempStatement, setTempStatement] = useState(identityStatement);
  const [tempMessage, setTempMessage] = useState(teamMessage);

  const saveStatement = () => {
    setIdentityStatement(tempStatement);
    setIsEditingStatement(false);
    notify('تم تحديث ميثاق الركاز بنجاح', 'success');
  };

  const saveMessage = () => {
    setTeamMessage(tempMessage);
    setIsEditingMessage(false);
    notify('تم تحديث رسالة القوة', 'success');
  };

  const handleGenerateVision = async () => {
    setIsGenerating(true);
    notify('جاري استحضار "أيقونة الركاز" عبر الذكاء الاصطناعي...', 'info');

    try {
      // محاولة استخلاص الشعار كمرجع بصري (Base64)
      let base64Logo = "";
      try {
        const response = await fetch('input_file_4.png');
        const blob = await response.blob();
        base64Logo = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.warn("Could not fetch logo for reference.");
      }

      const imageUrl = await generateLeadershipVision(base64Logo || undefined);
      if (imageUrl) {
        setVisionImage(imageUrl);
        localStorage.setItem('tl_vision_artifact', imageUrl);
        addPoints(200);
        notify('اكتمل تجسيد أيقونة الركاز القيادية!', 'success');
      } else {
        notify('فشل التوليد، تأكد من إعدادات الـ API', 'error');
      }
    } catch (err) {
      notify('حدث خطأ في مصنع الرؤى الرقمي', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-32">
      {/* Header & Main Portrait */}
      <header className="flex flex-col items-center text-center space-y-8 animate-in fade-in duration-700">
        <div className="relative group">
          <div className="w-56 h-56 rounded-[4rem] img-container border-4 border-[#1DB954]/40 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700 emerald-glow bg-[#0a1410]">
            <img src="input_file_3.png" alt="Leader Portrait" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#1DB954] rounded-2xl flex items-center justify-center text-black shadow-2xl border-4 border-[#040907] z-10 animate-pulse">
            <Award size={32} />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-shiny">هوية القائد</h1>
          <p className="opacity-60 font-bold max-w-md mx-auto leading-relaxed">سمتك القيادي هو الركيزة التي يستند عليها فريقك في عز العواصف.</p>
        </div>
      </header>

      {/* AI Vision Artifact Section */}
      <section className="bento-card p-10 relative overflow-hidden bg-gradient-to-br from-[#06110d] to-black border-[#1DB954]/20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6 text-right order-2 md:order-1">
             <div className="flex items-center justify-end gap-3 text-[#1DB954]">
                <Wand2 size={24} />
                <h3 className="text-2xl font-black">أيقونة الركاز (AI Vision)</h3>
             </div>
             <p className="text-sm opacity-70 leading-relaxed font-medium">
               جسّد هويتك القيادية في "أيقونة" بصرية فريدة. سيقوم الذكاء الاصطناعي بتحويل روح فريقك إلى تحفة من الزمرد والأسود تعبر عن الثبات.
             </p>
             <button 
               onClick={handleGenerateVision}
               disabled={isGenerating}
               className="w-full md:w-auto px-8 py-4 bg-[#1DB954] text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#1DB954]/20 disabled:opacity-50"
             >
               {isGenerating ? <Loader2 className="animate-spin" size={20} /> : (visionImage ? <RefreshCw size={20} /> : <Sparkles size={20} />)}
               <span>{isGenerating ? 'جاري التجسيد...' : (visionImage ? 'إعادة توليد الرؤية' : 'توليد أيقونة الركاز')}</span>
             </button>
          </div>
          
          <div className="w-full md:w-72 h-72 rounded-[3.5rem] border-4 border-dashed border-[#1DB954]/20 flex items-center justify-center overflow-hidden bg-black/40 relative group order-1 md:order-2 shadow-inner">
             {visionImage ? (
               <img src={visionImage} alt="AI Vision Artifact" className="w-full h-full object-cover animate-in zoom-in duration-1000" />
             ) : (
               <div className="flex flex-col items-center opacity-20 group-hover:opacity-40 transition-opacity">
                  <ImageIcon size={64} strokeWidth={1} />
                  <span className="text-xs font-black uppercase mt-4 tracking-widest">في انتظار الرؤية</span>
               </div>
             )}
             {isGenerating && (
               <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto text-[#1DB954] animate-pulse" size={24} />
                  </div>
               </div>
             )}
          </div>
        </div>
      </section>

      {/* Portrait & Statement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bento-card p-1 h-[450px] overflow-hidden border-[#1DB954]/10 relative group bg-[#0a1410]">
          <img src="input_file_2.png" alt="Leadership Pose" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040907] via-transparent to-transparent flex flex-col justify-end p-10 text-right">
             <span className="text-xs font-black text-[#1DB954] uppercase tracking-widest mb-2">السمت السلوكي</span>
             <h3 className="text-3xl font-black text-white leading-tight">الثبات والركوز في <br/>عز العواصف</h3>
          </div>
        </section>

        <section className="bento-card p-10 flex flex-col justify-center text-center relative overflow-hidden">
          <Fingerprint size={150} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-[#1DB954]" />
          <div className="relative z-10 space-y-8">
             <div className="flex items-center justify-center gap-2 text-[#1DB954] opacity-50">
               <Shield size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">ميثاق الالتزام</span>
             </div>

             {isEditingStatement ? (
               <div className="space-y-4 animate-in fade-in duration-300">
                 <textarea 
                   value={tempStatement}
                   onChange={(e) => setTempStatement(e.target.value)}
                   className="w-full h-40 bg-white/5 border border-[#1DB954]/30 rounded-3xl p-6 text-xl font-bold text-center focus:ring-2 focus:ring-[#1DB954]/20 resize-none text-white outline-none"
                 />
                 <div className="flex justify-center gap-3">
                   <button onClick={saveStatement} className="flex items-center gap-2 bg-[#1DB954] px-8 py-3 rounded-2xl text-black font-black shadow-lg shadow-[#1DB954]/20 hover:scale-105 transition-all">
                     <Save size={18} /> حفظ التغيير
                   </button>
                   <button onClick={() => setIsEditingStatement(false)} className="px-8 py-3 rounded-2xl bg-white/5 text-gray-400 font-bold hover:bg-white/10 transition-all">
                     إلغاء
                   </button>
                 </div>
               </div>
             ) : (
               <>
                 <p className="text-3xl md:text-4xl font-black leading-tight italic text-shiny px-4">
                   "{identityStatement}"
                 </p>
                 <button 
                  onClick={() => setIsEditingStatement(true)}
                  className="mx-auto w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-gray-500 hover:text-[#1DB954] transition-all hover:bg-[#1DB954]/10"
                 >
                   <Edit3 size={20} />
                 </button>
               </>
             )}
          </div>
        </section>
      </div>

      {/* Gallery Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2 flex-row-reverse">
          <h3 className="text-2xl font-black flex items-center gap-3">
            <Camera size={28} className="text-[#1DB954]" />
            <span>سيرة الركاز البصرية</span>
          </h3>
          <span className="text-xs font-bold opacity-40 uppercase tracking-widest">محطات النجاح</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bento-card overflow-hidden h-72 group relative border-white/5 bg-[#0a1410]">
              <img src="input_file_0.png" alt="Team Building" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 text-right translate-y-2 group-hover:translate-y-0 transition-all">
                 <h4 className="font-black text-xl text-white">تخريج النواة</h4>
                 <p className="text-sm opacity-70 text-[#1DB954] font-bold">بناء قادة يحملون الرؤية بصدق</p>
              </div>
           </div>
           <div className="bento-card overflow-hidden h-72 group relative border-white/5 bg-[#0a1410]">
              <img src="input_file_1.png" alt="Ceremony" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 text-right translate-y-2 group-hover:translate-y-0 transition-all">
                 <h4 className="font-black text-xl text-white">لحظة الاحتفاء</h4>
                 <p className="text-sm opacity-70 text-[#1DB954] font-bold">عندما يكتمل العمل بالروح الجماعية والنجاح المشترك</p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bento-card p-10 flex flex-col items-center text-center space-y-6 border-white/5 bg-gradient-to-t from-blue-500/5 to-transparent">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/5">
            <Send size={28} />
          </div>
          <h3 className="text-xs font-black opacity-40 uppercase tracking-[0.3em]">رسالة القوة (Team Message)</h3>
          
          {isEditingMessage ? (
             <div className="space-y-4 w-full">
               <input 
                 value={tempMessage}
                 onChange={(e) => setTempMessage(e.target.value)}
                 className="w-full bg-white/5 border border-blue-500/30 rounded-2xl p-4 text-center font-black text-white text-xl outline-none"
               />
               <div className="flex justify-center gap-3">
                 <button onClick={saveMessage} className="p-3 bg-blue-500 rounded-xl text-white shadow-lg"><Save size={18} /></button>
                 <button onClick={() => setIsEditingMessage(false)} className="p-3 bg-white/5 rounded-xl text-gray-500"><X size={18} /></button>
               </div>
             </div>
          ) : (
            <>
              <p className="text-2xl font-black text-shiny italic">"{teamMessage}"</p>
              <button onClick={() => setIsEditingMessage(true)} className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                <Edit3 size={18} />
              </button>
            </>
          )}
        </div>

        <div className="bento-card p-10 flex flex-col items-center text-center space-y-6 bg-gradient-to-br from-[#1DB954]/5 to-transparent border-white/5">
          <div className="w-16 h-16 rounded-3xl bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954] shadow-xl shadow-[#1DB954]/5">
            <Award size={28} />
          </div>
          <h3 className="text-xs font-black opacity-40 uppercase tracking-[0.3em]">إرث السيرة الطيبة</h3>
          <div className="space-y-4 w-full text-right">
             <div className="flex justify-between items-center text-sm font-black border-b border-white/5 pb-3 flex-row-reverse">
                <span className="opacity-40">قادة تم تمكينهم</span>
                <span className="text-[#1DB954] text-lg">12</span>
             </div>
             <div className="flex justify-between items-center text-sm font-black border-b border-white/5 pb-3 flex-row-reverse">
                <span className="opacity-40">نزاعات حُلّت بالحكمة</span>
                <span className="text-[#1DB954] text-lg">45</span>
             </div>
             <div className="flex justify-between items-center text-sm font-black flex-row-reverse">
                <span className="opacity-40">أيام الصدق المستمر</span>
                <span className="text-[#1DB954] text-lg">89</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityPage;
