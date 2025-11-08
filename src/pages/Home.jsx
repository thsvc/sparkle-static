import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import { ThemeProvider } from '../components/layout/ThemeProvider.jsx';
import { SectionSeparator } from '../components/common/Section.jsx';
import HeroSection from '../sections/HeroSection.jsx';
import BusinessSection from '../sections/BusinessSection.jsx';
import PerspectiveSection from '../sections/PerspectiveSection.jsx';
import CompaniesSection from '../sections/CompaniesSection.jsx';
import TeamSection from '../sections/TeamSection.jsx';
import ContactSection from '../sections/ContactSection.jsx';
import InvestorForm from '../components/forms/InvestorForm.jsx';
import FounderForm from '../components/forms/FounderForm.jsx';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'business', label: 'Business' },
  { id: 'perspective', label: 'Perspective' },
  { id: 'companies', label: 'Companies' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

const SparkleVenturesPage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [showInvestorForm, setShowInvestorForm] = useState(false);
  const [showFounderForm, setShowFounderForm] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200 antialiased">
        <Header sections={SECTIONS} activeSection={activeSection} scrollToSection={scrollToSection} />

        <main>
          <HeroSection />
          <SectionSeparator />
          <BusinessSection />
          <SectionSeparator />
          <PerspectiveSection />
          <SectionSeparator />
          <CompaniesSection />
          <SectionSeparator />
          <TeamSection />
          <SectionSeparator />
          <ContactSection
            onInvestorClick={() => setShowInvestorForm(true)}
            onFounderClick={() => setShowFounderForm(true)}
          />
        </main>

        <Footer />

        <AnimatePresence>
          <InvestorForm isOpen={showInvestorForm} onClose={() => setShowInvestorForm(false)} />
          <FounderForm isOpen={showFounderForm} onClose={() => setShowFounderForm(false)} />
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default SparkleVenturesPage;
