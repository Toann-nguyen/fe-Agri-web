'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { z } from 'zod';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useLogin } from '@/features/auth/api/login';
import { AuthBackground } from '@/features/auth/components/auth-background';
import { Link, useRouter } from '@/i18n/navigation';

import '@/features/auth/auth.css';

const DEMO_ACCOUNT = {
  identifier: 'student_edu_ai',
  password: 'EduAI2026@Pass',
};

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL_ADDRESS ?? 'nguyenminhtoan2712py@gmail.com';

export default function EduAiLoginPage() {
  const t = useTranslations('edu');
  const router = useRouter();

  const eduLoginSchema = z.object({
    identifier: z.string().min(1, t('validation.identifierRequired')),
    password: z.string().min(5, t('validation.passwordMin')),
  });

  type EduLoginInput = z.infer<typeof eduLoginSchema>;

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const login = useLogin({
    onSuccess: () => {
      // Edu portal login → Edu dashboard (i18n router adds locale prefix,
      // e.g. /en/edu/dashboard for en, /edu/dashboard for default vi)
      router.replace(paths.edu.dashboard.getHref());
      setNotification({
        type: 'success',
        message: t('successLogin'),
      });
    },
    onError: (error: any) => {
      setNotification({
        type: 'error',
        message: error?.message ?? t('loginFailed'),
      });
    },
  });

  const handleLogin = (values: EduLoginInput) => {
    setNotification({
      type: 'info',
      message: t('authenticating'),
    });
    login.mutate({
      email: values.identifier,
      password: values.password,
    });
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setNotification({
      type: 'info',
      message: t('googleConnecting'),
    });

    setTimeout(() => {
      setIsGoogleLoading(false);
      setNotification({
        type: 'success',
        message: t('googleSuccess'),
      });
    }, 1500);
  };

  const handleFillDemo = (setValue: (name: any, value: string) => void) => {
    setValue('identifier', DEMO_ACCOUNT.identifier);
    setValue('password', DEMO_ACCOUNT.password);
    setNotification({
      type: 'info',
      message: t('demoFilled'),
    });
  };

  const inputClass = 'ax-input w-full py-2.5 pl-10 pr-4 text-sm';

  return (
    <main className="auth-editorial relative min-h-screen w-full overflow-hidden font-sans selection:bg-[color:var(--ax-accent)] selection:text-[color:var(--ax-paper)]">
      <AuthBackground />

      {/* Top Header Navigation */}
      <header className="relative z-10 flex items-center justify-between border-b border-[color:var(--ax-rule)] px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs font-medium text-[color:var(--ax-ink-soft)] transition-colors hover:text-[color:var(--ax-accent)]"
        >
          <Icon
            icon="mdi:arrow-left"
            width="16"
            className="transition-transform group-hover:-translate-x-1"
          />
          {t('backToPortfolio')}
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 border border-[color:var(--ax-rule)] px-3 py-1.5 font-mono text-xs text-[color:var(--ax-ink-soft)] sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[color:var(--ax-accent)] opacity-60"></span>
              <span className="relative inline-flex size-2 rounded-full bg-[color:var(--ax-accent)]"></span>
            </span>
            <Icon icon="mdi:web" width="14" />
            <span>{t('domain')}</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Container */}
      <div className="relative z-10 flex min-h-[calc(100vh-73px)] items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Brand Logo & Title */}
          <div className="mb-8 text-center">
            <div className="inline-flex size-16 items-center justify-center border border-[color:var(--ax-rule-strong)] bg-[color:var(--ax-paper-2)] p-3">
              <Icon
                icon="mdi:school"
                width="30"
                className="text-[color:var(--ax-accent)]"
              />
            </div>

            <h1 className="ax-serif mt-5 text-4xl leading-[1.1] sm:text-[2.6rem]">
              {t('brand')}
            </h1>
            <p className="mt-2.5 text-sm text-[color:var(--ax-ink-soft)]">
              {t('subtitle')}
            </p>
          </div>

          {/* Form Card Container */}
          <div className="ax-card relative overflow-hidden p-6 sm:p-8">
            {/* Top Subdomain Badge in Card */}
            <div className="mb-6 flex items-center justify-between border border-[color:var(--ax-rule)] px-3 py-2.5 font-mono text-[11px] text-[color:var(--ax-ink-soft)]">
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:shield-check-outline"
                  width="16"
                  className="text-[color:var(--ax-accent)]"
                />
                <span>{t('sslBadge')}</span>
              </div>
              <span className="font-semibold text-[color:var(--ax-accent)]">
                {t('domain')}
              </span>
            </div>

            {/* Notification Alert */}
            {notification && (
              <div
                className={`mb-6 flex items-start gap-3 border p-3.5 text-xs font-medium transition-all ${
                  notification.type === 'success'
                    ? 'border-emerald-500/35 bg-emerald-500/[0.07] text-emerald-700 dark:text-emerald-300'
                    : notification.type === 'error'
                      ? 'border-red-500/35 bg-red-500/[0.07] text-red-700 dark:text-red-300'
                      : 'border-[color:var(--ax-rule)] bg-[color:var(--ax-paper)] text-[color:var(--ax-ink-soft)]'
                }`}
              >
                <Icon
                  icon={
                    notification.type === 'success'
                      ? 'mdi:check-circle'
                      : notification.type === 'error'
                        ? 'mdi:alert-circle'
                        : 'mdi:information'
                  }
                  width="18"
                  className="mt-0.5 shrink-0"
                />
                <div className="flex-1">{notification.message}</div>
              </div>
            )}

            {/* Google Social Login Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading || login.isPending}
                className="group relative flex w-full items-center justify-center gap-3 border border-[color:var(--ax-rule-strong)] px-4 py-3 text-sm font-semibold transition-all duration-300 hover:border-[color:var(--ax-ink)] active:scale-[0.99] disabled:opacity-50"
              >
                {isGoogleLoading ? (
                  <Icon
                    icon="mdi:loading"
                    width="20"
                    className="animate-spin text-[color:var(--ax-accent)]"
                  />
                ) : (
                  <Icon icon="logos:google-icon" width="20" />
                )}
                <span>{t('googleButton')}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[color:var(--ax-rule)]"></div>
              </div>
              <span className="relative bg-[color:var(--ax-paper-2)] px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ax-ink-soft)]">
                {t('divider')}
              </span>
            </div>

            {/* Traditional Credentials Form */}
            <Form onSubmit={handleLogin} schema={eduLoginSchema}>
              {({ register, setValue, formState }) => (
                <div className="space-y-4">
                  {/* Username Input */}
                  <div>
                    <label
                      htmlFor="identifier"
                      className="mb-1.5 block font-mono text-xs font-medium text-[color:var(--ax-ink-soft)]"
                    >
                      {t('identifierLabel')}
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[color:var(--ax-ink-faint)]">
                        <Icon icon="mdi:account-outline" width="18" />
                      </div>
                      <input
                        id="identifier"
                        type="text"
                        placeholder={t('identifierPlaceholder')}
                        {...register('identifier')}
                        className={inputClass}
                      />
                    </div>
                    {formState.errors['identifier'] && (
                      <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                        {formState.errors['identifier'].message}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="font-mono text-xs font-medium text-[color:var(--ax-ink-soft)]"
                      >
                        {t('passwordLabel')}
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setNotification({
                            type: 'info',
                            message: t('forgotPasswordHint', {
                              email: ADMIN_EMAIL,
                            }),
                          });
                        }}
                        className="font-mono text-xs text-[color:var(--ax-accent)] transition-colors hover:underline"
                      >
                        {t('forgotPassword')}
                      </button>
                    </div>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[color:var(--ax-ink-faint)]">
                        <Icon icon="mdi:lock-outline" width="18" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••••••"
                        {...register('password')}
                        className={`${inputClass} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[color:var(--ax-ink-faint)] hover:text-[color:var(--ax-ink)]"
                      >
                        <Icon
                          icon={
                            showPassword
                              ? 'mdi:eye-off-outline'
                              : 'mdi:eye-outline'
                          }
                          width="18"
                        />
                      </button>
                    </div>
                    {formState.errors['password'] && (
                      <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                        {formState.errors['password'].message}
                      </p>
                    )}
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="size-4 accent-[var(--ax-accent)]"
                      />
                      <span className="text-xs text-[color:var(--ax-ink-soft)]">
                        {t('rememberMe')}
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleFillDemo(setValue)}
                      className="font-mono text-[11px] text-[color:var(--ax-accent)] hover:underline"
                    >
                      {t('fillDemo')}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    isLoading={login.isPending || formState.isSubmitting}
                    disabled={
                      login.isPending ||
                      isGoogleLoading ||
                      formState.isSubmitting
                    }
                    className="group ax-btn mt-2"
                  >
                    {!(login.isPending || formState.isSubmitting) && (
                      <>
                        <span>{t('submit')}</span>
                        <Icon
                          icon="mdi:arrow-right"
                          width="18"
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Form>

            {/* Footer Sign up Link */}
            <div className="mt-7 text-center text-xs text-[color:var(--ax-ink-soft)]">
              {t('noAccount')}{' '}
              <Link
                href={paths.auth.register.getHref()}
                className="font-semibold text-[color:var(--ax-accent)] hover:underline"
              >
                {t('signUp')}
              </Link>
            </div>
          </div>

          {/* Feature Badges below card */}
          <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-[color:var(--ax-rule)] bg-[color:var(--ax-rule)]">
            <div className="bg-[color:var(--ax-paper)] p-3 text-center">
              <Icon
                icon="mdi:robot"
                width="20"
                className="mx-auto mb-1.5 text-[color:var(--ax-accent)]"
              />
              <div className="text-[10px] font-medium text-[color:var(--ax-ink-soft)]">
                {t('badgeTutor')}
              </div>
            </div>
            <div className="bg-[color:var(--ax-paper)] p-3 text-center">
              <Icon
                icon="mdi:chart-timeline-variant"
                width="20"
                className="mx-auto mb-1.5 text-[color:var(--ax-accent)]"
              />
              <div className="text-[10px] font-medium text-[color:var(--ax-ink-soft)]">
                {t('badgeRoadmap')}
              </div>
            </div>
            <div className="bg-[color:var(--ax-paper)] p-3 text-center">
              <Icon
                icon="mdi:certificate"
                width="20"
                className="mx-auto mb-1.5 text-[color:var(--ax-accent)]"
              />
              <div className="text-[10px] font-medium text-[color:var(--ax-ink-soft)]">
                {t('badgeGrading')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
