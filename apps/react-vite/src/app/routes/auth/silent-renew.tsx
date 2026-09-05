import * as React from 'react';

import { handleSilentCallback } from '@/lib/oidc';

const SilentRenewRoute = () => {
  React.useEffect(() => {
    handleSilentCallback().catch(() => {});
  }, []);
  return null;
};
export default SilentRenewRoute;
