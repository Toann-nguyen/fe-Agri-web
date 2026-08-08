import { Metadata } from 'next';

import EduDashboardClient from './dashboard-client';

export const metadata: Metadata = {
  title: 'Edu-AI-VN | Trang chủ',
  description: 'Dashboard học tập Edu-AI-VN - AI-powered education platform.',
  robots: { index: false, follow: false },
};

export default function EduDashboardPage() {
  return <EduDashboardClient />;
}
