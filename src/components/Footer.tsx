import { Moon, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30 mt-20">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Moon className="text-gold w-4.5 h-4.5" />
              </div>
              <span className="font-serif text-lg gradient-gold-text font-bold">Barakah</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A simple and accurate tool to help Muslims fulfill their Zakat obligations.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-gold mb-4 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <Link to="/zakat" className="block hover:text-gold transition-colors duration-300">Zakat Calculator</Link>
              <Link to="/fitrana" className="block hover:text-gold transition-colors duration-300">Fitrana Calculator</Link>
              <Link to="/learn" className="block hover:text-gold transition-colors duration-300">Learn About Zakat</Link>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-gold mb-4 text-sm font-bold uppercase tracking-wider">About Zakat</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Zakat is one of the five pillars of Islam. It purifies wealth and helps those in need.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-gold mb-4 text-sm font-bold uppercase tracking-wider">Disclaimer</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This calculator provides estimates. Consult a scholar for specific rulings.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-gold" /> to help Muslims fulfill their obligations
          </p>
        </div>
      </div>
    </footer>
  );
}
