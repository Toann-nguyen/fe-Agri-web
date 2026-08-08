'use client';

import { Icon } from '@iconify/react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useLogin } from '@/features/auth/api/login';

const DEMO_ACCOUNT = {
  identifier: 'student_edu_ai',
  password: 'EduAI2026@Pass',
};

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL_ADDRESS ?? 'nguyenminhtoan2712py@gmail.com';

export default function EduAiLoginPage() {
  const t = useTranslations('edu');

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

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500';

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Background Dot Grid */}
      <div className="dot-grid-dark absolute inset-0 opacity-25"></div>

      {/* Glowing background gradient spheres */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[140px]"></div>
      <div className="pointer-events-none absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-ember-500/10 blur-[140px]"></div>

      {/* Top Header Navigation */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 bg-slate-900/60 px-6 py-4 backdrop-blur-md">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs font-medium text-slate-400 transition-colors hover:text-cyan-400"
        >
          <Icon
            icon="mdi:arrow-left"
            width="16"
            className="transition-transform group-hover:-translate-x-1"
          />
          {t('backToPortfolio')}
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-cyan-400"></span>
          </span>
          <Icon icon="mdi:web" width="14" />
          <span>{t('domain')}</span>
        </div>
      </header>

      {/* Main Container */}
      <div className="relative z-10 flex min-h-[calc(100vh-73px)] items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Brand Logo & Title */}
          <div className="mb-8 text-center">
            <div className="inline-flex size-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-ember-500/20 p-3 shadow-xl shadow-cyan-500/10 backdrop-blur-md">
              <Icon icon="mdi:school" width="32" className="text-cyan-400" />
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t('brand')}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{t('subtitle')}</p>
          </div>

          {/* Form Card Container */}
          <div className="glow-border glass-hero relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            {/* Top Subdomain Badge in Card */}
            <div className="mb-6 flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/80 p-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:shield-check-outline"
                  width="18"
                  className="text-emerald-400"
                />
                <span>{t('sslBadge')}</span>
              </div>
              <span className="font-semibold text-cyan-400">{t('domain')}</span>
            </div>

            {/* Notification Alert */}
            {notification && (
              <div
                className={`mb-6 flex items-start gap-3 rounded-xl border p-3.5 text-xs font-medium transition-all ${
                  notification.type === 'success'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : notification.type === 'error'
                      ? 'border-red-500/30 bg-red-500/10 text-red-300'
                      : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
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
                className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.99] disabled:opacity-50"
              >
                {isGoogleLoading ? (
                  <Icon
                    icon="mdi:loading"
                    width="20"
                    className="animate-spin text-cyan-400"
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
                <div className="w-full border-t border-white/10"></div>
              </div>
              <span className="relative bg-slate-900 px-3 font-mono text-[11px] uppercase tracking-wider text-slate-400">
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
                      className="mb-1.5 block font-mono text-xs font-medium text-slate-300"
                    >
                      {t('identifierLabel')}
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
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
                      <p className="mt-1.5 text-xs text-red-400">
                        {formState.errors['identifier'].message}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="font-mono text-xs font-medium text-slate-300"
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
                        className="font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
                      >
                        {t('forgotPassword')}
                      </button>
                    </div>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
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
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-200"
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
                      <p className="mt-1.5 text-xs text-red-400">
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
                        className="size-4 rounded border-white/20 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-950"
                      />
                      <span className="text-xs text-slate-300">
                        {t('rememberMe')}
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleFillDemo(setValue)}
                      className="font-mono text-[11px] text-amber-400 hover:text-amber-300 hover:underline"
                    >
                      {t('fillDemo')}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    isLoading={login.isPending}
                    disabled={login.isPending || isGoogleLoading}
                    className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 px-4 py-3 font-semibold !text-slate-950 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:opacity-95 hover:shadow-cyan-500/40 active:scale-[0.99]"
                  >
                    {!login.isPending && (
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
            <div className="mt-6 text-center text-xs text-slate-400">
              {t('noAccount')}{' '}
              <button
                onClick={() =>
                  setNotification({
                    type: 'info',
                    message: t('signUpHint'),
                  })
                }
                className="font-semibold text-cyan-400 hover:underline"
              >
                {t('signUp')}
              </button>
            </div>
          </div>

          {/* Feature Badges below card */}
          <div className="mt-8 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-white/5 bg-slate-900/40 p-2.5 backdrop-blur-sm">
              <Icon
                icon="mdi:robot"
                width="20"
                className="mx-auto mb-1 text-cyan-400"
              />
              <div className="text-[10px] font-medium text-slate-300">
                {t('badgeTutor')}
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-900/40 p-2.5 backdrop-blur-sm">
              <Icon
                icon="mdi:chart-timeline-variant"
                width="20"
                className="mx-auto mb-1 text-amber-400"
              />
              <div className="text-[10px] font-medium text-slate-300">
                {t('badgeRoadmap')}
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-900/40 p-2.5 backdrop-blur-sm">
              <Icon
                icon="mdi:certificate"
                width="20"
                className="mx-auto mb-1 text-emerald-400"
              />
              <div className="text-[10px] font-medium text-slate-300">
                {t('badgeGrading')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
