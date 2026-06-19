import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout, useAuthPageMeta } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';
import { useTeams } from '@/features/teams/api/get-teams';

const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const [chooseTeam, setChooseTeam] = useState(false);
  const { title, description } = useAuthPageMeta();

  const teamsQuery = useTeams({
    queryConfig: {
      enabled: chooseTeam,
    },
  });

  return (
    <AuthLayout title={title} description={description}>
      <RegisterForm
        onSuccess={() => {
          navigate(`${redirectTo ? `${redirectTo}` : paths.app.dashboard.getHref()}`, {
            replace: true,
          });
        }}
        chooseTeam={chooseTeam}
        setChooseTeam={() => setChooseTeam(!chooseTeam)}
        teams={teamsQuery.data?.data}
      />
    </AuthLayout>
  );
};

export default RegisterRoute;
