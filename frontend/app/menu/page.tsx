import PageHero from '../components/ui/PageHero';
import MenuHeroSection from '../components/menu/MenuHeroSection';
import ExclusiveMenuSection from '../components/home/ExclusiveMenuSection';

export const metadata = {
  title: 'Our Menu | Pizzao - Wonderful Dining Experience',
};

export default function MenuPage() {
  return (
    <main>
      <PageHero title="OUR MENU" subtitle="WONDERFUL DINING EXPERIENCE" />
      <MenuHeroSection />
      <div id="exclusive-menu">
        <ExclusiveMenuSection />
      </div>
    </main>
  );
}
