import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Wheat, Plus, Minus, Sparkles } from "lucide-react";
import IslamicBackground from "@/components/IslamicBackground";
import Navbar from "@/components/Navbar";

import AnimatedCounter from "@/components/AnimatedCounter";

type Currency = "PKR" | "USD" | "GBP" | "AED";
type FoodType = "wheat" | "barley" | "dates" | "raisins";

const CURRENCY_SYMBOLS: Record<Currency, string> = { PKR: "₨", USD: "$", GBP: "£", AED: "د.إ" };

const FOOD_PRICES: Record<Currency, Record<FoodType, number>> = {
  PKR: { wheat: 320, barley: 400, dates: 1200, raisins: 1800 },
  USD: { wheat: 2.5, barley: 3, dates: 8, raisins: 12 },
  GBP: { wheat: 2, barley: 2.5, dates: 6.5, raisins: 10 },
  AED: { wheat: 9, barley: 11, dates: 30, raisins: 44 },
};

const FOOD_INFO: Record<FoodType, { label: string; emoji: string }> = {
  wheat: { label: "Wheat", emoji: "🌾" },
  barley: { label: "Barley", emoji: "🌿" },
  dates: { label: "Dates", emoji: "🌴" },
  raisins: { label: "Raisins", emoji: "🍇" },
};

export default function FitranaCalculator() {
  const [currency, setCurrency] = useState<Currency>("PKR");
  const [food, setFood] = useState<FoodType>("wheat");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const symbol = CURRENCY_SYMBOLS[currency];
  const pricePerPerson = FOOD_PRICES[currency][food];
  const totalPersons = adults + children;
  const totalFitrana = pricePerPerson * totalPersons;

  function Counter({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
    return (
      <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-muted/30 transition-colors">
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => { onChange(Math.max(0, value - 1)); setCalculated(false); }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors"
          >
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
          <motion.span
            key={value}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-base sm:text-lg font-bold text-foreground w-7 sm:w-8 text-center"
          >
            {value}
          </motion.span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => { onChange(value + 1); setCalculated(false); }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gold/15 flex items-center justify-center text-gold hover:bg-gold/25 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <IslamicBackground />
      <Navbar />

      <section className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium border border-gold/20 bg-gold/5 text-gold mb-4 sm:mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" /> Ramadan Obligation
            </motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 sm:mb-3">
              <span className="gradient-gold-text">Fitrana</span> Calculator
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-md mx-auto">
              Zakat al-Fitr is given before Eid prayer and is required for every Muslim in the household.
            </p>
          </motion.div>

          {/* Currency */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4 sm:p-5 mb-4 sm:mb-6">
            <label className="text-xs text-muted-foreground mb-2.5 sm:mb-3 block font-medium">Currency</label>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {(["PKR", "USD", "GBP", "AED"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => { setCurrency(c); setCalculated(false); }}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                    currency === c
                      ? "bg-gold/20 text-gold border border-gold/30 shadow-[0_0_12px_hsl(var(--gold)/0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Family members */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4 sm:p-6 mb-4 sm:mb-6 group hover:border-gold/20 transition-all duration-500">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              </div>
              <h3 className="font-serif text-base sm:text-lg text-foreground">Family Members</h3>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Counter value={adults} onChange={setAdults} label="Adults" />
              <Counter value={children} onChange={setChildren} label="Children" />
              <div className="pt-3 sm:pt-4 mt-1.5 sm:mt-2 border-t border-border/30 flex justify-between items-center px-2.5 sm:px-3">
                <span className="text-sm font-medium text-foreground">Total Persons</span>
                <motion.span
                  key={totalPersons}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="text-lg sm:text-xl font-bold text-gold"
                >
                  {totalPersons}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Food type */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4 sm:p-6 mb-4 sm:mb-6 group hover:border-gold/20 transition-all duration-500">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <Wheat className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              </div>
              <h3 className="font-serif text-base sm:text-lg text-foreground">Fitrana Type (≈2kg per person)</h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {(Object.keys(FOOD_INFO) as FoodType[]).map((f) => (
                <motion.button
                  key={f}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setFood(f); setCalculated(false); }}
                  className={`p-3.5 sm:p-5 rounded-xl text-left transition-all duration-300 border relative overflow-hidden ${
                    food === f
                      ? "border-gold/50 bg-gold/10 shadow-[0_0_20px_hsl(var(--gold)/0.1)]"
                      : "border-border/30 hover:border-border/60 hover:bg-muted/20"
                  }`}
                >
                  <span className="text-2xl sm:text-3xl block mb-1.5 sm:mb-2">{FOOD_INFO[f].emoji}</span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground block">{FOOD_INFO[f].label}</span>
                  <span className="text-xs text-muted-foreground">{symbol} {FOOD_PRICES[currency][f]} / person</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Calculate */}
          <motion.div className="text-center mb-6 sm:mb-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button className="btn-secondary-islamic text-base sm:text-lg px-10 sm:px-14 py-4 sm:py-5" onClick={() => setCalculated(true)}>
              Calculate Fitrana
            </button>
          </motion.div>

          {/* Result */}
          <AnimatePresence>
            {calculated && totalPersons > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-5 sm:p-8 md:p-10 glow-gold text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-l-2 border-gold/20 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-20 sm:h-20 border-b-2 border-r-2 border-gold/20 rounded-br-2xl" />

                <h2 className="font-serif text-xl sm:text-2xl text-gold mb-5 sm:mb-8">Your Fitrana</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-8">
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4 sm:p-5">
                    <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2">Per Person</p>
                    <p className="text-base sm:text-lg font-bold text-foreground">
                      {symbol} <AnimatedCounter value={pricePerPerson} decimals={0} />
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-4 sm:p-5">
                    <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2">Persons</p>
                    <p className="text-base sm:text-lg font-bold text-foreground">{totalPersons}</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-4 sm:p-5 border-gold/20">
                    <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2">Total Fitrana</p>
                    <p className="text-xl sm:text-2xl font-bold gradient-gold-text">
                      {symbol} <AnimatedCounter value={totalFitrana} decimals={0} />
                    </p>
                  </motion.div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on {FOOD_INFO[food].label} (≈2kg per person). Pay before Eid prayer.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
