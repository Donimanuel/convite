/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { WEDDING_CONSTANTS } from "../constants";

// Helper to resolve string to Lucide icon component dynamically
const IconLoader = ({ name, size = 24 }: { name: string; size?: number }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.HelpCircle size={size} />;
  return <IconComponent size={size} />;
};

export default function GuestManual() {
  return (
    <section 
      className="py-24 px-4 bg-[#FCF8F2] relative overflow-hidden"
      id="manual-section"
    >
      {/* Top Left decorative floral graphic */}
      <div 
        className="absolute -top-12 -left-12 w-48 h-48 md:w-80 md:h-80 bg-cover opacity-15 select-none pointer-events-none rotate-180"
        style={{ backgroundImage: "url('/assets/images/gold_floral_wreath_1782826669856.jpg')" }}
      />
      {/* Bottom Right decorative floral graphic */}
      <div 
        className="absolute -bottom-12 -right-12 w-48 h-48 md:w-80 md:h-80 bg-cover opacity-15 select-none pointer-events-none"
        style={{ backgroundImage: "url('/assets/images/gold_floral_wreath_1782826669856.jpg')" }}
      />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#C7A86D] font-semibold block"
          >
            Manual do Convidado
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-light tracking-wide text-[#2C2621]"
          >
            Dicas & Recomendações
          </motion.h2>
          <div className="w-16 h-[1px] bg-[#C7A86D] mx-auto mt-4" />
        </div>

        {/* 8 Guidelines Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {WEDDING_CONSTANTS.guestManual.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#FCF8F2] border border-[#C7A86D]/20 shadow-sm hover:shadow-md transition-all group duration-300 relative"
            >
              <div className="w-12 h-12 rounded-full border border-[#C7A86D]/30 flex items-center justify-center text-[#C7A86D] bg-[#FCF8F2] mb-4 group-hover:scale-110 group-hover:bg-[#C7A86D] group-hover:text-white transition-all duration-300">
                <IconLoader name={item.icon} size={20} />
              </div>
              <h3 className="font-serif text-sm font-medium text-[#2C2621] mb-1.5 leading-tight">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#2C2621]/70 leading-relaxed max-w-[150px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Crucial Warning & Acknowledgment */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto p-8 rounded-2xl border-2 border-dashed border-[#C7A86D]/30 bg-[#FCF8F2] text-center space-y-4 shadow-md relative"
        >
          {/* Accent corners */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C7A86D]" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C7A86D]" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#C7A86D]" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C7A86D]" />

          <p className="font-serif text-lg font-semibold text-[#8c6a33] uppercase tracking-wider">
            Atenção Especial
          </p>
          <p className="font-serif text-xl italic text-[#2C2621] font-medium leading-relaxed">
            "Não levar criança, por favor."
          </p>
          <div className="w-8 h-[1px] bg-[#C7A86D]/40 mx-auto" />
          <p className="text-xs text-[#2C2621]/80 leading-relaxed font-light">
            Agradecemos de coração a vossa compreensão e carinho!
          </p>
        </motion.div>

      </div>
    </section>
  );
}
