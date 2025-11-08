import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { Section, SectionHeader } from '@/components/common/Section.jsx';
import { TEAM_MEMBERS } from '@/lib/constants.js';

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('');

const TeamSection = () => (
  <Section id="team" className="bg-white dark:bg-slate-900">
    <SectionHeader title="Team" subtitle="Cultivating Expertise From Operators, Researchers, and Partners" />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {TEAM_MEMBERS.map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className="group relative bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
        >
          {member.photo ? (
            <div className="w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-sm">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-2xl">
                {initials(member.name)}
              </div>
            </div>
          ) : (
            <div className="w-24 h-24 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-2xl ring-4 ring-white dark:ring-slate-800">
              {initials(member.name)}
            </div>
          )}

          <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center">{member.name}</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center font-medium mb-3">
            {member.title}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 text-center leading-relaxed">{member.blurb}</p>

          {member.linkedin && (
            <div className="mt-4 flex justify-center">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin size={18} />
                <span className="text-xs">LinkedIn</span>
              </a>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </Section>
);

export default TeamSection;
