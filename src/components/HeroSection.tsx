/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { WEDDING_CONSTANTS } from "../constants";

interface HeroSectionProps {
  onNextSection: () => void;
}

export default function HeroSection({ onNextSection }: HeroSectionProps) {
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#FCF8F2] relative"
      id="hero-section"
    >
      {/* Background with subtle parallax/opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none mix-blend-multiply"
        style={{ 
          backgroundImage: "url('/src/assets/images/cream_paper_texture_1782826688787.jpg')",
          backgroundAttachment: "fixed" 
        }}
      />

      {/* Floating Sparkles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#C7A86D] opacity-25 animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center gap-6 relative z-10 py-16">
        
        {/* Monogram Frame (Gold Wreath generated asset) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center select-none"
        >
          {/* Rotating soft backdrop of the gold floral wreath */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-cover bg-center shadow-lg border-2 border-[#C7A86D]/20"
            style={{ 
              backgroundImage: "url('/src/assets/images/gold_floral_wreath_1782826669856.jpg')",
              boxShadow: "0 4px 20px rgba(199, 168, 109, 0.15)"
            }}
          />
          {/* Inner monogram letters */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center mt-2">
            <span className="font-serif text-5xl md:text-6xl font-light tracking-widest text-[#8c6a33] text-glow select-none">
              WS
            </span>
          </div>
        </motion.div>

        {/* Wedding Tag */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#C7A86D] font-semibold mt-4"
        >
          Convite Especial de Pedido
        </motion.p>

        {/* Main Names Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.0 }}
          className="mt-6 md:mt-8 text-center"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#2C2621] flex items-center justify-center gap-x-4 gap-y-2 flex-wrap">
            <span className="font-serif italic text-[#C7A86D]">Wilson</span>
            <span className="text-xl sm:text-2xl md:text-3xl text-[#C7A86D]/60 font-serif">&</span>
            <span className="font-serif italic text-[#C7A86D]">Sónia</span>
          </h1>
        </motion.div>

        {/* Separator Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-3 w-40 justify-center my-2"
        >
          <div className="h-[1px] bg-[#C7A86D]/40 flex-1" />
          <span className="text-[#C7A86D] text-lg">♥</span>
          <div className="h-[1px] bg-[#C7A86D]/40 flex-1" />
        </motion.div>

        {/* Romantic quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.2 }}
          className="font-serif italic text-base md:text-xl text-[#2C2621]/85 max-w-xl leading-relaxed px-4"
        >
          "{WEDDING_CONSTANTS.invitationText.heroQuote}"
        </motion.p>

        {/* Pulse Button down */}
        <motion.button
          onClick={onNextSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ 
            opacity: { delay: 1.4 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          className="mt-12 flex flex-col items-center gap-2 group cursor-pointer"
          id="btn-scroll-discover"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#C7A86D]/80 font-medium group-hover:text-[#C7A86D] transition-colors">
            Deslize para descobrir
          </span>
          <div className="w-10 h-10 rounded-full border border-[#C7A86D]/30 flex items-center justify-center text-[#C7A86D] group-hover:bg-[#C7A86D]/10 group-hover:border-[#C7A86D]/60 transition-all">
            <ChevronDown size={18} />
          </div>
        </motion.button>

      </div>
    </section>
  );
}
