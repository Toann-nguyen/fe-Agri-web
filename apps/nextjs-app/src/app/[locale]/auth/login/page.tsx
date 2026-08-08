import { Metadata } from 'next';

import { LoginPageClient } from './login-page-client';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your account.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
