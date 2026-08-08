import { Metadata } from 'next';

import { RegisterPageClient } from './register-page-client';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Create a new account.',
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
