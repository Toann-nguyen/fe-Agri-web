'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, CodeXml, Globe, Mail, Phone, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

import { GithubIcon, YoutubeIcon } from './icons';
import { Reveal, SectionHeading } from './reveal';

const socialIcons = {
  github: GithubIcon,
  globe: Globe,
  youtube: YoutubeIcon,
  leetcode: CodeXml,
  mail: Mail,
  phone: Phone,
} as const;

type Social = { label: string; href: string; icon: keyof typeof socialIcons };

const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/Toann-nguyen', icon: 'github' },
  { label: 'Website', href: 'https://toanrobert.online', icon: 'globe' },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@Toan-Robert',
    icon: 'youtube',
  },
  { label: 'LeetCode', href: 'https://leetcode.com', icon: 'leetcode' },
  {
    label: 'Email',
    href: 'mailto:nguyenminhtoan2712py@gmail.com',
    icon: 'mail',
  },
  { label: 'Phone', href: 'tel:0964748324', icon: 'phone' },
];

export const PortfolioContact = () => {
  const t = useTranslations('common');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-32"
    >
      <div
        className="absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#7c3aed]/15 blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow={t('portfolio.contact.eyebrow')}
          title={
            <>
              {t('portfolio.contact.titleA')}{' '}
              <span className="text-gradient">
                {t('portfolio.contact.titleB')}
              </span>
            </>
          }
          description={t('portfolio.contact.description')}
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info */}
          <Reveal>
            <div className="flex h-full flex-col gap-5">
              <motion.a
                href={`mailto:${t('portfolio.contact.email')}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group rounded-3xl bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] p-8 shadow-xl shadow-[#7c3aed]/30"
              >
                <Mail size={26} className="text-white/90" />
                <p className="mt-4 text-sm text-white/70">
                  {t('portfolio.contact.emailLabel')}
                </p>
                <p className="mt-1 break-all text-lg font-bold text-white md:text-xl">
                  {t('portfolio.contact.email')}
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/85">
                  {t('portfolio.contact.emailHint')}
                  <Send
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                  />
                </p>
              </motion.a>

              <motion.a
                href={`tel:${t('portfolio.contact.phoneHref')}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass group flex items-center gap-4 rounded-3xl p-6"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300 ring-1 ring-white/10">
                  <Phone size={20} />
                </span>
                <span>
                  <span className="block text-sm text-zinc-400">
                    {t('portfolio.contact.callLabel')}
                  </span>
                  <span className="block text-xl font-bold tracking-wide text-white">
                    {t('portfolio.contact.phone')}
                  </span>
                </span>
              </motion.a>

              <div className="grid grid-cols-3 gap-4">
                {socials.map((s, i) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <Reveal key={s.label} delay={i * 0.06}>
                      <motion.a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className="glass flex flex-col items-center gap-2 rounded-2xl py-5 text-zinc-300 transition-colors hover:text-white"
                      >
                        <Icon size={20} />
                        <span className="text-xs font-medium">{s.label}</span>
                      </motion.a>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.12}>
            <div className="glass relative rounded-3xl p-7 md:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[380px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 16,
                        delay: 0.1,
                      }}
                    >
                      <Send size={52} className="text-emerald-400" />
                    </motion.span>
                    <h3 className="mt-5 text-2xl font-bold text-white">
                      {t('portfolio.contact.successTitle')}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-zinc-400">
                      {t('portfolio.contact.successDesc', {
                        name: form.name || 'bạn',
                      })}
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: '', email: '', message: '' });
                      }}
                      className="mt-6 rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white ring-1 ring-white/15 transition hover:bg-white/15"
                    >
                      {t('portfolio.contact.sendAnother')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, scale: 0.97 }}
                    onSubmit={submit}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-zinc-300">
                          {t('portfolio.contact.formName')}
                        </span>
                        <input
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder={t('portfolio.contact.formNamePh')}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#a78bfa]/60 focus:bg-white/10"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-zinc-300">
                          {t('portfolio.contact.formEmail')}
                        </span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder={t('portfolio.contact.formEmailPh')}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#a78bfa]/60 focus:bg-white/10"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-zinc-300">
                        {t('portfolio.contact.formMsg')}
                      </span>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder={t('portfolio.contact.formMsgPh')}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#a78bfa]/60 focus:bg-white/10"
                      />
                    </label>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#7c3aed]/30"
                    >
                      <Send size={16} />
                      {t('portfolio.contact.submit')}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export const PortfolioFooter = () => {
  const t = useTranslations('common');
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <Reveal y={16}>
          <p
            aria-hidden
            className="select-none text-center text-[11vw] font-black leading-none tracking-tight text-white/[0.045] md:text-[6rem]"
          >
            {t('portfolio.footer.bigText')}
          </p>
        </Reveal>
        <div className="mt-2 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-zinc-500">
            {t('portfolio.footer.rights')}
          </p>
          <motion.a
            href="#home"
            whileHover={{ y: -4 }}
            aria-label="Back to top"
            className="glass flex size-10 items-center justify-center rounded-full text-zinc-300 hover:text-white"
          >
            <ArrowUp size={17} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};
