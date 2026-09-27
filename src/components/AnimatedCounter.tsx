import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0, className = "" }: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => {
        setDisplay(v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
      },
    });
    return controls.stop;
  }, [value, decimals]);

  return (
    <motion.span className={className}>
      {prefix}{display}{suffix}
    </motion.span>
  );
}
