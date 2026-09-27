import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, Heart, BookOpen, ArrowRight } from "lucide-react";
import IslamicBackground from "@/components/IslamicBackground";
import Navbar from "@/components/Navbar";
import { BismillahCalligraphy, IslamicDivider, IslamicFrame, GeometricBorder, IslamicArch } from "@/components/IslamicDecorations";

const features = [
  {
    icon: Calculator,
    title: "Zakat Calculator",
    desc: "Calculate your obligatory Zakat on gold, silver, cash, investments and more.",
    link: "/zakat",
  },
  {
    icon: Heart,
    title: "Fitrana Calculator",
    desc: "Calculate Zakat al-Fitr for your family before Eid prayer.",
    link: "/fitrana",
  },
  {
    icon: BookOpen,
    title: "Learn & Educate",
    desc: "Understand who must pay, who can receive, and what assets are zakatable.",
    link: "/learn",
  },
];

export default function Index() {
  return (
    <div className="h-screen relative overflow-hidden">
      <IslamicBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-0 sm:pt-16 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="container mx-auto text-center max-w-5xl w-full">
          {/* Bismillah */}
          <BismillahCalligraphy className="mb-4 sm:mb-6 md:mb-8 lg:mb-10" />

          <IslamicDivider className="mb-4 sm:mb-6 md:mb-8 lg:mb-10" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {/* Arch frame around heading */}
            <div className="relative inline-block mb-4 sm:mb-6 md:mb-8 px-2">
              <IslamicArch className="absolute -top-6 sm:-top-8 md:-top-10 left-1/2 -translate-x-1/2 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 opacity-20 pointer-events-none" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif font-bold mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight relative z-10">
                Calculate Your
                <br />
                <span className="gradient-gold-text">Zakat & Fitrana</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed relative z-10 px-2">
                A beautifully crafted tool ( by bilal arshad ) to help fulfill your Islamic obligations accurately and effortlessly.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-4 sm:px-0"
            >
              <Link to="/zakat" className="btn-primary-islamic group inline-flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5">
                <Calculator className="w-4 h-4 lg:w-5 lg:h-5" />
                Calculate Zakat
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/fitrana" className="btn-secondary-islamic group inline-flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5">
                <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
                Calculate Fitrana
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
