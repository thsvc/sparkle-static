/* eslint-disable */

// Imports (React, framer-motion, icônes, etc.)
import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Linkedin, Menu, X, Sun, Moon, Briefcase, BarChart, Zap, Handshake, ChevronDown, Check, Rocket, Network, ServerCog, ArrowUpRight, RefreshCcw, ChevronRight } from 'lucide-react';
import * as HoverCard from "@radix-ui/react-hover-card";

// === PERSPECTIVE MANIFOLD — contenu enrichi pour HoverCards ===
const PERSPECTIVE_DATA = {
  opportunities: [
    {
      title: "Composability",
      note:
        "Modular building blocks and open interfaces let capabilities plug together and scale across ecosystems.",
      link: "https://ethereum.org/en/developers/docs/scaling/" // ex: modular rollups & composability
    },
    {
      title: "Scalability",
      note:
        "Standards + orchestration enable predictable growth and multi-domain deployment at low friction.",
      link: "https://kubernetes.io/docs/concepts/" // ex: Kubernetes as orchestration standard
    },
    {
      title: "Efficiency",
      note:
        "Falling cost/performance curves expand markets and unlock new use-cases as infra gets cheaper.",
      link: "https://en.wikipedia.org/wiki/Moore%27s_law" // ex: Moore’s law as historical driver
    }
  ],
  counterforces: [
    {
      title: "Commoditization",
      note:
        "As primitives standardize, differentiation shifts to integration, orchestration, data and trust layers.",
      link: "https://en.wikipedia.org/wiki/Commoditization"
    },
    {
      title: "Lock-in",
      note:
        "Aggregation gravity and switching costs concentrate power; portability requires early design choices.",
      link: "https://en.wikipedia.org/wiki/Vendor_lock-in"
    },
    {
      title: "Deflation",
      note:
        "Each generation compresses unit margins; value migrates up-stack into systems, networks and services.",
      link: "https://en.wikipedia.org/wiki/Experience_curve_effects"
    }
  ]
};

const PerspectiveManifold = () => {
  // positions relatives (0→1000) pour placer les arcs
  const anchors = [180, 500, 820]; // 3 points le long de la timeline

  return (
    <div className="my-16">
      {/* Phrase manifeste compactée */}
      <div className="text-center mb-10">
        <p className="font-grotesk text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Frontier tech <span className="underline decoration-blue-400/60 underline-offset-4">becomes</span> infrastructure.
        </p>
        <p className="mt-3 max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
          We invest across this transition — conscious of the tension frontier technologies create between accelerating opportunities
          and inevitable counter-forces, as they compound, standardize, and embed into mission-critical infrastructure.
        </p>
      </div>

      {/* Timeline + arcs en SVG (vectoriel, léger) */}
      <motion.svg
        viewBox="0 0 1000 300"
        className="w-full h-[300px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* --- defs pour halos & styles texte --- */}
        <defs>
          <style>
            {`.label-strong{font-weight:700;font-size:14px}`}
          </style>
          {/* Halo vert (Frontier) */}
          <radialGradient id="haloFrontier" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.40)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </radialGradient>
          {/* Halo bleu (Infrastructure) */}
          <radialGradient id="haloInfra" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </radialGradient>
        </defs>

        {/* Ligne de base Frontier → Infrastructure */}
        <motion.line
          x1="60" y1="150" x2="940" y2="150"
          stroke="currentColor"
          className="text-slate-300 dark:text-slate-600"
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 1.2, ease: "easeInOut" } },
          }}
          style={{ pathLength: 1 }}
        />

        {/* Flèche de direction */}
        <polygon points="940,150 920,144 920,156" className="fill-slate-400 dark:fill-slate-500" />

        {/* === Labels extrémités avec halo === */}
        {/* FRONTIER TECH (gauche) */}
        <g>
          <circle cx="95" cy="150" r="46" fill="url(#haloFrontier)" />
          <circle cx="95" cy="150" r="5" className="fill-emerald-500" />
          <text
            x="95"
            y="155"
            textAnchor="middle"
            className="label-strong fill-slate-900 dark:fill-white"
          >
            Frontier Tech
          </text>
        </g>

        {/* INFRASTRUCTURE (droite) */}
        <g>
          <circle cx="905" cy="150" r="52" fill="url(#haloInfra)" />
          <circle cx="905" cy="150" r="5" className="fill-blue-500" />
          <text
            x="905"
            y="155"
            textAnchor="middle"
            className="label-strong fill-slate-900 dark:fill-white"
          >
            Infrastructure
          </text>
        </g>

        {/* Titres de zones */}
        <text
          x="500"
          y="34"
          textAnchor="middle"
          className="fill-emerald-600 dark:fill-emerald-400 text-[13px] font-semibold tracking-wide"
        >
          Opportunities
        </text>
        <text
          x="500"
          y="296"
          textAnchor="middle"
          className="fill-rose-600 dark:fill-rose-400 text-[13px] font-semibold tracking-wide"
        >
          Counter-forces
        </text>

        {/* Arcs Opportunités (au-dessus) */}
        {PERSPECTIVE_DATA.opportunities.map((o, i) => (
          <g key={o.title}>
            <motion.path
              d={`M ${anchors[i]} 150 C ${anchors[i]} 80, ${anchors[i] + 80} 80, ${anchors[i] + 80} 150`}
              fill="none"
              className="stroke-emerald-500 dark:stroke-emerald-400"
              strokeWidth="2.5"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 1, transition: { duration: 1.0, delay: 0.2 + i * 0.15 } },
              }}
            />

            {/* Mot-clé en “pill” + HoverCard */}
            <foreignObject x={anchors[i] + 0} y={56} width="160" height="40">
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <div
                    className="mx-auto w-max px-3 py-1.5 rounded-full border border-emerald-300/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur
                               cursor-pointer text-[13px] font-semibold text-emerald-700 dark:text-emerald-400
                               hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
                  >
                    {o.title}
                  </div>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content
                    side="top"
                    className="z-50 w-64 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-xl border border-slate-200 dark:border-slate-700"
                    sideOffset={6}
                  >
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{o.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{o.note}</p>
                    {o.link && (
                      <a
                        href={o.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        Learn more <ArrowUpRight className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </foreignObject>
          </g>
        ))}

        {/* Arcs Contre-forces (en dessous) */}
{PERSPECTIVE_DATA.counterforces.map((c, i) => (
  <g key={c.title}>
    <motion.path
      d={`M ${anchors[i]} 150 C ${anchors[i]} 220, ${anchors[i] + 80} 220, ${anchors[i] + 80} 150`}
      fill="none"
      className="stroke-rose-500 dark:stroke-rose-400"
      strokeWidth="2.5"
      strokeLinecap="round"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1, transition: { duration: 1.0, delay: 0.2 + i * 0.15 } },
      }}
    />

    {/* Mot-clé en “pill” + HoverCard */}
    <foreignObject x={anchors[i] + 0} y={226} width="180" height="40">
      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <div
            className="mx-auto w-max px-3 py-1.5 rounded-full border border-rose-300/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur
                       cursor-pointer text-[13px] font-semibold text-rose-700 dark:text-rose-400
                       hover:bg-rose-50 dark:hover:bg-rose-900/20 transition"
          >
            {c.title}
          </div>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            side="bottom"
            className="z-50 w-64 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-xl border border-slate-200 dark:border-slate-700"
            sideOffset={6}
          >
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{c.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{c.note}</p>
            {c.link && (
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-xs text-rose-600 dark:text-rose-400 hover:underline"
              >
                Learn more <ArrowUpRight className="w-3 h-3 ml-1" />
              </a>
            )}
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </foreignObject>
  </g>
))}

{/* Pont vers la galerie historique */}
<text
  x="940"
  y="95"
  textAnchor="end"
  className="fill-slate-500 dark:fill-slate-400 text-[11px] italic"
>
  Scarcity → Ubiquity (historical proof)
</text>
</motion.svg>  {/* ✅ unique fermeture ici */}

      {/* Légendes concises sous le schéma */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-900/10 p-4">
          <h4 className="text-emerald-700 dark:text-emerald-400 font-semibold mb-2 text-sm">Opportunities</h4>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {PERSPECTIVE_DATA.opportunities.map((o) => (
              <li key={o.title}><span className="font-medium">{o.title} — </span>{o.note}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-900/10 p-4">
          <h4 className="text-rose-700 dark:text-rose-400 font-semibold mb-2 text-sm">Counter-forces</h4>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {PERSPECTIVE_DATA.counterforces.map((c) => (
              <li key={c.title}><span className="font-medium">{c.title} — </span>{c.note}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hybridity = next frontier */}
      <div className="mt-8 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium">
          What remains the next valuable frontier: <span className="font-semibold">Technological hybridity</span>.
        </span>
      </div>
    </div>
  );
};

// === PERSPECTIVE SECTION ===
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

  return (
    <Section id="perspective" className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* --- Fond décoratif --- */}
      <div className="absolute inset-0">
        {/* Grille en opacité */}
        <div className="absolute inset-0 bg-grid-slate-200/40 dark:bg-grid-slate-800/40 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        {/* Halo radial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-blue-200/30 to-transparent dark:from-blue-900/20" />
      </div>

      {/* --- Contenu au-dessus du décor --- */}
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-slate-900 dark:text-white mb-4">
            Perspective
          </h2>
          {/* Barre d’accent */}
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 mx-auto mb-6 rounded-full" />

          <div className="max-w-4xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              As frontier technologies mature, they move from scarcity and experimentation to
              standardization and ubiquity. This transformation is shaped by compounding capabilities,
              hybrid architectures, and the convergence of multiple domains. We invest across this
              transition, identifying the architectures and processes that drive adoption and endure
              across cycles.
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
              className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-sm">
                  <stage.icon className="w-6 h-6 text-blue-800 dark:text-blue-500" />
                </div>
                <h3 className="text-xl font-bold font-grotesk text-slate-900 dark:text-white">
                  {stage.title}
                </h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4">{stage.description}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stage.examples}</p>
            </motion.div>
          ))}
        </div>

        {/* Manifold schema */}
        <PerspectiveManifold />

        {/* Historical Gallery (Scarcity → Ubiquity) */}
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
          
        {/* Technology maturation diagram – déplacé ici */}
        <div className="mt-12 max-w-4xl mx-auto">
          <TechnologyMaturationDiagram />
        </div>
          
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
      </div>
    </Section>
  );
};

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
    description: "Selective access to LP interests, directs, and structured/pre-IPO blocks across deep-tech adjacencies."
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

// --- TEAM DATA (ordre mis à jour) ---
const teamData = [
  {
    name: "Eng. Julien Pageaud",
    title: "Managing Partner",
    blurb:
      "Former Computer Vision Engineer at Safran Defense, Director at Goldman Sachs, and CIO at Nomura DO.",
    photo: import.meta.env.BASE_URL + "images/team/julien-pageaud.png",
    linkedin: "https://www.linkedin.com/in/julien-pageaud-5ba56b10/"
  },
  {
    name: "Eng. Thibaut Chessé",
    title: "Research Partner",
    blurb:
      "Former Head of adoption and technical support at Nomadic Labs and Computer Scientist at IBM.",
    photo: import.meta.env.BASE_URL + "images/team/thibaut-chesse.png",
    linkedin: "https://fr.linkedin.com/in/thibautchesse"
  },
  {
    name: "Dr. Victoria Reullin",
    title: "Operating Partner",
    blurb:
      "Former independent Semiologist and Talent Manager at Allianz.",
    photo: import.meta.env.BASE_URL + "images/team/victoria-reullin.png",
    linkedin: "https://www.linkedin.com/in/victoria-r-b72173274/"
  },
  {
    name: "Prof. Michal Valko",
    title: "AI/ML Venture Partner",
    blurb:
      "Former Principal Engineer Llama at Meta, and Research Director at Google DeepMind.",
    photo: import.meta.env.BASE_URL + "images/team/michal-valko.png",
    linkedin: "https://www.linkedin.com/in/michalvalko/"
  },
  {
    name: "Dr. Armand Joulin",
    title: "AI/ML Research Advisor",
    blurb:
      "Research Director for Google DeepMind, and former head of EMEA at Facebook AI Research.",
    photo: import.meta.env.BASE_URL + "images/team/armand-joulin.png",
    linkedin: "https://www.linkedin.com/in/armand-joulin-0274254/"
  },
  {
    name: "Aurélie Astruc",
    title: "Board Member",
    blurb:
      "Corporate Director at Edmond de Rothschild.",
    photo: import.meta.env.BASE_URL + "images/team/aurelie-astruc.png",
    linkedin: "https://www.linkedin.com/in/aurelieastruc/"
  },
  {
    name: "Prof. Steve Liu",
    title: "AI/ML Research Advisor",
    blurb:
      "Professor & Associate VP Research at MBZUAI, Professor at McGill University.",
    photo: import.meta.env.BASE_URL + "images/team/steve-liu.png",
    linkedin: "https://ca.linkedin.com/in/xueliu"
  },
  {
    name: "Hugo Vautier",
    title: "Board Member",
    blurb:
      "Partner at Opportunity Financial Services.",
    photo: import.meta.env.BASE_URL + "images/team/hugo-vautier.png",
    linkedin: "https://www.linkedin.com/in/hugo-vautier-01a74042/"
  },
  {
    name: "Dr. Gerald Heng",
    title: "General Counsel",
    blurb:
      "Former Lawyer at Baker McKenzie Wong & Leow.",
    photo: import.meta.env.BASE_URL + "images/team/gerald-heng.png",
    linkedin: "https://www.linkedin.com/in/gerald-heng-b14577a3/"
  }
];

// Historical technology evolution data
const historyData = [
  {
    title: "Automotive, 13 years to ubiquity (1900–1913)",
    beforeImage: import.meta.env.BASE_URL + 'images/automotive.png', // Corrected URL from outline to match intended image
    caption: "In 1900, cars were a rarity on New York's Fifth Avenue. By 1913, they had become the norm, reshaping mobility, industry, and the urban landscape. From scarcity to ubiquity in barely a decade."
  },
  {
    title: "Semiconductors, 75 years to mass adoption (1947–Today)",
    beforeImage: import.meta.env.BASE_URL + 'images/semiconductors.png',
    caption: "The transistor began as a fragile experiment at Bell Labs in 1947. Today, billions are manufactured daily, powering everything from smartphones to satellites. What was once scarce is now the invisible backbone of modern life."
  },
  {
    title: "Satellites, 60 years to global scale (1962–Today)",
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
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
            aria-label="Sparkle Ventures – Home"
          >
            <img
              src={import.meta.env.BASE_URL + 'images/logo-sparkle.svg'}
              alt="Sparkle Ventures"
              className="h-7 w-auto md:h-8"
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
    { label: "Scarcity", description: "Experimental, Capital-intensive" },
    { label: "Standardization", description: "Interoperable, Orchestrated" },
    { label: "Ubiquity", description: "Composable, Invisible" }
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

// === Option A : Minimaliste institutionnel (version raffinée) ===
const BusinessCardIntro = () => {
  return (
    <div className="mx-auto max-w-3xl text-left md:text-center bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-6 md:p-8 shadow-sm">
      
      {/* Paragraphe institutionnel */}
      <p className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        Sparkle Ventures is an{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          independent investment firm
        </span>{" "}
        established in 2021, with offices in Luxembourg, Paris, New York, and Abu Dhabi. 
        Authorized as a fund manager and{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          regulated by the Luxembourg CSSF
        </span>
        , we serve a select group of global investors.
      </p>

      {/* Mandat */}
      <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        Our mandate is to position capital on behalf of{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          HNWI
        </span>
        ,{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          family offices
        </span>
        ,{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          corporates
        </span>
        , and{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          financial institutions
        </span>{" "}
        where frontier technologies evolve into{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          mission-critical infrastructure
        </span>
        .
      </p>
    </div>
  );
};

// === Hero Section mise à jour ===
const HeroSection = () => {
  return (
    <section
      id="overview"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 opacity-5 dark:opacity-10"
              animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                background: `linear-gradient(45deg, ${i % 2 ? "#0f172a" : "#1e40af"}, transparent)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-8 md:pt-10">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold font-grotesk mb-6 text-slate-900 dark:text-white leading-tight"
        >
          Frontier tech becomes infrastructure.
        </motion.h1>

        {/* Trait horizontal animé + glow */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mb-6 h-0.5 w-28 bg-gradient-to-r from-blue-500 to-cyan-400 origin-center rounded-full"
        >
          <div
            className="absolute inset-0 blur-md bg-gradient-to-r from-blue-500/40 to-cyan-400/40 rounded-full"
            aria-hidden="true"
          />
        </motion.div>

        {/* Subline (nouvelle ligne) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl max-w-3xl mx-auto text-slate-700 dark:text-slate-300 leading-relaxed mb-10 font-medium italic"
        >
          We position capital where technologies evolve from scarcity to ubiquity.
        </motion.p>

        {/* Carte institutionnelle */}
        <BusinessCardIntro />
      </div>

      {/* Indicateur scroll (Option B : trois points en fade) */}
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



// === UNIVERSE PORTFOLIO — rendu type humla.vc (grille bordurée, logos centrés) ===
const PORTFOLIO_CATEGORIES = [
  {
    title: "AI Compute & Platforms",
    items: [
      { name: "x.ai", url: "https://x.ai/", logo: "xai.svg" },
      { name: "FedML", url: "https://fedml.ai/home", logo: "fedml.webp" },
    ],
  },
  {
    title: "Privacy-Preserving Compute",
    items: [{ name: "Proof", url: "https://proof.cloud/", logo: "proofcloud.png" }],
  },
  {
    title: "Applied AI Products",
    items: [
      { name: "Rowads", url: "https://rowads.app/", logo: "rowads.webp" },
      { name: "Knode", url: "https://www.knode.ai/", logo: "knode.webp" },
      { name: "Kinetix", url: "https://www.kinetix.tech/", logo: "kinetix.webp" },
    ],
  },
  {
    title: "Digital Identity",
    items: [
      { name: "TON", url: "https://ton.org/", logo: "ton.webp" },
      { name: "Freename", url: "https://freename.com/home/", logo: "freename.webp" },
    ],
  },
  {
    title: "Distributed Finance Infrastructure",
    items: [
      { name: "Kiln", url: "https://www.kiln.fi/", logo: "kiln.svg" },
      { name: "Gattaca", url: "https://gattaca.com/", logo: "gattaca.webp" },
      { name: "THORChain", url: "https://thorchain.org/", logo: "thorchain.webp" },
    ],
  },
  {
    title: "Data Intelligence",
    items: [{ name: "Absolute Labs", url: "https://absolutelabs.io/", logo: "absolutelabs.png" }],
  },
  {
    title: "Spatial Tech",
    items: [{ name: "Loft Orbital", url: "https://loftorbital.com/", logo: "loftorbital.jpg" }],
  },
  {
    title: "Autonomous Robotics",
    items: [{ name: "Figure", url: "https://www.figure.ai/", logo: "figure.webp" }],
  },
];

function PortfolioCell({ name, url, logo }) {
  const src = import.meta.env.BASE_URL + "images/logos/" + logo;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="m-px flex items-center justify-center h-28 sm:h-32 md:h-40 lg:h-48 
                 border border-slate-300 bg-white dark:bg-white  /* fond blanc comme Humla */
                 transition-transform duration-150 hover:scale-[1.02]"
      title={name}
      aria-label={name}
    >
      <img
        src={src}
        alt={name}
        className="max-h-10 sm:max-h-12 md:max-h-14 lg:max-h-16 w-auto object-contain
                   grayscale contrast-125 opacity-90
                   hover:grayscale-0 hover:opacity-100 transition-all duration-200"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

const UniversePortfolioGrid = () => {
  return (
    <Section id="universe" className="bg-white">
      <SectionTitle>Universe of Companies</SectionTitle>

      <div className="space-y-14">
        {PORTFOLIO_CATEGORIES.map((cat) => (
          <section key={cat.title}>
            {/* En-tête de catégorie */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base md:text-lg font-semibold font-grotesk text-slate-900">
                {cat.title}
              </h3>
              <span className="text-[11px] md:text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {cat.items.length}
              </span>
            </div>

            {/* Grille bordurée façon tableau (truc du -m-px pour lignes fines uniques) */}
            <div className="-m-px grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {cat.items.map((c) => (
                <PortfolioCell key={c.name} {...c} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-slate-500">
        ***
      </p>
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group relative bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
          >
            {/* Photo / Initiales */}
            {member.photo ? (
              <div className="w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-sm">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
                {/* Fallback initiales */}
                <div className="hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-2xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            ) : (
              <div className="w-24 h-24 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-2xl ring-4 ring-white dark:ring-slate-800">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}

            {/* Nom + Titre */}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center">
              {member.name}
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 text-center font-medium mb-3">
              {member.title}
            </p>

            {/* Blurb */}
            <p className="text-sm text-slate-600 dark:text-slate-300 text-center leading-relaxed">
              {member.blurb}
            </p>

            {/* LinkedIn */}
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
          <UniversePortfolioGrid />
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
