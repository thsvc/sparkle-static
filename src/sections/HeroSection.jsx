import { motion } from 'framer-motion';

const BusinessCardIntro = () => (
  <div className="mx-auto max-w-3xl text-left md:text-center bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-6 md:p-8 shadow-sm">
    <p className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
      Sparkle Ventures is an{' '}
      <span className="font-semibold text-slate-900 dark:text-white">independent multistage investment firm</span>,
      established in 2021. We partner with a select group of global investors to back companies where
      frontier technologies evolve into global infrastructure.
      <br className="hidden md:block" />
      <br className="hidden md:block" />
      Our mandate spans{' '}
      <span className="font-semibold text-slate-900 dark:text-white">high-net-worth individuals</span>,{' '}
      <span className="font-semibold text-slate-900 dark:text-white">family offices</span>,{' '}
      <span className="font-semibold text-slate-900 dark:text-white">corporates</span>, and{' '}
      <span className="font-semibold text-slate-900 dark:text-white">financial institutions</span>, positioning capital at the{' '}
      <span className="font-semibold text-slate-900 dark:text-white">inflection point of technological transformation</span>.
    </p>
  </div>
);

const HeroSection = () => (
  <section id="about" className="relative min-h-screen flex items-center justify-center">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 opacity-5 dark:opacity-10"
            animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              background: `linear-gradient(45deg, ${i % 2 ? '#0f172a' : '#1e40af'}, transparent)`,
            }}
          />
        ))}
      </div>
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-8 md:pt-10">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold font-grotesk mb-6 text-slate-900 dark:text-white leading-tight"
      >
        Frontier Tech Becomes Infrastructure.
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative mx-auto mb-6 h-0.5 w-28 bg-gradient-to-r from-blue-500 to-cyan-400 origin-center rounded-full"
      >
        <div className="absolute inset-0 blur-md bg-gradient-to-r from-blue-500/40 to-cyan-400/40 rounded-full" aria-hidden="true" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg md:text-xl max-w-3xl mx-auto text-slate-700 dark:text-slate-300 leading-relaxed mb-10 font-medium italic"
      >
        We position capital where technologies evolve from scarcity to ubiquity.
      </motion.p>

      <BusinessCardIntro />
    </div>

    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-1">
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.3 }}
        />
      ))}
    </div>
  </section>
);

export default HeroSection;
