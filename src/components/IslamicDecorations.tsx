import { motion } from "framer-motion";

export function IslamicArch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" fill="none" className={className}>
      <path
        d="M10 260 L10 120 Q10 10 100 10 Q190 10 190 120 L190 260"
        stroke="hsl(var(--gold))"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M30 260 L30 130 Q30 30 100 30 Q170 30 170 130 L170 260"
        stroke="hsl(var(--gold))"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />
    </svg>
  );
}

export function IslamicStar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
      <polygon
        points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35"
        stroke="hsl(var(--gold))"
        strokeWidth="1.5"
        fill="hsl(var(--gold) / 0.08)"
      />
    </svg>
  );
}

export function IslamicDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-gold/30" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="hsl(var(--gold))"
          opacity="0.6"
        />
      </svg>
      <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  );
}

export function GeometricBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 1200 40" className="w-full" preserveAspectRatio="none">
        {Array.from({ length: 30 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 40}, 0)`}>
            <path
              d="M0 20 L10 10 L20 0 L30 10 L40 20 L30 30 L20 40 L10 30 Z"
              stroke="hsl(var(--gold))"
              strokeWidth="0.5"
              fill="hsl(var(--gold) / 0.03)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function BismillahCalligraphy({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`text-center ${className}`}
    >
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gold/80 leading-relaxed" style={{ fontFamily: "'Amiri', serif" }}>
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </p>
    </motion.div>
  );
}

export function IslamicFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Corner ornaments */}
      <svg className="absolute top-0 left-0 w-12 h-12 text-gold/30" viewBox="0 0 50 50" fill="none">
        <path d="M0 0 L50 0 L50 10 Q25 10 10 25 L10 50 L0 50 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
        <path d="M0 0 L20 0 L20 5 Q10 5 5 15 L5 20 L0 20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
      <svg className="absolute top-0 right-0 w-12 h-12 text-gold/30 rotate-90" viewBox="0 0 50 50" fill="none">
        <path d="M0 0 L50 0 L50 10 Q25 10 10 25 L10 50 L0 50 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
        <path d="M0 0 L20 0 L20 5 Q10 5 5 15 L5 20 L0 20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-12 h-12 text-gold/30 -rotate-90" viewBox="0 0 50 50" fill="none">
        <path d="M0 0 L50 0 L50 10 Q25 10 10 25 L10 50 L0 50 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
        <path d="M0 0 L20 0 L20 5 Q10 5 5 15 L5 20 L0 20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-12 h-12 text-gold/30 rotate-180" viewBox="0 0 50 50" fill="none">
        <path d="M0 0 L50 0 L50 10 Q25 10 10 25 L10 50 L0 50 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05" />
        <path d="M0 0 L20 0 L20 5 Q10 5 5 15 L5 20 L0 20 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
      {children}
    </div>
  );
}
