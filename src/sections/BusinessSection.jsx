import { Briefcase, Network, ServerCog } from 'lucide-react';
import { SectionHeader } from '../components/common/Section.jsx';

const items = [
  {
    title: 'Private Investment',
    description:
      'We originate and structure selective investments across frontier-to-infrastructure themes, with governance alignment and transparent reporting.',
    icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
  },
  {
    title: 'Partnership Program',
    description:
      'We partner with established managers to create cross–asset-class synergies, accessing hard-to-reach opportunities.',
    icon: <Network className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'Capital Advisory',
    description:
      'Technical/product diligence, category mapping, infra/vendor selection, and transaction support for corporates and family offices.',
    icon: <ServerCog className="w-6 h-6 text-cyan-500" />,
  },
];

const BusinessSection = () => (
  <section id="business" className="py-24 bg-white dark:bg-slate-900">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <SectionHeader title="Business" subtitle="Our Tailored Offerings To Capture Value" />
      <div className="grid gap-10 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 shadow-sm hover:shadow-md transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-xs text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
        All activities are conducted in compliance with applicable regulations for professional and qualified investors.
      </p>
    </div>
  </section>
);

export default BusinessSection;
