import PageHero from '../components/ui/PageHero';
import FranchiseStepsSection from '../components/franchise/FranchiseStepsSection';
import FranchiseSupportSection from '../components/franchise/FranchiseSupportSection';
import FranchiseFormSection from '../components/franchise/FranchiseFormSection';

export const metadata = {
  title: 'Franchise | Pizzao - Business Opportunities',
};

export default function FranchisePage() {
  return (
    <main>
      <PageHero title="FRANCHISE" subtitle="BUSINESS OPPORTUNITIES" />
      <FranchiseStepsSection />
      <FranchiseSupportSection />
      <FranchiseFormSection />
    </main>
  );
}
