import HeroSection from './components/home/HeroSection';
import PopularPizzaSection from './components/home/PopularPizzaSection';
import ExclusiveMenuSection from './components/home/ExclusiveMenuSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import WhyChooseUsSection from './components/home/WhyChooseUsSection';

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
