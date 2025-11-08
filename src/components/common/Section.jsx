import { motion } from 'framer-motion';

export const Section = ({ id, children, className = '', full = false }) => (
  <section
    id={id}
    className={`snap-start scroll-mt-[88px] md:scroll-mt-[96px] ${
      full ? 'min-h-[100svh] py-16 md:py-20' : 'py-20 md:py-28'
    } ${className}`}
  >
    <div className="max-w-6xl mx-auto px-6">{children}</div>
  </section>
);

export const SectionSeparator = () => (
  <div className="h-16 md:h-24 w-full">
    <div className="h-full w-full bg-gradient-to-b from-transparent via-slate-100/70 to-transparent dark:via-slate-800/50" />
  </div>
);

export const SectionTitle = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
    className="text-3xl md:text-4xl font-bold text-center mb-16 font-grotesk text-slate-900 dark:text-white"
  >
    {children}
  </motion.h2>
);

export const SectionHeader = ({
  title,
  subtitle,
  className = '',
  titleClass = 'text-3xl md:text-4xl font-bold text-slate-900 dark:text-white',
  subtitleClass = 'text-base md:text-lg font-medium text-slate-600 dark:text-slate-300',
}) => (
  <div className={`mb-10 md:mb-12`}>
    <div className={`flex items-baseline justify-center gap-3 md:gap-4 ${className}`}>
      <h2 className={`${titleClass} font-grotesk tracking-tight`}>{title}</h2>
      <span className="select-none text-slate-300 dark:text-slate-600">|</span>
      <p className={`${subtitleClass} leading-snug`}>{subtitle}</p>
    </div>
  </div>
);

export const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);
