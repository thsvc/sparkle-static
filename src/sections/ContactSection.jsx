import { Section, SectionHeader } from '@/components/common/Section.jsx';

const ContactSection = ({ onInvestorClick, onFounderClick }) => (
  <Section id="contact" className="bg-slate-50 dark:bg-slate-900/50">
    <div className="text-center">
      <SectionHeader title="Contact" subtitle="Connect With Our Team to Explore Investment Opportunities." />
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button
          onClick={onInvestorClick}
          className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Request a conversation
        </button>
        <button
          onClick={onFounderClick}
          className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-full font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          Share your deck
        </button>
      </div>
    </div>
  </Section>
);

export default ContactSection;
