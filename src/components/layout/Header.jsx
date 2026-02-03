import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Linkedin, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeProvider.jsx';

const logoDark = `${import.meta.env.BASE_URL}images/logo-sparkle.svg`;
const logoLight = `${import.meta.env.BASE_URL}images/logo-sparkle-light.png`;

const Header = ({ sections, activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);

  return (
    <motion.header className="fixed top-0 w-full z-50 font-sans">
      <motion.div
        className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-900/10 dark:border-white/10"
        style={{ opacity: headerBgOpacity }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
            aria-label="Sparkle Ventures – Home"
          >
            <img
              src={logoDark}
              alt="Sparkle Ventures"
              className="block dark:hidden h-9 md:h-10 lg:h-11 w-auto"
              decoding="async"
              loading="eager"
            />
            <img
              src={logoLight}
              alt="Sparkle Ventures"
              className="hidden dark:block h-9 md:h-10 lg:h-11 w-auto"
              decoding="async"
              loading="eager"
            />
          </motion.button>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeSection === id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    layoutId="nav-underline"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              Contact <ArrowUpRight size={14} />
            </button>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg z-50"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  SV
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Sparkle Ventures
                  </p>
                  <p className="text-xs text-slate-500">Where frontier tech becomes infrastructure</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 px-3 rounded-lg font-medium text-base transition-colors ${
                    activeSection === id
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="px-6 py-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <button
                onClick={() => {
                  scrollToSection('contact');
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 rounded-full bg-slate-900 text-white font-semibold flex items-center justify-center gap-2"
              >
                Request a conversation
                <ArrowUpRight size={16} />
              </button>
              <a
                href="https://www.linkedin.com/company/sparkleventures"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold flex items-center justify-center gap-2"
              >
                <Linkedin size={16} /> Follow on LinkedIn
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
