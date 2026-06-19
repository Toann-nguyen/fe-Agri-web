import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout, useAuthPageMeta } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const { title, description } = useAuthPageMeta();

  return (
    <AuthLayout title={title} description={description}>
      <LoginForm
        onSuccess={() => {
          navigate(`${redirectTo ? `${redirectTo}` : paths.app.dashboard.getHref()}`, {
            replace: true,
          });
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
