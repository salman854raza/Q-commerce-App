import PageHero from '../components/ui/PageHero';
import ChefsSection from '../components/chefs/ChefsSection';

export const metadata = {
  title: 'Our Chefs | Pizzao - We Have Popular Masterchef',
};

export default function ChefsPage() {
  return (
    <main>
      <PageHero title="OUR CHEFS" subtitle="WE HAVE POPULAR MASTERCHEF" />
      <ChefsSection />
    </main>
  );
}
