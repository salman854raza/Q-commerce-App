import PageHero from '../components/ui/PageHero';
import ContactSection from '../components/contact/ContactSection';
import MapSection from '../components/contact/MapSection';

export const metadata = {
  title: 'Contact Us | Pizzao - Let\'s Get In Touch',
};

export default function ContactPage() {
  return (
    <main>
      <PageHero title="CONTACT US" subtitle="LET'S GET IN TOUCH" />
      <ContactSection />
      <MapSection />
    </main>
  );
}
