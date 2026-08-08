import { Metadata } from 'next';

import { ResetPasswordPageClient } from './reset-password-page-client';

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Set a new password for your account.',
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return <ResetPasswordPageClient />;
}
