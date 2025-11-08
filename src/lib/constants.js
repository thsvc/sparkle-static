const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const PERSPECTIVE_DATA = {
  opportunities: [
    {
      title: 'Composability',
      note: 'Modular building blocks and open interfaces let capabilities plug together and scale across ecosystems.',
      link: 'https://ethereum.org/en/developers/docs/scaling/',
    },
    {
      title: 'Scalability',
      note: 'Standards + orchestration enable predictable growth and multi-domain deployment at low friction.',
      link: 'https://kubernetes.io/docs/concepts/',
    },
    {
      title: 'Efficiency',
      note: 'Falling cost/performance curves expand markets and unlock new use-cases as infra gets cheaper.',
      link: 'https://en.wikipedia.org/wiki/Moore%27s_law',
    },
  ],
  counterforces: [
    {
      title: 'Commoditization',
      note: 'As primitives standardize, differentiation shifts to integration, orchestration, data and trust layers.',
      link: 'https://en.wikipedia.org/wiki/Commoditization',
    },
    {
      title: 'Lock-in',
      note: 'Aggregation gravity and switching costs concentrate power; portability requires early design choices.',
      link: 'https://en.wikipedia.org/wiki/Vendor_lock-in',
    },
    {
      title: 'Deflation',
      note: 'Each generation compresses unit margins; value migrates up-stack into systems, networks and services.',
      link: 'https://en.wikipedia.org/wiki/Experience_curve_effects',
    },
  ],
};

export const PORTFOLIO_CATEGORIES = [
  {
    title: 'AI Compute & Platforms',
    items: [
      { name: 'x.ai', url: 'https://x.ai/', logo: 'xai.svg' },
      { name: 'FedML', url: 'https://fedml.ai/home', logo: 'fedml.webp' },
    ],
  },
  {
    title: 'Privacy-Preserving Compute',
    items: [{ name: 'Proof', url: 'https://proof.cloud/', logo: 'proofcloud.png' }],
  },
  {
    title: 'Applied AI Products',
    items: [
      { name: 'Rowads', url: 'https://rowads.app/', logo: 'rowads.webp' },
      { name: 'Knode', url: 'https://www.knode.ai/', logo: 'knode.webp' },
      { name: 'Kinetix', url: 'https://www.kinetix.tech/', logo: 'kinetix.webp' },
    ],
  },
  {
    title: 'Digital Identity',
    items: [
      { name: 'TON', url: 'https://ton.org/', logo: 'ton.webp' },
      { name: 'Freename', url: 'https://freename.com/home/', logo: 'freename.webp' },
    ],
  },
  {
    title: 'Distributed Finance Infrastructure',
    items: [
      { name: 'Kiln', url: 'https://www.kiln.fi/', logo: 'kiln.svg' },
      { name: 'Gattaca', url: 'https://gattaca.com/', logo: 'gattaca.webp' },
      { name: 'THORChain', url: 'https://thorchain.org/', logo: 'thorchain.webp' },
    ],
  },
  {
    title: 'Data Intelligence',
    items: [{ name: 'Absolute Labs', url: 'https://absolutelabs.io/', logo: 'absolutelabs.png' }],
  },
  {
    title: 'Spatial Tech',
    items: [{ name: 'Loft Orbital', url: 'https://loftorbital.com/', logo: 'loftorbital.jpg' }],
  },
  {
    title: 'Autonomous Robotics',
    items: [{ name: 'Figure', url: 'https://www.figure.ai/', logo: 'figure.webp' }],
  },
];

export const TEAM_MEMBERS = [
  {
    name: 'Dr. Victoria Reullin',
    title: 'Operating Partner',
    blurb: 'Former independent Semiologist and Talent Manager at Allianz.',
    photo: asset('images/team/victoria-reullin.png'),
    linkedin: 'https://www.linkedin.com/in/victoria-r-b72173274/',
  },
  {
    name: 'Eng. Julien Pageaud',
    title: 'Managing Partner',
    blurb:
      'Former Computer Vision Engineer at Safran Defense, Director at Goldman Sachs, and CIO at Nomura DO.',
    photo: asset('images/team/julien-pageaud.png'),
    linkedin: 'https://www.linkedin.com/in/julien-pageaud-5ba56b10/',
  },
  {
    name: 'Eng. Thibaut Chessé',
    title: 'Research Partner',
    blurb: 'Former Head of adoption and technical support at Nomadic Labs and Computer Scientist at IBM.',
    photo: asset('images/team/thibaut-chesse.png'),
    linkedin: 'https://fr.linkedin.com/in/thibautchesse',
  },
  {
    name: 'Prof. Michal Valko',
    title: 'AI/ML Venture Partner',
    blurb: 'Former Principal Engineer Llama at Meta, and Research Director at Google DeepMind.',
    photo: asset('images/team/michal-valko.png'),
    linkedin: 'https://www.linkedin.com/in/michalvalko/',
  },
  {
    name: 'Dr. Armand Joulin',
    title: 'AI/ML Research Advisor',
    blurb: 'Research Director for Google DeepMind, and former head of EMEA at Facebook AI Research.',
    photo: asset('images/team/armand-joulin.png'),
    linkedin: 'https://www.linkedin.com/in/armand-joulin-0274254/',
  },
  {
    name: 'Aurélie Astruc',
    title: 'Board Member',
    blurb: 'Corporate Director at Edmond de Rothschild.',
    photo: asset('images/team/aurelie-astruc.png'),
    linkedin: 'https://www.linkedin.com/in/aurelieastruc/',
  },
  {
    name: 'Prof. Steve Liu',
    title: 'AI/ML Research Advisor',
    blurb: 'Professor & Associate VP Research at MBZUAI, Professor at McGill University.',
    photo: asset('images/team/steve-liu.png'),
    linkedin: 'https://ca.linkedin.com/in/xueliu',
  },
  {
    name: 'Hugo Vautier',
    title: 'Board Member',
    blurb: 'Partner at Opportunity Financial Services.',
    photo: asset('images/team/hugo-vautier.png'),
    linkedin: 'https://www.linkedin.com/in/hugo-vautier-01a74042/',
  },
  {
    name: 'Dr. Gerald Heng',
    title: 'General Counsel',
    blurb: 'Former Lawyer at Baker McKenzie Wong & Leow.',
    photo: asset('images/team/gerald-heng.png'),
    linkedin: 'https://www.linkedin.com/in/gerald-heng-b14577a3/',
  },
];

export const HISTORY_DATA = [
  {
    title: 'Automotive, 13 years to ubiquity (1900–1913)',
    beforeImage: asset('images/automotive.png'),
    caption:
      "In 1900, cars were a rarity on New York's Fifth Avenue. By 1913, they had become the norm, reshaping mobility, industry, and the urban landscape. From scarcity to ubiquity in barely a decade.",
  },
  {
    title: 'Semiconductors, 75 years to mass adoption (1947–Today)',
    beforeImage: asset('images/semiconductors.png'),
    caption:
      'The transistor began as a fragile experiment at Bell Labs in 1947. Today, billions are manufactured daily, powering everything from smartphones to satellites. What was once scarce is now the invisible backbone of modern life.',
  },
  {
    title: 'Satellites, 60 years to global scale (1962–Today)',
    beforeImage: asset('images/satellites.png'),
    caption:
      'The Telstar satellite of 1962 opened the era of space-based communications. Today, constellations of satellites provide global internet, defense, and earth observation—once experimental, now indispensable.',
  },
];
