import { getTranslations } from 'next-intl/server';

import {
  CursorGlow,
  PortfolioAbout,
  PortfolioContact,
  PortfolioExperience,
  PortfolioFooter,
  PortfolioHero,
  PortfolioMarquee,
  PortfolioNavbar,
  PortfolioProjects,
  ScrollProgress,
  SmoothScroll,
} from '@/features/portfolio/components';

import '@/features/portfolio/portfolio.css';

export async function generateMetadata() {
  const t = await getTranslations('common');
  return {
    title: t('portfolio.title'),
    description: t('portfolio.description'),
  };
}

const HomePage = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#06060c] font-sans text-zinc-100 antialiased">
        <ScrollProgress />
        <CursorGlow />
        <PortfolioNavbar />
        <main>
          <PortfolioHero />
          <PortfolioMarquee />
          <PortfolioAbout />
          <PortfolioProjects />
          <PortfolioExperience />
          <PortfolioContact />
        </main>
        <PortfolioFooter />
      </div>
    </SmoothScroll>
  );
};

export default HomePage;
