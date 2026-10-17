import { getTranslations } from 'next-intl/server';

import {
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
    <div className="pf-editorial relative min-h-screen font-sans antialiased">
      {/* Fixed UI lives outside #smooth-wrapper (ScrollSmoother transforms the content). */}
      <ScrollProgress />
      <PortfolioNavbar />

      <SmoothScroll>
        {/* The smoother pins #smooth-wrapper to the viewport, so the paper
            background must live on an element that spans the full content. */}
        <div className="pf-editorial">
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

      {/* Paper grain overlay for the whole page. */}
      <div className="pf-grain" aria-hidden />
    </div>
  );
};

export default HomePage;
