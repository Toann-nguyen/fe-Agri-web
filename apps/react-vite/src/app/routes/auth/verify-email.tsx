import { useSearchParams } from 'react-router';

import { AuthLayout, useAuthPageMeta } from '@/components/layouts/auth-layout';
import { VerifyEmailStatus } from '@/features/auth/components/verify-email-status';

const VerifyEmailRoute = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { title, description } = useAuthPageMeta();

  return (
    <AuthLayout title={title} description={description}>
      <VerifyEmailStatus token={token} />
    </AuthLayout>
  );
};

export default VerifyEmailRoute;
