import HeroSection from './components/home/HeroSection';
import PopularPizzaSection from './components/home/PopularPizzaSection';
import ExclusiveMenuSection from './components/home/ExclusiveMenuSection';
import WhyChooseUsSection from './components/home/WhyChooseUsSection';
import TestimonialsSection from './components/about/TestimonialsSection';

export const metadata = {
  title: 'Pizzao - Original Italian Pizza Parlor | Best Pizza Restaurant',
  description: 'Amazing and Hygiene Pasta and Pizza Parlor. Order now and get free delivery within 30 minutes!',
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PopularPizzaSection />
      <ExclusiveMenuSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
    </main>
  );
}
