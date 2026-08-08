export type ActiveTab =
  | 'home'
  | 'grades'
  | 'achievements'
  | 'contact_book'
  | 'schedule'
  | 'profile'
  | 'settings';

export interface NotificationItem {
  id: string;
  sender: string;
  role: 'GVCN' | 'GVBM' | 'NhaTruong';
  title: string;
  content: string;
  time: string;
  read: boolean;
}

export interface GradeSubject {
  id: string;
  name: string;
  code: string;
  icon: string;
  score15m: number[];
  score1Period: number[];
  midTerm: number;
  finalTerm?: number;
  avgScore: number;
  teacherComment: string;
  trend: 'up' | 'down' | 'stable';
  warning?: boolean;
}

export interface ScheduleItem {
  id: string;
  title: string;
  subject: string;
  type: 'test' | 'assignment' | 'event';
  dueDate: string;
  timeLeft: string;
  urgent: boolean;
}

export interface AiChatMessage {
  role: 'user' | 'ai';
  text: string;
  time: string;
}
