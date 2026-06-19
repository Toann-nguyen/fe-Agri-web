import { AuthLayout, useAuthPageMeta } from '@/components/layouts/auth-layout';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';

const ForgotPasswordRoute = () => {
  const { title, description } = useAuthPageMeta();

  return (
    <AuthLayout title={title} description={description}>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordRoute;
