
import React, { useState, useContext, useMemo } from 'react';
import { Users, Info, MessageCircle, AlertTriangle, Shield, Search, X } from 'lucide-react';
import { MOCK_TEAM } from '../constants';
import { InfluenceCircle, TeamMember } from '../types';
import { LeadershipContext } from '../App';

const RadarMember: React.FC<{ member: TeamMember, index: number }> = ({ member, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(LeadershipContext);

  const getStyle = (circle: InfluenceCircle) => {
    switch(circle) {
      case InfluenceCircle.CORE: return { color: '#1DB954', bg: 'bg-[#1DB954]/10', border: 'border-[#1DB954]/30' };
      case InfluenceCircle.GROWTH: return { color: '#3b82f6', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
      case InfluenceCircle.DANGER: return { color: '#ef4444', bg: 'bg-red-500/10', border: 'border-red-500/30' };
    }
  };

  const { color, bg, border } = getStyle(member.circle);

  const handleIntervention = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (context) {
      context.notify(`بدأت عملية التدخل السلوكي مع ${member.name}`, 'success');
      context.addPoints(100);
      context.setTeamHealth(h => Math.min(100, h + 1));
      setIsOpen(false);
    }
  };

  return (
    <div className="relative group">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full border-2 ${border} ${bg} flex items-center justify-center cursor-pointer transition-all hover:scale-125 hover:shadow-xl hover:shadow-${color}/20 z-10 relative overflow-hidden`}
      >
        <span className="font-black text-[10px]" style={{ color }}>{member.name.split(' ').map(n => n[0]).join('')}</span>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      {isOpen && (
        <div className="absolute z-[100] bottom-16 right-1/2 translate-x-1/2 w-72 bg-[#1a1a1a] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl p-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4 flex-row-reverse">
            <h4 className="font-black text-white text-lg">{member.name}</h4>
            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={16}/></button>
          </div>
          <div className="bg-white/5 rounded-2xl p-5 mb-5 border border-white/5 space-y-3">
            <div className="flex justify-between text-xs flex-row-reverse">
              <span className="text-gray-500 font-bold uppercase tracking-widest">الرتبة</span>
              <span className="text-white font-black">{member.rank}</span>
            </div>
            <div className="flex justify-between text-xs flex-row-reverse">
              <span className="text-gray-500 font-bold uppercase tracking-widest">الالتزام</span>
              <span className="text-[#1DB954] font-black">{member.commitment}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#1DB954] transition-all duration-1000" style={{ width: `${member.commitment}%` }} />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-medium">آخر نشاط: {member.lastContact}</span>
            </div>
          </div>
          <button 
            onClick={handleIntervention}
            className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm flex items-center justify-center space-x-2 space-x-reverse hover:bg-[#1DB954] hover:text-white transition-all shadow-lg"
          >
            <MessageCircle size={18} />
            <span>بدء تدخل سلوكي</span>
          </button>
        </div>
      )}
    </div>
  );
};

const PeoplePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const context = useContext(LeadershipContext);

  const filteredTeam = useMemo(() => {
    if (!searchTerm) return MOCK_TEAM;
    return MOCK_TEAM.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleCircleIntervention = () => {
    if (context) {
      context.notify('بدء جلسة مكاشفة جماعية لدائرة النمو', 'info');
      context.addPoints(50);
      context.setTeamHealth(h => Math.min(100, (typeof h === 'function' ? h(context.teamHealth) : h) + 2));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Radar Map Container */}
        <div className="lg:col-span-2 glass-card rounded-[3.5rem] p-10 flex flex-col items-center justify-center relative min-h-[700px] overflow-hidden">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#1DB954 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          <div className="absolute top-10 right-10 z-30 flex items-center space-x-3 space-x-reverse bg-white/5 px-5 py-3 rounded-full border border-white/10 backdrop-blur-xl group focus-within:border-[#1DB954]/50 transition-all">
            <Search size={18} className="text-gray-500 group-focus-within:text-[#1DB954] transition-colors" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن عضو في الخريطة..." 
              className="bg-transparent border-none focus:ring-0 text-sm text-white w-48 md:w-64 text-right font-medium" 
            />
            {searchTerm && <X size={16} className="text-gray-500 cursor-pointer hover:text-white" onClick={() => setSearchTerm('')} />}
          </div>

          {/* Radial Radar */}
          <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
            {/* Concentric Circles */}
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-[18%] rounded-full border border-white/5" />
            <div className="absolute inset-[36%] rounded-full border border-white/5" />
            <div className="absolute inset-[50%] rounded-full border border-[#1DB954]/20 bg-[#1DB954]/5 flex items-center justify-center shadow-[inset_0_0_50px_rgba(29,185,84,0.05)]">
              <div className="flex flex-col items-center text-[#1DB954]/30 animate-pulse">
                <Shield size={56} />
                <span className="text-[11px] font-black tracking-[0.3em] mt-3 uppercase">Nucleus</span>
              </div>
            </div>

            {/* Radar Sweep Animation */}
            <div className="absolute inset-0 rounded-full border-l-4 border-[#1DB954]/30 animate-spin pointer-events-none" style={{ animationDuration: '6s', filter: 'blur(1px)' }} />

            {/* Member Positioning */}
            {filteredTeam.map((member, i) => {
              // Deterministic but scattered angles for members
              const angleOffset = (member.id.charCodeAt(0) * 10) % 360;
              const angle = (i * 360) / filteredTeam.length + angleOffset;
              const distance = member.circle === InfluenceCircle.DANGER ? 45 : member.circle === InfluenceCircle.GROWTH ? 30 : 15;
              const x = 50 + distance * Math.cos((angle * Math.PI) / 180);
              const y = 50 + distance * Math.sin((angle * Math.PI) / 180);

              return (
                <div 
                  key={member.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 animate-in zoom-in duration-500"
                  style={{ left: `${x}%`, top: `${y}%`, transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <RadarMember member={member} index={i} />
                </div>
              );
            })}
          </div>

          <div className="mt-20 flex justify-center space-x-12 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 rounded-full bg-[#1DB954] shadow-[0_0_10px_#1DB954]" />
              <span className="text-xs font-bold text-gray-400">النواة</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
              <span className="text-xs font-bold text-gray-400">النمو</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
              <span className="text-xs font-bold text-gray-400">الخطر</span>
            </div>
          </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className="space-y-8">
          <div className="glass-card rounded-[3rem] p-10 border-white/5">
            <h3 className="text-2xl font-black mb-8 flex items-center space-x-3 space-x-reverse">
              <Users className="text-[#1DB954]" size={28} />
              <span>تحليل الدوائر</span>
            </h3>
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-3xl border-r-8 border-[#1DB954] hover:bg-white/10 transition-all cursor-default">
                <p className="text-[10px] text-gray-500 font-black mb-1 uppercase tracking-[0.2em]">تغطية النواة</p>
                <p className="text-xl font-black text-white">ممتازة (80%)</p>
                <p className="text-[10px] text-[#1DB954] font-bold mt-2">مستقر سلوكياً</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border-r-8 border-red-500 hover:bg-white/10 transition-all cursor-default">
                <p className="text-[10px] text-gray-600 font-black mb-1 uppercase tracking-[0.2em]">معدل التهديد</p>
                <p className="text-xl font-black text-white">منخفض (12%)</p>
                <p className="text-[10px] text-red-500/50 font-bold mt-2">يتطلب مراقبة</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[3rem] p-10 border-[#1DB954]/10 bg-gradient-to-br from-[#1DB954]/5 to-transparent">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954]">
                <Shield size={20} />
              </div>
              <h3 className="text-xl font-black">اقتراح ذكي</h3>
            </div>
            <p className="text-gray-400 text-sm leading-loose mb-8 italic text-right font-medium">
              "لقد لاحظنا صمتاً في دائرة النمو خلال الـ 48 ساعة الماضية. نقترح عقد جلسة 'مكاشفة' غداً لزيادة الالتزام."
            </p>
            <button 
              onClick={handleCircleIntervention}
              className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-[#1DB954] hover:text-white transition-all shadow-xl shadow-black/40 flex items-center justify-center gap-2"
            >
              <Info size={18} />
              <span>جدولة الجلسة الآن</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
