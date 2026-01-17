
import { HealthStatus, InfluenceCircle, TeamMember, Scenario, LeadershipStage } from './types';

export const COLORS = {
  primary: '#1DB954',
  background: '#040907',
  card: 'rgba(10, 20, 15, 0.7)',
  text: '#D1FAE5',
  danger: '#ef4444',
  warning: '#eab308',
  success: '#1DB954',
};

export const MOCK_TEAM: TeamMember[] = [
  { id: '1', name: 'عوض الكريم', rank: 'قائد ركاز', circle: InfluenceCircle.CORE, commitment: 98, mentalState: 'زول فاهم ومركز', psychologicalStatus: 'focused', lastContact: 'قبل ساعتين' },
  { id: '2', name: 'مدثر عثمان', rank: 'عضو هميم', circle: InfluenceCircle.GROWTH, commitment: 78, mentalState: 'محتاج تقوية خاطر', psychologicalStatus: 'tired', lastContact: 'من أمس' },
  { id: '3', name: 'نفيسة أحمد', rank: 'عضو جديد', circle: InfluenceCircle.GROWTH, commitment: 85, mentalState: 'متحمسة شديد', psychologicalStatus: 'focused', lastContact: 'قبل 4 ساعات' },
  { id: '4', name: 'الطيب علي', rank: 'عضو غايب', circle: InfluenceCircle.DANGER, commitment: 25, mentalState: 'نفسه قايمة (مضغوط)', psychologicalStatus: 'at_risk', lastContact: 'من 5 يوم' },
];

export const LEADERSHIP_STAGES: LeadershipStage[] = [
  {
    id: 's1',
    name: 'Self Mastery',
    arabicName: 'قيادة النفس (الركوز)',
    description: 'الأساس هو إنك تسيطر على نفسك وتضبط روتينك قبل ما تطلب من الناس شي.',
    progress: 80,
    tasks: [
      { id: 't1', text: 'روتين الفجر والتركيز', completed: true, type: 'behavioral' },
      { id: 't2', text: 'قراءة في الحكمة والقيادة', completed: true, type: 'human' },
      { id: 't3', text: 'سجل الصدق (بينك وبين نفسك)', completed: false, type: 'behavioral' },
    ],
  },
  {
    id: 's2',
    name: 'Understanding People',
    arabicName: 'فراسة الناس',
    description: 'تفهم مفاتيح الشخصية السودانية وكيف تحفز كل زول حسب طبعه.',
    progress: 45,
    tasks: [
      { id: 't4', text: 'جلسة "جبنة" وشورى مع الفريق', completed: true, type: 'human' },
      { id: 't5', text: 'تطييب خاطر لعضو زعلان', completed: false, type: 'human' },
    ],
  },
  {
    id: 's3',
    name: 'Team Nucleus',
    arabicName: 'بناء الحواريين (النواة)',
    description: 'تجهيز قادة يشيوا معاك الحمل ويكونوا ركائز في الفريق.',
    progress: 15,
    tasks: [
      { id: 't6', text: 'اختيار 3 ركائز للفريق', completed: false, type: 'strategic' },
    ],
  },
];

export const DAILY_SCENARIO: Scenario = {
  id: 'scen1',
  title: 'زول غالي غاب',
  description: 'واحد من الأعضاء الهميمين والقدام، فجأة بقى ما بظهر في "اللّمة" اليومية وتلفونه مشغول دايماً. تتصرف كيف يا ريس؟',
  options: [
    { id: 'opt1', text: 'تضرب ليهو "مسكال" وتزوره في البيت طوالي.', impact: 'الواجب السوداني الأصيل، بجدد المحبة.' },
    { id: 'opt2', text: 'ترسل ليهو زول "بيني وبينو" يجس النبض.', impact: 'حكمة وفراسة، عشان ما تضغط عليهو.' },
    { id: 'opt3', text: 'تخليهو في حالو لغاية ما يروق ويجي براهو.', impact: 'فيها مخاطرة، ممكن يحس إنك ما شغال بيهو.' },
  ],
};
