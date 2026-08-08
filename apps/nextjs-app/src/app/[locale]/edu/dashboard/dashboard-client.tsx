'use client';

import { useState } from 'react';

import { AiAssistantModal } from './_components/layout/ai-assistant-modal';
import { Sidebar } from './_components/layout/sidebar';
import { TopBar } from './_components/layout/top-bar';
import { AchievementsTab } from './_components/pages/achievements-tab';
import { ContactBookTab } from './_components/pages/contact-book-tab';
import { GradesTab } from './_components/pages/grades-tab';
import { HomeTab } from './_components/pages/home-tab';
import { ProfileTab } from './_components/pages/profile-tab';
import { ScheduleTab } from './_components/pages/schedule-tab';
import { SettingsTab } from './_components/pages/settings-tab';
import { notifications as seedNotifications } from './data';
import { ActiveTab, AiChatMessage } from './types';

export default function EduDashboardClient() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [notifications, setNotifications] = useState(seedNotifications);
  const [aiChatHistory, setAiChatHistory] = useState<AiChatMessage[]>([
    {
      role: 'ai',
      text: 'Xin chào Nguyễn Văn An! Em là Trợ lý Gia Sư AI Edu-VN. Em cần giúp đỡ giải đáp thắc mắc môn học nào hay cần lập kế hoạch ôn tập hôm nay?',
      time: '08:30 AM',
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    const userText = aiQuestion.trim();
    const nowTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setAiChatHistory((prev) => [
      ...prev,
      { role: 'user', text: userText, time: nowTime },
    ]);
    setAiQuestion('');
    setIsAiThinking(true);

    setTimeout(() => {
      let aiReply = `Cảm ơn em đã hỏi! Đối với thắc mắc "${userText}", AI trợ lý Edu-VN gợi ý em tập trung xem lại định lý trọng tâm và làm thử 3 bài tập trắc nghiệm tự luyện trong ứng dụng. Em có muốn thầy đưa ra lời giải từng bước không?`;

      if (
        userText.toLowerCase().includes('toán') ||
        userText.toLowerCase().includes('phương trình')
      ) {
        aiReply = `Về bài Toán phương trình: Phương pháp chung là chuyển vế đổi dấu: $ax + b = 0 \\Rightarrow x = -b/a$. Thầy đã chuẩn bị sẵn 5 dạng bài tập có lời giải chi tiết cho em ôn thi kiểm tra 1 tiết sắp tới!`;
      } else if (
        userText.toLowerCase().includes('sử') ||
        userText.toLowerCase().includes('lịch sử')
      ) {
        aiReply = `Đối với môn Lịch Sử (môn em đang cần cải thiện): Thầy đề xuất sử dụng sơ đồ tư duy sự kiện chương 3. Gắn mốc thời gian với hình ảnh giúp em ghi nhớ lâu hơn!`;
      } else if (
        userText.toLowerCase().includes('anh') ||
        userText.toLowerCase().includes('english')
      ) {
        aiReply = `Về môn Tiếng Anh: Em đạt 9.0 điểm giữa kỳ rất xuất sắc! Để nâng điểm trung bình lên 9.5+, em hãy ôn lại 15 từ vựng mới Unit 8 chủ đề "Smart Technology" trong phần Flashcards AI.`;
      }

      setAiChatHistory((prev) => [
        ...prev,
        {
          role: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setIsAiThinking(false);
    }, 1000);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeTab
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAllRead={handleMarkAllRead}
            onMarkAsRead={handleMarkAsRead}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onNavigateTo={(tab) => setActiveTab(tab)}
          />
        );
      case 'grades':
        return <GradesTab />;
      case 'achievements':
        return <AchievementsTab />;
      case 'contact_book':
        return (
          <ContactBookTab
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
          />
        );
      case 'schedule':
        return <ScheduleTab />;
      case 'profile':
        return <ProfileTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Background elements */}
      <div className="dot-grid-dark pointer-events-none fixed inset-0 opacity-20"></div>
      <div className="pointer-events-none fixed -left-40 -top-40 size-[500px] rounded-full bg-cyan-500/10 blur-[150px]"></div>
      <div className="pointer-events-none fixed -bottom-40 -right-40 size-[500px] rounded-full bg-ember-500/10 blur-[150px]"></div>

      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadCount={unreadCount}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        onOpenNotifications={() => setActiveTab('contact_book')}
      />

      {/* MAIN LAYOUT (SIDEBAR + CONTENT) */}
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unreadCount={unreadCount}
          onOpenAiAssistant={() => setIsAiModalOpen(true)}
        />

        <main className="mx-auto max-w-7xl flex-1 space-y-6 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {renderTab()}
        </main>
      </div>

      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        chatHistory={aiChatHistory}
        isThinking={isAiThinking}
        question={aiQuestion}
        onQuestionChange={setAiQuestion}
        onSend={handleSendAiMessage}
      />
    </div>
  );
}
