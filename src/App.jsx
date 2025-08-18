/* eslint-disable */

import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Linkedin, Menu, X, Sun, Moon, Briefcase, BarChart, Zap, Handshake, ChevronDown, Check, Rocket, Network, ServerCog, ArrowUpRight, RefreshCcw, ChevronRight } from 'lucide-react';

// --- THEME PROVIDER & HOOK ---
const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    setTheme(storedTheme || 'light');   // light par défaut
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- DATA DEFINITIONS ---
const capabilitiesData = [
  {
    icon: Briefcase,
    title: "Capital Programs",
    description: "Discretionary or deal-by-deal exposure for professional investors with governance alignment and clear reporting lines."
  },
  {
    icon: BarChart,
    title: "Secondary Solutions",
    description: "Selective access to LP interests, directs, and structured/pre-IPO blocks across deep-tech adjacencies. Terms shared under NDA."
  },
  {
    icon: Zap,
    title: "Direct & Co-Invest",
    description: "Primary exposure where our infrastructure lens identifies durable advantage and operating leverage."
  },
  {
    icon: Handshake,
    title: "Advisory",
    description: "Technical/product diligence, category mapping, infra/vendor selection, and transaction support for corporates and family offices."
  }
];

const companyData = [
  {
    group: "AI Compute & Platforms",
    companies: [ { name: "x.ai", url: "https://x.ai" }, { name: "FedML", url: "https://fedml.ai" } ]
  },
  {
    group: "Applied AI Products",
    companies: [ { name: "Knode", url: "https://www.knode.com" }, { name: "Rowads", url: "https://www.rowads.com" }, { name: "Kinetix", url: "https://www.kinetix.tech" } ]
  },
  {
    group: "Privacy-Preserving Compute",
    companies: [ { name: "QED Protocol", url: "https://www.qedprotocol.com" }, { name: "Polyhedra Network", url: "https://polyhedra.network" } ]
  },
  {
    group: "Identity, Naming & Addressability",
    companies: [ { name: "Freename", url: "https://freename.io" }, { name: "The Open Network", url: "https://ton.org" } ]
  },
  {
    group: "Distributed Finance Infrastructure",
    companies: [ { name: "Kiln", url: "https://www.kiln.fi" }, { name: "THORChain", url: "https://thorchain.org" }, { name: "Gattaca", url: "https://www.gattaca.io" } ]
  },
  {
    group: "Data, CRM & Growth Infrastructure",
    companies: [ { name: "Absolute Labs", url: "https://www.absolutelabs.io" } ]
  },
  {
    group: "Spatial Tech",
    companies: [ { name: "Loft Orbital", url: "https://www.loftorbital.com" } ]
  }
];

const teamData = [
  { name: "Julien Pageaud", role: "Managing Partner", linkedin: "https://www.linkedin.com/in/julien-pageaud-5ba56b10/" },
  { name: "Thibaut Chessé", role: "Research Partner", linkedin: "https://fr.linkedin.com/in/thibautchesse" },
  { name: "Victoria Reullin", role: "Head of Operations", linkedin: "https://www.linkedin.com/in/victoria-r-b72173274/" },
  { name: "Michal Valko", role: "AI/ML Venture Partner", linkedin: "https://www.linkedin.com/in/michalvalko/" },
  { name: "Armand Joulin", role: "AI/ML Research Advisor", linkedin: "https://www.linkedin.com/in/armand-joulin-0274254/" },
  { name: "Cyril Cottu", role: "FinTech Venture Partner", linkedin: null },
  { name: "Aurélie Astruc", role: "Board Member", linkedin: "https://www.linkedin.com/in/aurelieastruc/" },
  { name: "Hugo Vautier", role: "Board Member", linkedin: "https://www.linkedin.com/in/hugo-vautier-01a74042/" },
  { name: "Gérald Heng", role: "General Counsel", linkedin: "https://www.linkedin.com/in/gerald-heng-b14577a3/" }
];

// Historical technology evolution data
const historyData = [
  {
    title: "Automotive (1900–1913)",
    beforeImage: import.meta.env.BASE_URL + 'images/automotive.png', // Corrected URL from outline to match intended image
    caption: "In 1900, cars were a rarity on New York's Fifth Avenue. By 1913, they had become the norm, reshaping mobility, industry, and the urban landscape. From scarcity to ubiquity in barely a decade."
  },
  {
    title: "Semiconductors (1947–Today)",
    beforeImage: import.meta.env.BASE_URL + 'images/semiconductors.png',
    caption: "The transistor began as a fragile experiment at Bell Labs in 1947. Today, billions are manufactured daily, powering everything from smartphones to satellites. What was once scarce is now the invisible backbone of modern life."
  },
  {
    title: "Satellites (1962–Today)",
    beforeImage: import.meta.env.BASE_URL + 'images/satellites.png',
    caption: "The Telstar satellite of 1962 opened the era of space-based communications. Today, constellations of satellites provide global internet, defense, and earth observation—once experimental, now indispensable."
  }
];

// --- STYLED COMPONENTS & HELPERS ---
const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="max-w-6xl mx-auto px-6">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children }) => (
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

// --- UI COMPONENTS ---
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <div className="w-9 h-9" />; // Placeholder to prevent layout shift

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

const Header = ({ sections, activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);

  return (
    <motion.header
      className="fixed top-0 w-full z-50 font-sans"
    >
      <motion.div 
        className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-900/10 dark:border-white/10"
        style={{ opacity: headerBgOpacity }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-bold font-grotesk text-slate-900 dark:text-white"
          >
            Sparkle Ventures
          </motion.div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeSection === id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div key={isMenuOpen ? 'close' : 'open'} initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
          >
            <div className="px-6 py-4 space-y-1">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => { scrollToSection(id); setIsMenuOpen(false); }}
                  className={`block w-full text-left py-2 px-3 rounded-lg font-medium text-base transition-colors ${
                    activeSection === id ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const TechnologyMaturationDiagram = () => {
  const stages = [
    { label: "Scarcity", description: "Experimental, capital-intensive" },
    { label: "Standardization", description: "Interoperable, orchestrated" },
    { label: "Ubiquity", description: "Invisible, mission-critical" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="mt-12 mb-8"
    >
      <div className="relative max-w-4xl mx-auto">
        {/* Background flow line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-300 via-blue-400 to-cyan-400 dark:from-slate-600 dark:via-blue-500 dark:to-cyan-500 transform -translate-y-1/2" />
        
        {/* Stage nodes */}
        <div className="relative flex justify-between items-center">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + (index * 0.2), duration: 0.6, type: "spring" }}
              className="flex flex-col items-center text-center bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl border-2 border-white dark:border-slate-700 shadow-lg min-w-[120px] md:min-w-[160px]"
            >
              <div className={`w-4 h-4 rounded-full mb-3 ${
                index === 0 ? 'bg-slate-400' : index === 1 ? 'bg-blue-500' : 'bg-cyan-500'
              }`} />
              <h3 className="font-bold font-grotesk text-sm md:text-base text-slate-900 dark:text-white mb-1">
                {stage.label}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Animated flow arrows */}
        {[0, 1].map((index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 1 + (index * 0.3), 
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 3,
              repeatType: "loop"
            }}
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ left: `${30 + (index * 35)}%` }}
          >
            <ChevronRight className="w-5 h-5 text-blue-500" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section id="overview" className="relative min-h-screen flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 opacity-5 dark:opacity-10"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                background: `linear-gradient(45deg, ${i % 2 ? '#0f172a' : '#1e40af'}, transparent)`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-grotesk mb-8 text-slate-900 dark:text-white leading-tight"
        >
          Frontier tech becomes infrastructure.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl max-w-4xl mx-auto text-slate-700 dark:text-slate-300 leading-relaxed mb-8"
        >
          We position capital to accelerate the convergence of multiple technological domains towards ubiquity, supporting both early enablers and late-stage platforms with enduring market gravity.
        </motion.p>
        
        <TechnologyMaturationDiagram />
      </div>
    </section>
  );
};

const CapabilitiesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Section id="capabilities" className="bg-slate-50 dark:bg-slate-900/50">
      <SectionTitle>Capabilities</SectionTitle>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {capabilitiesData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg dark:hover:border-blue-700/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold font-grotesk text-slate-900 dark:text-white">{item.title}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12">
        All activities are conducted in compliance with applicable regulations for professional and qualified investors.
      </p>
    </Section>
  );
};

const PerspectiveSection = () => {
  const stages = [
    {
      icon: Rocket,
      title: "Frontier",
      description: "Scarce, exploratory, capital-intensive innovations.",
      examples: "Breakthrough AI models, orbital platforms, novel compute architectures."
    },
    {
      icon: Network,
      title: "Scaling",
      description: "Standardization, orchestration, and secure interoperability across ecosystems.",
      examples: "Unified orchestration stacks, secure compute fabrics, global addressing systems."
    },
    {
      icon: ServerCog,
      title: "Infrastructure",
      description: "Invisible, deeply embedded capabilities powering multiple sectors simultaneously.",
      examples: "AI-native cloud services, sovereign satcom grids, ubiquitous trust layers."
    }
  ];

  const opportunities = [
    {
      title: "Composability Flywheel",
      description: "Modular capabilities integrate faster across domains as standards mature, driving exponential reach.",
      example: "Containerization enabling global cloud-native software deployment."
    },
    {
      title: "Process-Embedded Advantage",
      description: "Scalable, repeatable execution is a moat that compounds.",
      example: "Semiconductor fabs like TSMC leveraging process control as much as tech IP."
    },
    {
      title: "Technological Hybridity",
      description: "Cross-pollination of hardware, software, and data creates entirely new industries.",
      example: "SpaceX's integration of propulsion, satellite networks, and AI-based navigation."
    }
  ];

  const counterForces = [
    {
      title: "Commoditization Flow",
      description: "As core capabilities standardize, differentiation shifts to integration, orchestration, and trust.",
      example: "Generic cloud compute vs. AWS ecosystem services."
    },
    {
      title: "Aggregation Gravity",
      description: "Network effects and ecosystem lock-in increase the strength of dominant platforms.",
      example: "Apple's integration of hardware, software, and services."
    },
    {
      title: "Deflationary Gain",
      description: "Each tech generation delivers more at lower cost, broadening market access.",
      example: "AI inference cost reductions enabling consumer-grade generative tools."
    }
  ];

  return (
    <Section id="perspective" className="bg-white dark:bg-slate-900">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-slate-900 dark:text-white mb-8">
          Perspective
        </h2>
        <div className="max-w-4xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            As frontier technologies mature, they move from scarcity and experimentation to standardization and ubiquity. This transformation is shaped by compounding capabilities, hybrid architectures, and the convergence of multiple domains. We invest across this transition, identifying the architectures and processes that drive adoption and endure across cycles.
          </p>
        </div>
      </div>

      {/* Technology Stages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-sm">
                <stage.icon className="w-6 h-6 text-blue-800 dark:text-blue-500" />
              </div>
              <h3 className="text-xl font-bold font-grotesk text-slate-900 dark:text-white">{stage.title}</h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">{stage.description}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{stage.examples}</p>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Forces Visualization */}
      <div className="my-20 flex justify-center">
        <motion.div 
          className="w-full max-w-3xl h-40 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Central flow line */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 dark:from-blue-800 dark:via-blue-400 dark:to-blue-800 transform -translate-y-1/2" />
          
          {/* Opportunities arc (upward) */}
          <motion.svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 600 160"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <path 
              d="M50 80 Q 300 20, 550 80" 
              stroke="#0d4c7e" 
              strokeWidth="3" 
              fill="none" 
              className="stroke-blue-600 dark:stroke-blue-400"
            />
            <text x="300" y="40" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-sm font-medium">
              Opportunities
            </text>
          </motion.svg>
          
          {/* Counter-forces arc (downward) */}
          <motion.svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 600 160"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          >
            <path 
              d="M550 80 Q 300 140, 50 80" 
              stroke="#0891b2" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="8 4"
              className="stroke-cyan-600 dark:stroke-cyan-400"
            />
            <text x="300" y="130" textAnchor="middle" className="fill-cyan-600 dark:fill-cyan-400 text-sm font-medium">
              Counter-Forces
            </text>
          </motion.svg>
        </motion.div>
      </div>

      {/* Forces Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {/* Opportunities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold font-grotesk text-blue-800 dark:text-blue-500 mb-8">Opportunities</h3>
          <div className="space-y-6">
            {opportunities.map((item, i) => (
              <div key={i} className="border-l-4 border-blue-200 dark:border-blue-700 pl-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-2">{item.description}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Example: {item.example}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Counter-Forces */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold font-grotesk text-cyan-600 dark:text-cyan-400 mb-8">Counter-Forces</h3>
          <div className="space-y-6">
            {counterForces.map((item, i) => (
              <div key={i} className="border-l-4 border-cyan-200 dark:border-cyan-700 pl-6">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-2">{item.description}</p>
                <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">Example: {item.example}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* From Scarcity to Ubiquity Section */}
      <div className="mt-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold font-grotesk text-slate-900 dark:text-white text-center mb-6"
        >
          From Scarcity to Ubiquity
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 dark:text-slate-400 text-center mb-12 max-w-3xl mx-auto"
        >
          History shows how quickly frontier technologies evolve from rare experiments to everyday infrastructure.
        </motion.p>

        {/* Historical Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {historyData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="mb-6">
                <img
                  src={item.beforeImage}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-xl border border-slate-200 dark:border-slate-600"
                />
              </div>
              
              <h4 className="text-lg font-bold font-grotesk text-slate-900 dark:text-white mb-4">
                {item.title}
              </h4>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {item.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const UniverseSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setOpenIndex(0);
    }
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <Section id="universe" className="bg-slate-50 dark:bg-slate-900/50">
      <SectionTitle>Universe of Companies</SectionTitle>
      <div className="space-y-4">
        {companyData.map((group, index) => (
          <div key={group.group} className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg font-grotesk text-slate-800 dark:text-slate-100">{group.group}</span>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">{group.companies.length}</span>
              </div>
              <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5 text-slate-500" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {group.companies.map(company => (
                      <a
                        key={company.name}
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {company.name}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ManagementSection = () => {
  return (
    <Section id="management">
      <SectionTitle>Management</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamData.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center transition-all duration-300 hover:shadow-xl"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-semibold text-3xl font-grotesk ring-4 ring-white dark:ring-slate-800 transition-transform group-hover:scale-105">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">{member.role}</p>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <Linkedin size={20} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const ContactSection = ({ onInvestorClick, onFounderClick }) => {
  return (
    <Section id="contact" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="text-center">
        <SectionTitle>Contact</SectionTitle>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 mb-12">
          Connect with our team to explore investment opportunities or share your innovation.
        </p>
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
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-400 py-16">
      <div className="max-w-6xl mx-auto px-6 text-xs leading-relaxed">
        <h3 className="font-bold text-sm text-slate-200 mb-4 font-grotesk">Disclaimer</h3>
        <p className="mb-6">
          For professional/qualified investors only. Nothing herein constitutes an offer to the public or investment advice. Certain documentation or administration may be handled by an affiliated entity in the United Arab Emirates, subject to local regulations. Information regarding investment vehicles is illustrative only. Investing involves risk, including loss of capital. Past performance is not a reliable indicator of future results.
        </p>
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            Sparkle Ventures · CIF/ORIAS: 22001079 · ANACOFI-CIF · RCS Paris 905 339 966 · Registered office: 46 Boulevard Henri IV, 75004 Paris · Share capital: €1,650.00
          </p>
          <p className="text-slate-500">© {new Date().getFullYear()} Sparkle Ventures</p>
        </div>
      </div>
    </footer>
  );
};

const FormDialog = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const InvestorForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ fullName: '', organization: '', workEmail: '', country: '', investorType: '', message: '', professionalInvestor: false, notPublicOffering: false, privacyConsent: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); console.log('Investor Form:', formData); setIsSubmitted(true); };
  
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ fullName: '', organization: '', workEmail: '', country: '', investorType: '', message: '', professionalInvestor: false, notPublicOffering: false, privacyConsent: false });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, onClose]);

  return (
    <FormDialog isOpen={isOpen} onClose={onClose}>
      {isSubmitted ? (
        <div className="text-center py-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Thank You</h3>
          <p className="text-slate-600 dark:text-slate-300">We'll be in touch shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-grotesk">Investment Inquiry</h3>
            <p className="text-slate-600 dark:text-slate-300">Connect with our investment team</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" required className="form-input" onChange={e => setFormData({...formData, fullName: e.target.value})}/>
            <input type="text" placeholder="Organization" required className="form-input" onChange={e => setFormData({...formData, organization: e.target.value})}/>
            <input type="email" placeholder="Work Email" required className="form-input" onChange={e => setFormData({...formData, workEmail: e.target.value})}/>
            <select required className="form-input" onChange={e => setFormData({...formData, country: e.target.value})}>
              <option value="">Select Country</option>
              <option value="US">United States</option><option value="FR">France</option><option value="LU">Luxembourg</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="DE">Germany</option><option value="CH">Switzerland</option><option value="other">Other</option>
            </select>
          </div>
          <select required className="form-input" onChange={e => setFormData({...formData, investorType: e.target.value})}>
            <option value="">Investor Type</option>
            <option value="institutional">Institutional</option><option value="professional">Professional</option><option value="corporate">Corporate</option><option value="family-office">Family Office</option>
          </select>
          <textarea placeholder="Message" rows={3} className="form-input resize-none" onChange={e => setFormData({...formData, message: e.target.value})}/>
          <div className="space-y-3">
            <label className="form-checkbox"><input type="checkbox" required onChange={e => setFormData({...formData, professionalInvestor: e.target.checked})}/><span>I confirm I am a professional/qualified investor</span></label>
            <label className="form-checkbox"><input type="checkbox" required onChange={e => setFormData({...formData, notPublicOffering: e.target.checked})}/><span>I acknowledge this is not a public offering</span></label>
            <label className="form-checkbox"><input type="checkbox" required onChange={e => setFormData({...formData, privacyConsent: e.target.checked})}/><span>I consent to the privacy policy</span></label>
          </div>
          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onClose} className="form-button-secondary">Cancel</button>
            <button type="submit" className="form-button-primary">Submit</button>
          </div>
        </form>
      )}
    </FormDialog>
  );
};

const FounderForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ fullName: '', company: '', workEmail: '', url: '', message: '', notPublicOffering: false, privacyConsent: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); console.log('Founder Form:', formData); setIsSubmitted(true); };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ fullName: '', company: '', workEmail: '', url: '', message: '', notPublicOffering: false, privacyConsent: false });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, onClose]);

  return (
    <FormDialog isOpen={isOpen} onClose={onClose}>
      {isSubmitted ? (
        <div className="text-center py-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Thank You</h3>
          <p className="text-slate-600 dark:text-slate-300">We'll review your submission.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-grotesk">Founder Application</h3>
            <p className="text-slate-600 dark:text-slate-300">Share your innovation with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" required className="form-input" onChange={e => setFormData({...formData, fullName: e.target.value})}/>
            <input type="text" placeholder="Company" required className="form-input" onChange={e => setFormData({...formData, company: e.target.value})}/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="email" placeholder="Work Email" required className="form-input" onChange={e => setFormData({...formData, workEmail: e.target.value})}/>
            <input type="url" placeholder="Deck or Website URL" className="form-input" onChange={e => setFormData({...formData, url: e.target.value})}/>
          </div>
          <textarea placeholder="Tell us about your company..." required rows={4} className="form-input resize-none" onChange={e => setFormData({...formData, message: e.target.value})}/>
          <div className="space-y-3">
            <label className="form-checkbox"><input type="checkbox" required onChange={e => setFormData({...formData, notPublicOffering: e.target.checked})}/><span>I acknowledge this is not a public offering</span></label>
            <label className="form-checkbox"><input type="checkbox" required onChange={e => setFormData({...formData, privacyConsent: e.target.checked})}/><span>I consent to the privacy policy</span></label>
          </div>
          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onClose} className="form-button-secondary">Cancel</button>
            <button type="submit" className="form-button-primary">Submit</button>
          </div>
        </form>
      )}
    </FormDialog>
  );
};


// --- MAIN PAGE COMPONENT ---
export default function SparkleVenturesPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [showInvestorForm, setShowInvestorForm] = useState(false);
  const [showFounderForm, setShowFounderForm] = useState(false);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'perspective', label: 'Perspective' },
    { id: 'universe', label: 'Universe' },
    { id: 'management', label: 'Management' },
    { id: 'contact', label: 'Contact' },
  ];

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
      { rootMargin: "-50% 0px -50% 0px" } // Trigger when section is in the middle of the viewport
    );
  
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
  
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200 antialiased">
        
        <Header sections={sections} activeSection={activeSection} scrollToSection={scrollToSection} />
        
        <main>
          <HeroSection />
          <CapabilitiesSection />
          <PerspectiveSection />
          <UniverseSection />
          <ManagementSection />
          <ContactSection onInvestorClick={() => setShowInvestorForm(true)} onFounderClick={() => setShowFounderForm(true)} />
        </main>
        
        <Footer />
        
        <AnimatePresence>
          <InvestorForm isOpen={showInvestorForm} onClose={() => setShowInvestorForm(false)} />
          <FounderForm isOpen={showFounderForm} onClose={() => setShowFounderForm(false)} />
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
