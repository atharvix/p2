export const SITE = {
  founderName: 'Your Name',
  email: 'hello@atharvix.com',
  // Configured company profile URLs (centralized for easy customization)
  linkedinUrl: 'https://www.linkedin.com/company/atharvix',
  githubUrl: 'https://github.com/atharvix',
  web3formsEndpoint: 'https://api.web3forms.com/submit'
};

export const SERVICES = [
  { rank: 'A', suit: '♠', red: false, title: 'Product engineering', text: 'Web and mobile products built to stay fast and stable once real users arrive.' },
  { rank: 'K', suit: '♥', red: true,  title: 'Interface design', text: 'Interfaces that earn trust on first look and stay out of the way after that.' },
  { rank: 'Q', suit: '♣', red: false, title: 'AI and automation', text: 'Models, agents and workflows wired into the work your team already does.' },
  { rank: 'J', suit: '♦', red: true,  title: 'Cloud and infrastructure', text: 'Pipelines, deployments and monitoring that keep the lights on overnight.' }
];

export const PROJECTS = [
  {
    image: '/assets/projects/project-1.jpg',
    title: 'Obsidian matching engine',
    meta: 'Order book infrastructure, 2025',
    text: 'A limit order book and matching engine in Rust, handling over 180,000 orders a second with sub-millisecond matching and a live depth chart in the browser.',
    tags: ['Rust', 'Tokio', 'WebGL2', 'gRPC'],
    live: '#', source: '#'
  },
  {
    image: '/assets/projects/project-2.jpg',
    title: 'Solver, an odds engine',
    meta: 'Game theory calculator, 2024',
    text: 'A browser-native equity solver compiled to WebAssembly. It runs 10,000 simulated outcomes in under two seconds without a single server round trip.',
    tags: ['WebAssembly', 'Rust', 'React', 'Web Workers'],
    live: '#', source: '#'
  },
  {
    image: '/assets/projects/project-3.jpg',
    title: 'Aegis verifiable shuffle',
    meta: 'Cryptography, 2024',
    text: 'A fair-deal protocol using zero-knowledge proofs, so every player can verify a shuffled deck without any party seeing cards that have not been revealed.',
    tags: ['zk-SNARKs', 'Circom', 'Solidity', 'Next.js'],
    live: '#', source: '#'
  },
  {
    image: '/assets/projects/project-4.jpg',
    title: 'Hyperion cluster map',
    meta: 'Observability, 2023',
    text: 'Kernel-level network tracing for Kubernetes, rendered as a live 3D map of every service call, at under 0.3% CPU overhead.',
    tags: ['Go', 'eBPF', 'Three.js', 'Kubernetes'],
    live: '#', source: '#'
  }
];

export const STACK = [
  { label: 'Rust', sub: 'SYSTEMS', color: '#F0E7D5', ink: '#17090F', title: 'Low-latency core', text: 'Rust, Go, C++, WebAssembly, gRPC' },
  { label: 'TS', sub: 'INTERFACE', color: '#8A3948', ink: '#F0E7D5', title: 'Front end', text: 'TypeScript, React, Next.js, Three.js, GLSL' },
  { label: 'SQL', sub: 'DATA', color: '#2B101D', ink: '#C5A15A', title: 'Data and streaming', text: 'PostgreSQL, Kafka, Redis, ClickHouse' },
  { label: 'K8s', sub: 'CLOUD', color: '#421522', ink: '#F0E7D5', title: 'Cloud and DevOps', text: 'Kubernetes, AWS, Terraform, Docker' }
];

export const RECORD = [
  { when: '2024 to now', where: 'Atharvix Technologies', title: 'Founder', text: 'Started the studio to take on product work end to end, from first conversation to production.' },
  { when: '2023 to 2024', where: 'Kronos Quantitative Labs', title: 'Principal systems architect', text: 'Rebuilt a real-time liquidity engine, replacing a Node.js bottleneck with a Rust worker mesh and lifting throughput by 410%.' },
  { when: '2021 to 2023', where: 'Valkyrie Cloud Security', title: 'Senior full-stack engineer', text: 'Built a threat-hunting map that renders 50,000 live network nodes at 60 frames a second.' },
  { when: '2019 to 2021', where: 'Nexus Fintech', title: 'Systems and front-end developer', text: 'Shipped high-frequency order book interfaces and cut client memory use by 58% with canvas-rendered tables.' }
];

export const GALLERY = [
  { image: '/assets/gallery/g1.jpg', meta: 'Hackathon, 2025', title: 'Forty-eight hours, one prototype', text: 'Placed first out of 120 teams with a real-time fraud detection demo.' },
  { image: '/assets/gallery/g2.jpg', meta: 'Talk, 2025', title: 'Speaking on latency', text: 'A session on why the last millisecond is the most expensive one.' },
  { image: '/assets/gallery/g3.jpg', meta: 'Client launch, 2024', title: 'Going live', text: 'The night a client platform crossed its first ten thousand users.' },
  { image: '/assets/gallery/g4.jpg', meta: 'Workshop, 2024', title: 'Teaching the fundamentals', text: 'A hands-on afternoon on building systems that fail gracefully.' },
  { image: '/assets/gallery/g5.jpg', meta: 'Studio, 2024', title: 'Where the work happens', text: 'Whiteboards, late nights and more coffee than anyone admits to.' },
  { image: '/assets/gallery/g6.jpg', meta: 'Conference, 2023', title: 'In the room', text: 'Meeting the people building the next decade of infrastructure.' }
];
