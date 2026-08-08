import { Metadata } from 'next';

import { VerifyEmailPageClient } from './verify-email-page-client';

export const metadata: Metadata = {
  title: 'Verify email',
  description: 'Verify your email address.',
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return <VerifyEmailPageClient />;
}
