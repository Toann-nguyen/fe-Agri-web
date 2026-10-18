'use client';

import {
  ArrowUp,
  ArrowUpRight,
  Check,
  CodeXml,
  Globe,
  Mail,
  Phone,
  Send,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState, type FormEvent, type MouseEvent } from 'react';

import { gsap, motionAllowed, scrollToTarget, useGSAP } from '../motion/gsap';

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
  const cardRef = useRef<HTMLDivElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
  };

  // Soft swap between the form and the confirmation block.
  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el || !motionAllowed()) return;

      gsap.from(el.querySelectorAll('[data-contact-swap]'), {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        ease: 'power3.out',
      });
    },
    { dependencies: [sent] },
  );

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-36"
    >
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="05"
          eyebrow={t('portfolio.contact.eyebrow')}
          title={
            <>
              {t('portfolio.contact.titleA')}{' '}
              <em className="italic text-[color:var(--pf-accent)]">
                {t('portfolio.contact.titleB')}
              </em>
            </>
          }
          description={t('portfolio.contact.description')}
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Info ledger */}
          <Reveal>
            <div className="flex h-full flex-col">
              <a
                href={`mailto:${t('portfolio.contact.email')}`}
                className="group block border border-[color:var(--pf-rule)] bg-[color:var(--pf-paper-2)] p-7 transition-colors duration-300 hover:border-[color:var(--pf-ink)] md:p-8"
              >
                <p className="pf-eyebrow flex items-center gap-2.5">
                  <Mail size={14} className="text-[color:var(--pf-accent)]" />
                  {t('portfolio.contact.emailLabel')}
                </p>
                <p className="pf-serif mt-4 break-all text-2xl leading-tight md:text-[1.7rem]">
                  {t('portfolio.contact.email')}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--pf-accent)]">
                  {t('portfolio.contact.emailHint')}
                  <Send
                    size={12}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                  />
                </p>
              </a>

              <a
                href={`tel:${t('portfolio.contact.phoneHref')}`}
                className="mt-4 flex items-center justify-between gap-4 border border-[color:var(--pf-rule)] px-6 py-5 transition-colors duration-300 hover:border-[color:var(--pf-ink)]"
              >
                <span className="pf-eyebrow flex items-center gap-2.5">
                  <Phone size={14} className="text-[color:var(--pf-accent)]" />
                  {t('portfolio.contact.callLabel')}
                </span>
                <span className="pf-serif text-xl leading-none md:text-2xl">
                  {t('portfolio.contact.phone')}
                </span>
              </a>

              <div className="mt-4 border-t border-[color:var(--pf-rule)]">
                {socials.map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b border-[color:var(--pf-rule)] py-3.5 transition-colors duration-200 hover:text-[color:var(--pf-accent)]"
                    >
                      <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
                        <Icon size={14} />
                        {s.label}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Message form */}
          <Reveal delay={0.12}>
            <div ref={cardRef} className="pf-card p-7 md:p-9">
              {sent ? (
                <div
                  data-contact-swap
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <span className="flex size-14 items-center justify-center bg-[color:var(--pf-ink)] text-[color:var(--pf-paper)]">
                    <Check size={22} />
                  </span>
                  <h3 className="pf-serif mt-6 text-3xl">
                    {t('portfolio.contact.successTitle')}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[color:var(--pf-ink-soft)]">
                    {t('portfolio.contact.successDesc', {
                      name: form.name || 'bạn',
                    })}
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({ name: '', email: '', message: '' });
                    }}
                    className="pf-btn pf-btn-ghost mt-8"
                  >
                    {t('portfolio.contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form data-contact-swap onSubmit={submit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="pf-eyebrow mb-2 block">
                        {t('portfolio.contact.formName')}
                      </span>
                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder={t('portfolio.contact.formNamePh')}
                        className="pf-input"
                      />
                    </label>
                    <label className="block">
                      <span className="pf-eyebrow mb-2 block">
                        {t('portfolio.contact.formEmail')}
                      </span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder={t('portfolio.contact.formEmailPh')}
                        className="pf-input"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="pf-eyebrow mb-2 block">
                      {t('portfolio.contact.formMsg')}
                    </span>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder={t('portfolio.contact.formMsgPh')}
                      className="pf-input resize-none"
                    />
                  </label>
                  <button type="submit" className="pf-btn w-full">
                    <Send size={15} />
                    {t('portfolio.contact.submit')}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export const PortfolioFooter = () => {
  const t = useTranslations('common');

  const toTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToTarget(0);
  };

  return (
    <footer className="pf-ink-band relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="pt-16 md:pt-24">
          <Reveal y={20}>
            <p
              aria-hidden
              className="pf-serif select-none whitespace-nowrap text-center text-[15vw] leading-[0.95] tracking-tight text-[color:var(--pf-ink)] opacity-[0.09] md:text-[9.5rem]"
            >
              {t('portfolio.footer.bigText')}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[color:var(--pf-rule)] py-7 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--pf-ink-soft)]">
            {t('portfolio.footer.rights')}
          </p>
          <a
            href="#home"
            onClick={toTop}
            aria-label="Back to top"
            className="flex size-10 items-center justify-center border border-[color:var(--pf-rule)] text-[color:var(--pf-ink)] transition-colors duration-300 hover:border-[color:var(--pf-accent)] hover:text-[color:var(--pf-accent)]"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};
