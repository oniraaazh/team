
export enum HealthStatus {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  CRITICAL = 'critical'
}

export enum InfluenceCircle {
  CORE = 'core',
  GROWTH = 'growth',
  DANGER = 'danger'
}

export enum MentalState {
  STRONG = 'strong',
  DISTRACTED = 'distracted',
  WEAK = 'weak'
}

export interface TeamMember {
  id: string;
  name: string;
  rank: string;
  circle: InfluenceCircle;
  commitment: number;
  mentalState: string;
  psychologicalStatus: 'focused' | 'tired' | 'at_risk';
  lastContact: string;
}

export interface HonestyLogEntry {
  id: string;
  executed: string[];
  escaped: string[];
  date: string;
}

// Added Scenario interface to fix import error in constants.ts
export interface Scenario {
  id: string;
  title: string;
  description: string;
  options: {
    id: string;
    text: string;
    impact: string;
  }[];
}

export interface LeadershipStage {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  progress: number;
  tasks: {
    id: string;
    text: string;
    completed: boolean;
    type: 'behavioral' | 'strategic' | 'human';
  }[];
}

export interface UserState {
  mentalState: MentalState;
  teamHealth: number;
  leadershipPoints: number;
  rank: string;
  identityStatement: string;
  teamMessage: string;
}