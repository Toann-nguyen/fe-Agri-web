import dynamic from 'next/dynamic';

import { Navbar, Hero, PageBackground } from '@/features/landing/components';

const Expertise = dynamic(
  () =>
    import('@/features/landing/components').then((m) => ({
      default: m.Expertise,
    })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-900/50" />,
    ssr: true,
  },
);
const TechStack = dynamic(
  () =>
    import('@/features/landing/components').then((m) => ({
      default: m.TechStack,
    })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-900/50" />,
    ssr: true,
  },
);
const Experience = dynamic(
  () =>
    import('@/features/landing/components').then((m) => ({
      default: m.Experience,
    })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-900/50" />,
    ssr: true,
  },
);
const CodeShowcase = dynamic(
  () =>
    import('@/features/landing/components').then((m) => ({
      default: m.CodeShowcase,
    })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-900/50" />,
    ssr: true,
  },
);
const StatsDashboard = dynamic(
  () =>
    import('@/features/landing/components').then((m) => ({
      default: m.StatsDashboard,
    })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-900/50" />,
    ssr: true,
  },
);
const Projects = dynamic(
  () =>
    import('@/features/landing/components').then((m) => ({
      default: m.Projects,
    })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-900/50" />,
    ssr: false,
  },
);
const Architecture = dynamic(
  () =>
    import('@/features/landing/components').then((m) => ({
      default: m.Architecture,
    })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-900/50" />,
    ssr: true,
  },
);
const ContactTerminal = dynamic(
  () =>
    import('@/features/landing/components').then((m) => ({
      default: m.ContactTerminal,
    })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-900/50" />,
    ssr: false,
  },
);
const Footer = dynamic(
  () =>
    import('@/features/landing/components').then((m) => ({
      default: m.Footer,
    })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-900/50" />,
    ssr: true,
  },
);

const HomePage = () => {
  return (
    <main>
      <PageBackground />
      <Navbar />
      <Hero />

      <Expertise />
      <TechStack />
      <Experience />
      <CodeShowcase />
      <StatsDashboard />
      <Projects />
      <Architecture />
      <ContactTerminal />
      <Footer />

      {/* Toast placeholder */}
      <div
        id="toast"
        className="pointer-events-none fixed bottom-6 right-6 z-50 flex translate-y-20 items-center gap-3 rounded-xl border border-ink-300/10 bg-white px-5 py-3 opacity-0 shadow-xl shadow-black/10 transition-all duration-500"
      >
        <span
          className="iconify text-emerald-500"
          data-icon="mdi:check-circle"
          data-width="20"
        ></span>
        <span
          id="toast-message"
          className="font-mono text-sm text-ink-700"
        ></span>
      </div>
    </main>
  );
};

export default HomePage;
