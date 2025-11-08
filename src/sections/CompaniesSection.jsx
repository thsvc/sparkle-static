import { useMemo } from 'react';
import { Section, SectionHeader } from '../components/common/Section.jsx';
import { PORTFOLIO_CATEGORIES } from '../lib/constants.js';

const getLogoSrc = (logo) => `${import.meta.env.BASE_URL}images/logos/${logo}`;

const CompaniesSection = () => {
  const allCompanies = useMemo(() => {
    return PORTFOLIO_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => ({
        ...item,
        category: cat.title,
        src: getLogoSrc(item.logo),
      }))
    );
  }, []);

  return (
    <Section id="companies" className="bg-white dark:bg-slate-900">
      <div className="mb-10">
        <SectionHeader title="Companies" subtitle="20+ Teams Shaping Tomorrow’s Infrastructure" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 md:gap-8">
        {allCompanies.map((company) => (
          <a
            key={`${company.category}-${company.name}`}
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center hover:shadow-md transition min-h-[100px] md:min-h-[120px] lg:min-h-[140px]"
            aria-label={company.name}
          >
            <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              {company.category}
            </span>
            <img
              src={company.src}
              alt={company.name}
              loading="lazy"
              decoding="async"
              className="max-w-[70%] max-h-[70%] object-contain opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition"
            />
          </a>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-slate-500">Selected multistage portfolio overview.</p>
    </Section>
  );
};

export default CompaniesSection;
