import { motion } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";
import { useState } from "react";
import IslamicBackground from "@/components/IslamicBackground";
import Navbar from "@/components/Navbar";


interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  index: number;
}

function AccordionItem({ title, children, delay = 0, index }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card overflow-hidden group hover:border-gold/20 transition-all duration-500"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-xs font-bold text-gold flex-shrink-0">
            {index}
          </span>
          <h3 className="font-serif text-lg text-foreground group-hover:text-gold transition-colors">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gold" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed space-y-2 ml-11">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LearnZakat() {
  return (
    <div className="min-h-screen relative">
      <IslamicBackground />
      <Navbar />

      <section className="relative z-10 pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-gold/20 bg-gold/5 text-gold mb-6"
            >
              <BookOpen className="w-3.5 h-3.5" /> Islamic Knowledge
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">
              <span className="gradient-gold-text">Learn</span> About Zakat
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">Understanding your Islamic obligation</p>
          </motion.div>

          <div className="space-y-4">
            <AccordionItem title="What is Zakat?" delay={0.1} index={1}>
              <p>Zakat is one of the Five Pillars of Islam. It is an obligatory act of worship that requires Muslims who meet the minimum wealth threshold (Nisab) to donate 2.5% of their qualifying wealth annually.</p>
              <p>The word "Zakat" means purification and growth. It purifies the wealth of the giver and helps those in need.</p>
            </AccordionItem>

            <AccordionItem title="Who Must Pay Zakat?" delay={0.15} index={2}>
              <p>Zakat is obligatory upon every Muslim who:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Is an adult (has reached puberty)</li>
                <li>Is sane and of sound mind</li>
                <li>Possesses wealth above the Nisab threshold</li>
                <li>Has held that wealth for one complete lunar year (Hawl)</li>
                <li>Is free (not enslaved)</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Who Can Receive Zakat?" delay={0.2} index={3}>
              <p>The Quran (9:60) specifies eight categories of people eligible to receive Zakat:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Al-Fuqara</strong> – The poor</li>
                <li><strong>Al-Masakin</strong> – The needy</li>
                <li><strong>Al-Amilina Alayha</strong> – Zakat collectors</li>
                <li><strong>Al-Mu'allafatu Qulubuhum</strong> – Those whose hearts are to be reconciled</li>
                <li><strong>Fir-Riqab</strong> – Freeing captives/slaves</li>
                <li><strong>Al-Gharimin</strong> – Those in debt</li>
                <li><strong>Fi Sabilillah</strong> – In the cause of Allah</li>
                <li><strong>Ibnus-Sabil</strong> – The stranded traveler</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="What Assets Are Zakatable?" delay={0.25} index={4}>
              <p>Zakat is due on the following types of wealth:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Cash (in hand and in bank)</li>
                <li>Gold and silver (jewelry, coins, bars)</li>
                <li>Stocks and shares</li>
                <li>Business inventory and trade goods</li>
                <li>Cryptocurrency</li>
                <li>Rental income</li>
                <li>Loans given to others (expected to be repaid)</li>
              </ul>
              <p className="mt-2"><strong>Not zakatable:</strong> Personal home, personal vehicle, personal clothing, household items.</p>
            </AccordionItem>

            <AccordionItem title="What is Nisab?" delay={0.3} index={5}>
              <p>Nisab is the minimum amount of wealth a Muslim must possess before Zakat becomes obligatory. It is based on the value of:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Gold:</strong> 87.48 grams (≈7.5 tola)</li>
                <li><strong>Silver:</strong> 612.36 grams (≈52.5 tola)</li>
              </ul>
              <p className="mt-2">Most scholars recommend using the silver Nisab as it is lower, ensuring more people fulfill their obligation and more needy people are helped.</p>
            </AccordionItem>

            <AccordionItem title="What is Fitrana (Zakat al-Fitr)?" delay={0.35} index={6}>
              <p>Fitrana is a charitable donation given before Eid al-Fitr prayer at the end of Ramadan. Key points:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Obligatory on every Muslim who has food beyond their needs</li>
                <li>Paid on behalf of every member of the household</li>
                <li>Must be paid before Eid prayer</li>
                <li>Based on the value of approximately 2kg of staple food (wheat, barley, dates, or raisins)</li>
                <li>Purpose: to purify the fasting person and feed the poor on Eid</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="How is Zakat Calculated?" delay={0.4} index={7}>
              <p>The formula is straightforward:</p>
              <div className="glass-card p-4 my-3 text-center border-gold/20">
                <p className="text-gold font-semibold">Zakat = 2.5% × (Total Assets − Liabilities)</p>
              </div>
              <p>Steps:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Add up all zakatable assets (cash, gold, silver, investments, etc.)</li>
                <li>Subtract any debts and liabilities</li>
                <li>Check if net wealth meets or exceeds Nisab</li>
                <li>If yes, pay 2.5% of the net zakatable wealth</li>
              </ol>
            </AccordionItem>
          </div>

          {/* Hadith card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-10 text-center glow-gold mt-14 relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 text-6xl text-gold/10 font-serif">"</div>
            <div className="absolute bottom-4 right-4 text-6xl text-gold/10 font-serif rotate-180">"</div>
            <p className="font-serif text-xl md:text-2xl text-gold mb-4 leading-relaxed relative z-10">
              Protect your wealth by paying Zakat, treat your sick ones through charity, and prepare for calamity with supplication.
            </p>
            <div className="w-16 h-px bg-gold/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm relative z-10">— Prophet Muhammad ﷺ</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
