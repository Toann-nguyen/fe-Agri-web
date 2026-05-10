import {
  Navbar,
  Hero,
  Expertise,
  TechStack,
  Experience,
  CodeShowcase,
  StatsDashboard,
  Projects,
  Architecture,
  ContactTerminal,
  Footer,
} from '@/features/landing/components';

const HomePage = () => {
  return (
    <main>
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
