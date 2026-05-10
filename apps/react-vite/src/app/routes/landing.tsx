import { Navbar, Footer } from '@/components/layout';
import {
  HeroSection,
  ExpertiseSection,
  TechStackSection,
  ExperienceSection,
  CodeShowcaseSection,
  StatsSection,
  ProjectsSection,
  ArchitectureSection,
  ContactSection,
} from '@/components/sections';

const LandingRoute = () => {
  return (
    <div className="overflow-x-hidden bg-surface-50 font-sans text-ink-600 antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <ExpertiseSection />
        <TechStackSection />
        <ExperienceSection />
        <CodeShowcaseSection />
        <StatsSection />
        <ProjectsSection />
        <ArchitectureSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingRoute;
