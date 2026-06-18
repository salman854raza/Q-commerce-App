import PageHero from '../components/ui/PageHero';
import ExclusiveMenuSection from '../components/home/ExclusiveMenuSection';
import MenuHeroSection from '../components/menu/MenuHeroSection';

export const metadata = {
  title: 'Our Menu | Pizzao - Wonderful Dining Experience',
};

export default function MenuPage() {
  return (
    <main>
      <PageHero title="OUR MENU" subtitle="WONDERFUL DINING EXPERIENCE" />
      <MenuHeroSection />
      <ExclusiveMenuSection />
    </main>
  );
}
