import { motion } from "framer-motion";

const Star = ({ x, y, delay, size }: { x: string; y: string; delay: number; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{ left: x, top: y, width: size, height: size, background: "hsl(var(--gold-light))" }}
    animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.8, 1.3, 0.8] }}
    transition={{ duration: 2.5 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const Lantern = ({ x, delay, scale = 1 }: { x: string; delay: number; scale?: number }) => (
  <motion.div
    className="absolute animate-lantern-sway"
    style={{ left: x, top: "3%", transformOrigin: "top center", animationDelay: `${delay}s` }}
  >
    <svg width={30 * scale} height={60 * scale} viewBox="0 0 30 60" fill="none">
      <line x1="15" y1="0" x2="15" y2="12" stroke="hsl(var(--gold))" strokeWidth="1" />
      <path d="M8 12 Q15 8 22 12 Q25 30 22 45 Q15 50 8 45 Q5 30 8 12Z" fill="hsl(var(--gold) / 0.12)" stroke="hsl(var(--gold) / 0.4)" strokeWidth="0.5" />
      <motion.circle cx="15" cy="28" r="3" fill="hsl(var(--gold))" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, delay, repeat: Infinity }} />
      <motion.circle cx="15" cy="28" r="8" fill="hsl(var(--gold) / 0.08)" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, delay, repeat: Infinity }} />
    </svg>
  </motion.div>
);

const MosqueSilhouette = () => (
  <div className="absolute bottom-0 left-0 right-0 opacity-[0.08]">
    <svg viewBox="0 0 1400 300" className="w-full" fill="hsl(var(--emerald))">
      {/* Central large mosque */}
      <ellipse cx="700" cy="160" rx="100" ry="90" />
      <rect x="600" y="160" width="200" height="140" />
      {/* Central finial */}
      <line x1="700" y1="60" x2="700" y2="75" stroke="hsl(var(--gold))" strokeWidth="1.5" />
      <circle cx="700" cy="58" r="4" fill="hsl(var(--gold) / 0.4)" />
      {/* Main minarets */}
      <rect x="555" y="60" width="14" height="240" />
      <ellipse cx="562" cy="58" rx="10" ry="8" />
      <circle cx="562" cy="48" r="5" fill="hsl(var(--gold) / 0.3)" />
      <rect x="831" y="60" width="14" height="240" />
      <ellipse cx="838" cy="58" rx="10" ry="8" />
      <circle cx="838" cy="48" r="5" fill="hsl(var(--gold) / 0.3)" />
      {/* Side domes */}
      <ellipse cx="500" cy="190" rx="55" ry="50" />
      <rect x="445" y="190" width="110" height="110" />
      <ellipse cx="900" cy="190" rx="55" ry="50" />
      <rect x="845" y="190" width="110" height="110" />
      {/* Far side domes */}
      <ellipse cx="350" cy="210" rx="40" ry="35" />
      <rect x="310" y="210" width="80" height="90" />
      <ellipse cx="1050" cy="210" rx="40" ry="35" />
      <rect x="1010" y="210" width="80" height="90" />
      {/* Small minarets */}
      <rect x="410" y="120" width="8" height="180" />
      <circle cx="414" cy="118" r="6" />
      <rect x="982" y="120" width="8" height="180" />
      <circle cx="986" cy="118" r="6" />
      {/* Far buildings */}
      <rect x="50" y="230" width="260" height="70" rx="2" />
      <rect x="1090" y="230" width="260" height="70" rx="2" />
      <ellipse cx="180" cy="235" rx="35" ry="28" />
      <ellipse cx="1220" cy="235" rx="35" ry="28" />
      {/* Base */}
      <rect x="0" y="280" width="1400" height="20" />
      {/* Arched windows on main mosque */}
      <ellipse cx="670" cy="220" rx="12" ry="18" fill="hsl(var(--night-deep))" opacity="0.4" />
      <ellipse cx="700" cy="220" rx="12" ry="18" fill="hsl(var(--night-deep))" opacity="0.4" />
      <ellipse cx="730" cy="220" rx="12" ry="18" fill="hsl(var(--night-deep))" opacity="0.4" />
    </svg>
  </div>
);

const CrescentMoon = () => (
  <motion.div
    className="absolute top-8 right-[12%] animate-glow-pulse"
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
      <path d="M47 5 A28 28 0 1 0 47 65 A22 22 0 1 1 47 5Z" fill="hsl(var(--gold))" opacity="0.85" />
      {/* Star next to crescent */}
      <polygon points="20,15 22,20 27,20 23,23 24,28 20,25 16,28 17,23 13,20 18,20" fill="hsl(var(--gold))" opacity="0.7" />
    </svg>
    <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: "hsl(var(--gold) / 0.25)" }} />
  </motion.div>
);

const FloatingParticle = ({ x, delay }: { x: string; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full"
    style={{ left: x, bottom: "25%", background: "hsl(var(--gold) / 0.4)" }}
    animate={{ y: [0, -250, -500], opacity: [0, 0.5, 0], x: [0, Math.random() * 50 - 25] }}
    transition={{ duration: 7 + Math.random() * 4, delay, repeat: Infinity, ease: "easeOut" }}
  />
);

/* Islamic octagonal geometric pattern */
const IslamicPatternOverlay = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
      <defs>
        <pattern id="islamic-geo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Octagon */}
          <polygon points="30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30" stroke="hsl(var(--gold))" strokeWidth="0.6" fill="none" />
          {/* Inner star */}
          <polygon points="50,10 58,35 80,20 65,42 90,50 65,58 80,80 58,65 50,90 42,65 20,80 35,58 10,50 35,42 20,20 42,35" stroke="hsl(var(--gold))" strokeWidth="0.4" fill="none" />
          {/* Center circle */}
          <circle cx="50" cy="50" r="8" stroke="hsl(var(--gold))" strokeWidth="0.4" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-geo)" />
    </svg>
  </div>
);

/* Large decorative arches on sides */
const SideArches = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Left arch */}
    <svg className="absolute left-0 top-1/4 w-20 h-96 opacity-[0.06]" viewBox="0 0 80 400" fill="none">
      <path d="M80 400 L80 150 Q80 0 0 0 L0 400 Z" fill="hsl(var(--gold))" />
      {/* Arch window cutouts */}
      <ellipse cx="40" cy="180" rx="15" ry="25" fill="hsl(var(--night-deep))" />
      <ellipse cx="40" cy="260" rx="15" ry="25" fill="hsl(var(--night-deep))" />
      <ellipse cx="40" cy="340" rx="15" ry="25" fill="hsl(var(--night-deep))" />
    </svg>
    {/* Right arch */}
    <svg className="absolute right-0 top-1/4 w-20 h-96 opacity-[0.06]" viewBox="0 0 80 400" fill="none">
      <path d="M0 400 L0 150 Q0 0 80 0 L80 400 Z" fill="hsl(var(--gold))" />
      <ellipse cx="40" cy="180" rx="15" ry="25" fill="hsl(var(--night-deep))" />
      <ellipse cx="40" cy="260" rx="15" ry="25" fill="hsl(var(--night-deep))" />
      <ellipse cx="40" cy="340" rx="15" ry="25" fill="hsl(var(--night-deep))" />
    </svg>
  </div>
);

/* Floating calligraphy-style decorative circles */
const DecorativeRings = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-[20%] left-[5%] w-40 h-40 rounded-full border border-gold/[0.04]"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute top-[60%] right-[8%] w-60 h-60 rounded-full border border-emerald/[0.05]"
      animate={{ rotate: -360 }}
      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute top-[40%] left-[50%] w-80 h-80 -translate-x-1/2 rounded-full border border-gold/[0.03]"
      animate={{ rotate: 360 }}
      transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const stars = [
  { x: "5%", y: "8%", delay: 0, size: 2 }, { x: "15%", y: "15%", delay: 0.5, size: 3 },
  { x: "25%", y: "5%", delay: 1, size: 2 }, { x: "35%", y: "20%", delay: 1.5, size: 1.5 },
  { x: "45%", y: "10%", delay: 0.3, size: 2.5 }, { x: "55%", y: "18%", delay: 0.8, size: 2 },
  { x: "65%", y: "7%", delay: 1.2, size: 3 }, { x: "75%", y: "22%", delay: 0.6, size: 1.5 },
  { x: "85%", y: "12%", delay: 1.8, size: 2 }, { x: "92%", y: "25%", delay: 0.4, size: 2.5 },
  { x: "10%", y: "30%", delay: 2, size: 1.5 }, { x: "50%", y: "3%", delay: 1.1, size: 2 },
  { x: "80%", y: "30%", delay: 0.9, size: 1.5 }, { x: "30%", y: "35%", delay: 1.7, size: 2 },
  { x: "20%", y: "42%", delay: 0.7, size: 1.5 }, { x: "70%", y: "38%", delay: 1.4, size: 2 },
  { x: "40%", y: "45%", delay: 0.2, size: 1.5 }, { x: "60%", y: "40%", delay: 1.9, size: 2 },
  { x: "3%", y: "50%", delay: 0.5, size: 1.5 }, { x: "95%", y: "48%", delay: 1.3, size: 2 },
];

const particles = [
  { x: "10%", delay: 0 }, { x: "25%", delay: 2 }, { x: "40%", delay: 4 },
  { x: "55%", delay: 1 }, { x: "70%", delay: 3 }, { x: "85%", delay: 5 },
  { x: "50%", delay: 2.5 }, { x: "30%", delay: 6 }, { x: "15%", delay: 7 },
  { x: "75%", delay: 3.5 },
];

export default function IslamicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Radial gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, hsl(var(--emerald) / 0.12) 0%, transparent 55%),
                       radial-gradient(ellipse at 85% 15%, hsl(var(--gold) / 0.06) 0%, transparent 35%),
                       radial-gradient(ellipse at 15% 85%, hsl(var(--emerald) / 0.06) 0%, transparent 35%),
                       radial-gradient(ellipse at 50% 100%, hsl(var(--emerald) / 0.08) 0%, transparent 40%)`,
        }}
      />
      <IslamicPatternOverlay />
      <SideArches />
      <DecorativeRings />
      {stars.map((s, i) => <Star key={i} {...s} />)}
      {particles.map((p, i) => <FloatingParticle key={`p-${i}`} {...p} />)}
      <CrescentMoon />
      <Lantern x="5%" delay={0} scale={0.9} />
      <Lantern x="93%" delay={1.5} scale={0.8} />
      <Lantern x="20%" delay={2.5} scale={0.55} />
      <Lantern x="48%" delay={3} scale={0.6} />
      <Lantern x="78%" delay={4} scale={0.5} />
      <MosqueSilhouette />
    </div>
  );
}
