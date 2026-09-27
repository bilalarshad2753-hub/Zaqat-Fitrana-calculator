import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, Gem, TrendingUp, Building, HandCoins, CreditCard, Info, CheckCircle2, AlertCircle } from "lucide-react";
import IslamicBackground from "@/components/IslamicBackground";
import Navbar from "@/components/Navbar";

import AnimatedCounter from "@/components/AnimatedCounter";

type Currency = "PKR" | "USD" | "GBP" | "AED";

const GOLD_NISAB_GRAMS = 87.48;
const SILVER_NISAB_GRAMS = 612.36;

const PRICES: Record<Currency, { gold: number; silver: number }> = {
  PKR: { gold: 22000, silver: 260 },
  USD: { gold: 78, silver: 0.92 },
  GBP: { gold: 62, silver: 0.73 },
  AED: { gold: 286, silver: 3.38 },
};

const CURRENCY_SYMBOLS: Record<Currency, string> = { PKR: "₨", USD: "$", GBP: "£", AED: "د.إ" };

interface InputCardProps {
  icon: React.ElementType;
  title: string;
  fields: { label: string; key: string }[];
  values: Record<string, number>;
  onChange: (key: string, val: number) => void;
  index: number;
}

function InputCard({ icon: Icon, title, fields, values, onChange, index }: InputCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="glass-card p-4 sm:p-6 group hover:border-gold/20 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/3 group-hover:to-transparent transition-all duration-700" />
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-500">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
          </div>
          <h3 className="font-serif text-base sm:text-lg text-foreground">{title}</h3>
        </div>
        <div className="space-y-2.5 sm:space-y-3">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-xs text-muted-foreground mb-1 sm:mb-1.5 block font-medium">{f.label}</label>
              <input
                type="number"
                min={0}
                className="islamic-input"
                placeholder="0"
                value={values[f.key] || ""}
                onChange={(e) => onChange(f.key, parseFloat(e.target.value) || 0)}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ZakatCalculator() {
  const [currency, setCurrency] = useState<Currency>("PKR");
  const [nisabMethod, setNisabMethod] = useState<"gold" | "silver">("gold");
  const [values, setValues] = useState<Record<string, number>>({});
  const [calculated, setCalculated] = useState(false);

  const handleChange = (key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setCalculated(false);
  };

  const prices = PRICES[currency];
  const symbol = CURRENCY_SYMBOLS[currency];

  const nisab = nisabMethod === "gold"
    ? GOLD_NISAB_GRAMS * prices.gold
    : SILVER_NISAB_GRAMS * prices.silver;

  const totalAssets = useMemo(() => {
    const cash = (values.cashHand || 0) + (values.cashBank || 0) + (values.savings || 0);
    const gold = (values.goldGrams || 0) * prices.gold;
    const silver = (values.silverGrams || 0) * prices.silver;
    const investments = (values.stocks || 0) + (values.crypto || 0) + (values.bizInvest || 0);
    const business = (values.inventory || 0) + (values.tradeGoods || 0);
    const receivables = values.loansGiven || 0;
    return cash + gold + silver + investments + business + receivables;
  }, [values, prices]);

  const totalLiabilities = (values.loansOwed || 0) + (values.creditCard || 0) + (values.billsDue || 0);
  const zakatableWealth = Math.max(0, totalAssets - totalLiabilities);
  const zakatDue = zakatableWealth >= nisab ? zakatableWealth * 0.025 : 0;
  const isAboveNisab = zakatableWealth >= nisab;

  const sections: Omit<InputCardProps, "index">[] = [
    {
      icon: Banknote, title: "Cash & Savings",
      fields: [
        { label: "Cash in hand", key: "cashHand" },
        { label: "Cash in bank accounts", key: "cashBank" },
        { label: "Savings", key: "savings" },
      ],
      values, onChange: handleChange,
    },
    {
      icon: Gem, title: "Gold & Silver",
      fields: [
        { label: "Gold owned (grams)", key: "goldGrams" },
        { label: "Silver owned (grams)", key: "silverGrams" },
      ],
      values, onChange: handleChange,
    },
    {
      icon: TrendingUp, title: "Investments",
      fields: [
        { label: "Stocks", key: "stocks" },
        { label: "Cryptocurrency", key: "crypto" },
        { label: "Business investments", key: "bizInvest" },
      ],
      values, onChange: handleChange,
    },
    {
      icon: Building, title: "Business Assets",
      fields: [
        { label: "Inventory value", key: "inventory" },
        { label: "Trade goods", key: "tradeGoods" },
      ],
      values, onChange: handleChange,
    },
    {
      icon: HandCoins, title: "Money Owed to You",
      fields: [{ label: "Loans you gave others", key: "loansGiven" }],
      values, onChange: handleChange,
    },
    {
      icon: CreditCard, title: "Liabilities (Deductible)",
      fields: [
        { label: "Loans you owe", key: "loansOwed" },
        { label: "Credit card debt", key: "creditCard" },
        { label: "Bills due", key: "billsDue" },
      ],
      values, onChange: handleChange,
    },
  ];

  return (
    <div className="min-h-screen relative">
      <IslamicBackground />
      <Navbar />

      <section className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium border border-gold/20 bg-gold/5 text-gold mb-4 sm:mb-6"
            >
              2.5% of your zakatable wealth
            </motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 sm:mb-3">
              <span className="gradient-gold-text">Zakat</span> Calculator
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-md mx-auto">Enter your assets and liabilities to calculate your obligatory Zakat</p>
          </motion.div>

          {/* Currency & Nisab selectors */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card p-4 sm:p-5 flex-1"
            >
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
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card p-4 sm:p-5 flex-1"
            >
              <label className="text-xs text-muted-foreground mb-2.5 sm:mb-3 flex items-center gap-1.5 font-medium">
                Nisab Method
                <span className="relative group">
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 sm:w-56 p-2.5 sm:p-3 rounded-xl bg-card text-xs text-muted-foreground border border-border hidden group-hover:block z-50 shadow-xl">
                    Nisab is the minimum wealth threshold. Gold = 87.48g, Silver = 612.36g. Silver nisab is lower, so more people qualify.
                  </span>
                </span>
              </label>
              <div className="flex gap-1.5 sm:gap-2">
                {(["gold", "silver"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setNisabMethod(m); setCalculated(false); }}
                    className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs font-medium capitalize transition-all duration-300 ${
                      nisabMethod === m
                        ? "bg-gold/20 text-gold border border-gold/30 shadow-[0_0_12px_hsl(var(--gold)/0.15)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {m} Nisab
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2.5 sm:mt-3">
                Nisab: {symbol} <AnimatedCounter value={nisab} decimals={0} className="text-gold font-semibold" />
              </p>
            </motion.div>
          </div>

          {/* Input sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {sections.map((s, i) => (
              <InputCard key={s.title} {...s} index={i} />
            ))}
          </div>

          {/* Calculate button */}
          <motion.div
            className="text-center mb-8 sm:mb-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button className="btn-secondary-islamic text-base sm:text-lg px-10 sm:px-14 py-4 sm:py-5" onClick={() => setCalculated(true)}>
              Calculate Zakat
            </button>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {calculated && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-5 sm:p-8 md:p-10 glow-gold relative overflow-hidden"
              >
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-l-2 border-gold/20 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-20 sm:h-20 border-b-2 border-r-2 border-gold/20 rounded-br-2xl" />

                <h2 className="font-serif text-xl sm:text-2xl text-center text-gold mb-6 sm:mb-10">Your Zakat Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-4 sm:p-6"
                  >
                    <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2">Total Wealth</p>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">
                      {symbol} <AnimatedCounter value={zakatableWealth} decimals={0} />
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-4 sm:p-6"
                  >
                    <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2">Nisab Threshold</p>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">
                      {symbol} <AnimatedCounter value={nisab} decimals={0} />
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-4 sm:p-6 border-gold/20"
                  >
                    <p className="text-xs text-muted-foreground mb-1.5 sm:mb-2">Zakat Payable</p>
                    <p className="text-2xl sm:text-3xl font-bold gradient-gold-text">
                      {symbol} <AnimatedCounter value={zakatDue} decimals={0} />
                    </p>
                  </motion.div>
                </div>

                {/* Status indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl flex items-center gap-2.5 sm:gap-3 ${
                    isAboveNisab ? "bg-emerald/10 border border-emerald/20" : "bg-muted/50 border border-border/30"
                  }`}
                >
                  {isAboveNisab ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-light flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {isAboveNisab
                      ? "Your wealth exceeds the Nisab threshold. Zakat is obligatory."
                      : "Your wealth is below the Nisab threshold. No Zakat is due at this time."}
                  </p>
                </motion.div>

                {/* Progress bar */}
                <div className="mt-4 sm:mt-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5 sm:mb-2">
                    <span>Wealth vs Nisab</span>
                    <span>{Math.min(100, Math.round((zakatableWealth / nisab) * 100))}%</span>
                  </div>
                  <div className="h-2.5 sm:h-3 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (zakatableWealth / nisab) * 100)}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded-full gradient-gold"
                    />
                  </div>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-6 sm:mt-8">
                  Zakat is 2.5% of wealth held for one lunar year.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
