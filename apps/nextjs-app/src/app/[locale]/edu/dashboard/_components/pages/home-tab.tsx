'use client';

import { NotificationItem } from '../../types';
import { AchievementsSection } from '../home/achievements-section';
import { AiInsightPanel } from '../home/ai-insight-panel';
import { GradesSummaryTable } from '../home/grades-summary-table';
import { HeroSection } from '../home/hero-section';
import { NotificationsSection } from '../home/notifications-section';
import { QuickStats } from '../home/quick-stats';
import { UpcomingTasksSection } from '../home/upcoming-tasks-section';

interface HomeTabProps {
  notifications: NotificationItem[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onMarkAsRead: (id: string) => void;
  onOpenAiAssistant: () => void;
  onNavigateTo: (
    tab: 'contact_book' | 'grades' | 'schedule' | 'achievements',
  ) => void;
}

export function HomeTab({
  notifications,
  unreadCount,
  onMarkAllRead,
  onMarkAsRead,
  onOpenAiAssistant,
  onNavigateTo,
}: HomeTabProps) {
  return (
    <div className="animate-fadeIn space-y-6">
      <HeroSection />

      {/* 2-Column Main Section: Quick Stats & AI Insight */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <QuickStats />
        </div>
        <div className="lg:col-span-7">
          <AiInsightPanel onOpenAiAssistant={onOpenAiAssistant} />
        </div>
      </div>

      {/* 2-Column Section: Sổ liên lạc & Lịch sắp tới */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NotificationsSection
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAllRead={onMarkAllRead}
          onMarkAsRead={onMarkAsRead}
          onViewAll={() => onNavigateTo('contact_book')}
        />
        <UpcomingTasksSection onViewSchedule={() => onNavigateTo('schedule')} />
      </div>

      {/* 2-Column Section: Bảng điểm tóm tắt & Thành tích nổi bật */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <GradesSummaryTable onViewGrades={() => onNavigateTo('grades')} />
        </div>
        <div className="lg:col-span-5">
          <AchievementsSection onViewAll={() => onNavigateTo('achievements')} />
        </div>
      </div>
    </div>
  );
}
