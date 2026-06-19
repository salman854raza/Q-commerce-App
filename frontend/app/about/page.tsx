import PageHero from '../components/ui/PageHero';
import AboutHeroSection from '../components/about/AboutHeroSection';
import SpecialitiesSection from '../components/about/SpecialitiesSection';
import TestimonialsSection from '../components/about/TestimonialsSection';
import JourneySection from '../components/about/JourneySection';

export const metadata = {
  title: 'About Us | Pizzao - Pizzeria Family Restaurant',
  description: 'Amazing and Hygiene Pasta and Pizza Parlor. One of the original founding pizza brands.',
};

export default function AboutPage() {
  return (
    <main>
      <PageHero title="ABOUT US" subtitle="PIZZERIA FAMILY RESTAURANT" />
      <AboutHeroSection />
      <SpecialitiesSection />
      <TestimonialsSection />
      <JourneySection />
    </main>
  );
}
