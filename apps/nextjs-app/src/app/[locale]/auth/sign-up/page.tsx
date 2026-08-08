import { redirect } from 'next/navigation';

import { paths } from '@/config/paths';

type SignUpPageProps = {
  searchParams: { redirectTo?: string };
};

export default function SignUpPage({ searchParams }: SignUpPageProps) {
  redirect(paths.auth.register.getHref(searchParams.redirectTo));
}
