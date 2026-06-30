/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { WEDDING_CONSTANTS } from "../constants";

// Luxury Flourish Separator with continuous line and gold heart
const DividerOrnament = () => (
  <div className="flex items-center justify-center gap-4 my-6 opacity-85 select-none">
    <div className="h-[0.5px] w-16 md:w-28 bg-gradient-to-r from-transparent via-[#C7A86D] to-[#C7A86D]" />
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C7A86D] fill-none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
    <div className="h-[0.5px] w-16 md:w-28 bg-gradient-to-l from-transparent via-[#C7A86D] to-[#C7A86D]" />
  </div>
);

export default function CoupleSection() {
  return (
    <section 
      className="py-24 px-4 bg-gradient-to-b from-[#FCF8F2] to-[#FAF3E7] relative overflow-hidden"
      id="couple-section"
    >
      {/* Decorative vector background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-no-repeat bg-contain opacity-5 pointer-events-none select-none"
        style={{ backgroundImage: "url('/src/assets/images/gold_floral_wreath_1782826669856.jpg')" }}
      />

      <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xs uppercase tracking-[0.25em] text-[#C7A86D] font-semibold"
          >
            Os Noivos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-serif text-4xl md:text-5xl font-light tracking-wide text-[#2C2621]"
          >
            Wilson & Sónia
          </motion.h2>
          <div className="w-16 h-[1px] bg-[#C7A86D] mx-auto mt-4" />
        </div>

        {/* Photos & Hearts Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          
          {/* Groom Profile */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-1 border-2 border-[#C7A86D]/40 shadow-2xl bg-[#FCF8F2] overflow-hidden group">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                {/* Custom overlay with golden glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#C7A86D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img 
                  src={WEDDING_CONSTANTS.groom.avatar}
                  alt={WEDDING_CONSTANTS.groom.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#C7A86D]/30 scale-[1.03] group-hover:scale-[1.06] transition-transform duration-500 pointer-events-none" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-2xl font-light text-[#2C2621] tracking-wide">{WEDDING_CONSTANTS.groom.fullName}</h3>
              <p className="text-xs text-[#C7A86D] uppercase tracking-[0.2em] font-semibold mt-1">O Noivo</p>
            </div>
          </motion.div>

          {/* Connected Heart Icon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: [1, 1.2, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
            className="text-[#C7A86D] flex items-center justify-center relative py-4"
          >
            <div className="absolute -inset-4 rounded-full border border-dashed border-[#C7A86D]/20 animate-spin" style={{ animationDuration: "15s" }} />
            <Heart size={36} fill="#C7A86D" className="filter drop-shadow-md" />
          </motion.div>

          {/* Bride Profile */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-1 border-2 border-[#C7A86D]/40 shadow-2xl bg-[#FCF8F2] overflow-hidden group">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#C7A86D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img 
                  src={WEDDING_CONSTANTS.bride.avatar}
                  alt={WEDDING_CONSTANTS.bride.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 rounded-full border border-dashed border-[#C7A86D]/30 scale-[1.03] group-hover:scale-[1.06] transition-transform duration-500 pointer-events-none" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-2xl font-light text-[#2C2621] tracking-wide">{WEDDING_CONSTANTS.bride.fullName}</h3>
              <p className="text-xs text-[#C7A86D] uppercase tracking-[0.2em] font-semibold mt-1">A Noiva</p>
            </div>
          </motion.div>

        </div>

        {/* Story Text Block (Matching Invitation Image Text) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0 }}
          className="max-w-2xl mx-auto p-10 md:p-14 rounded-3xl bg-[#FCF8F2] border-2 border-[#C7A86D]/30 space-y-8 shadow-2xl relative"
        >
          {/* Ornate corners like a premium physical invitation card */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#C7A86D]" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#C7A86D]" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#C7A86D]" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#C7A86D]" />

          {/* First Paragraph */}
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#2C2621] font-light">
            Existem momentos que marcam para sempre as nossas vidas, e este é, para nós, um momento de grande felicidade.
          </p>
          
          <DividerOrnament />

          {/* Second Paragraph */}
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#2C2621] font-light">
            É com enorme alegria que partilhamos convosco o nosso pedido, o início de uma nova etapa repleta de amor, união e esperança no futuro.
          </p>
          
          <DividerOrnament />

          {/* Highlighted Paragraph */}
          <p className="font-serif text-lg md:text-xl font-medium text-[#8c6a33] tracking-wide uppercase italic">
            A vossa presença tornará este momento ainda mais especial e inesquecível.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
