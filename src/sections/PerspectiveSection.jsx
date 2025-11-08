import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as HoverCard from '@radix-ui/react-hover-card';
import { Section, SectionHeader } from '../components/common/Section.jsx';
import { HISTORY_DATA, PERSPECTIVE_DATA } from '../lib/constants.js';

const PerspectiveManifold = () => {
  const anchors = [180, 500, 820];

  return (
    <div className="my-16">
      <div className="text-center mb-12">
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
          Frontier technologies begin as scarce, experimental, and resource-intensive. Their trajectories are shaped by opposing forces: scalability versus cost, performance versus accessibility, openness versus control.
        </p>
        <p className="mt-4 max-w-4xl mx-auto text-base md:text-lg italic text-slate-600 dark:text-slate-400">
          <span aria-hidden="true" className="mr-1">
            ➝
          </span>
          When these tensions are aligned, what was once rare becomes broadly standardized and globally distributed. At that point, the technology is no longer optional, and becomes embedded infrastructure.
        </p>
      </div>

      <motion.svg
        viewBox="0 0 1000 300"
        className="w-full h-[300px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <defs>
          <style>{`.label-strong{font-weight:700;font-size:14px}`}</style>
          <radialGradient id="haloFrontier" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.40)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </radialGradient>
          <radialGradient id="haloInfra" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </radialGradient>
        </defs>

        <motion.line
          x1="60"
          y1="150"
          x2="940"
          y2="150"
          stroke="currentColor"
          className="text-slate-300 dark:text-slate-600"
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
          }}
          style={{ pathLength: 1 }}
        />

        <polygon points="940,150 920,144 920,156" className="fill-slate-400 dark:fill-slate-500" />

        <g>
          <circle cx="95" cy="150" r="46" fill="url(#haloFrontier)" />
          <circle cx="95" cy="150" r="5" className="fill-emerald-500" />
          <text x="95" y="155" textAnchor="middle" className="label-strong fill-slate-900 dark:fill-white">
            Frontier Tech
          </text>
        </g>

        <g>
          <circle cx="905" cy="150" r="52" fill="url(#haloInfra)" />
          <circle cx="905" cy="150" r="5" className="fill-blue-500" />
          <text x="905" y="155" textAnchor="middle" className="label-strong fill-slate-900 dark:fill-white">
            Infrastructure
          </text>
        </g>

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
                visible: { pathLength: 1, opacity: 1, transition: { duration: 1, delay: 0.2 + i * 0.15 } },
              }}
            />
            <foreignObject x={anchors[i] + 0} y={56} width="160" height="40">
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <div className="mx-auto w-max px-3 py-1.5 rounded-full border border-emerald-300/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur cursor-pointer text-[13px] font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition">
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
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 mt-3"
                      >
                        Learn more
                      </a>
                    )}
                    <HoverCard.Arrow className="fill-white dark:fill-slate-800" />
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </foreignObject>
          </g>
        ))}

        {PERSPECTIVE_DATA.counterforces.map((o, i) => (
          <g key={o.title}>
            <motion.path
              d={`M ${anchors[i]} 150 C ${anchors[i]} 220, ${anchors[i] + 80} 220, ${anchors[i] + 80} 150`}
              fill="none"
              className="stroke-rose-500 dark:stroke-rose-400"
              strokeWidth="2.5"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 1, transition: { duration: 1, delay: 0.4 + i * 0.15 } },
              }}
            />
            <foreignObject x={anchors[i] + 0} y={200} width="160" height="40">
              <HoverCard.Root>
                <HoverCard.Trigger asChild>
                  <div className="mx-auto w-max px-3 py-1.5 rounded-full border border-rose-300/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur cursor-pointer text-[13px] font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition">
                    {o.title}
                  </div>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content
                    side="bottom"
                    className="z-50 w-64 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-xl border border-slate-200 dark:border-slate-700"
                    sideOffset={6}
                  >
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{o.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{o.note}</p>
                    {o.link && (
                      <a
                        href={o.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-rose-600 dark:text-rose-300 mt-3"
                      >
                        Learn more
                      </a>
                    )}
                    <HoverCard.Arrow className="fill-white dark:fill-slate-800" />
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </foreignObject>
          </g>
        ))}
      </motion.svg>
    </div>
  );
};

const PerspectiveSection = () => {
  const ribbonRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const el = ribbonRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches || !autoPlay) return;

    const step = () => {
      const max = el.scrollWidth - el.clientWidth;
      const atEnd = Math.abs(el.scrollLeft - max) < 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const delta = Math.min(el.clientWidth * 0.9, max - el.scrollLeft);
        el.scrollBy({ left: delta, behavior: 'smooth' });
      }
    };

    const id = setInterval(step, 4500);
    return () => clearInterval(id);
  }, [autoPlay]);

  return (
    <Section id="perspective" className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-200/40 dark:bg-grid-slate-800/40 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-blue-200/30 to-transparent dark:from-blue-900/20" />
      </div>

      <div className="relative z-10">
        <SectionHeader title="Perspective" subtitle="Frontier Tech Becomes Infrastructure." />
        <div className="mt-2 mb-8">
          <PerspectiveManifold />
        </div>

        <div className="max-w-6xl mx-auto">
          <p className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            From scarcity to ubiquity — examples of frontier tech becoming everyday infrastructure.
          </p>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent" />

            <div
              ref={ribbonRef}
              className="overflow-x-auto pb-4"
              role="region"
              aria-label="Historical examples — From scarcity to ubiquity"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
              onFocusCapture={() => setAutoPlay(false)}
              onBlurCapture={() => setAutoPlay(true)}
            >
              <div className="flex gap-6 snap-x snap-mandatory px-1">
                {HISTORY_DATA.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="snap-start shrink-0 w-80 md:w-[420px] bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="mb-5">
                      <img
                        src={item.beforeImage}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-xl border border-slate-200 dark:border-slate-600"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h4 className="text-lg font-bold font-grotesk text-slate-900 dark:text-white mb-3">
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
        </div>
      </div>
    </Section>
  );
};

export default PerspectiveSection;
