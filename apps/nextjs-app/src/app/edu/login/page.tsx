import { Metadata } from 'next';

import EduAiLoginPage from './edu-login-client';

export const metadata: Metadata = {
  title: 'Edu-AI-VN | Sign in',
  description: 'Sign in to Edu-AI-VN - AI-powered education platform.',
  robots: { index: false, follow: false },
};

export default function EduLoginPage() {
  return <EduAiLoginPage />;
}
