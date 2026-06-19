import { Navigate, useSearchParams } from 'react-router';

import { paths } from '@/config/paths';

const SignUpRoute = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return <Navigate to={paths.auth.register.getHref(redirectTo)} replace />;
};

export default SignUpRoute;
