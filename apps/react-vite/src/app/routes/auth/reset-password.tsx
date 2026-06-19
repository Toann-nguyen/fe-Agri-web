import { useSearchParams } from 'react-router';

import { AuthLayout, useAuthPageMeta } from '@/components/layouts/auth-layout';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

const ResetPasswordRoute = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const { title, description } = useAuthPageMeta();

  return (
    <AuthLayout title={title} description={description}>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
};

export default ResetPasswordRoute;
