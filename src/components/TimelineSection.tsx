/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Heart, MessageSquare, Sparkles, Calendar } from "lucide-react";
import { WEDDING_CONSTANTS } from "../constants";

export default function TimelineSection() {
  const timelineItems = WEDDING_CONSTANTS.timeline;

  const getIcon = (badge: string) => {
    switch (badge) {
      case "heart":
        return <Heart size={16} fill="white" className="text-white" />;
      case "message":
        return (
          <div className="relative flex items-center justify-center">
            <MessageSquare size={16} className="text-white fill-white" />
            <span className="absolute text-[8px] text-[#541C1F] font-bold" style={{ top: "1px" }}>♥</span>
          </div>
        );
      case "sparkles":
        return <Sparkles size={16} className="text-white" />;
      case "calendar":
        return <Calendar size={16} className="text-white" />;
      default:
        return <Heart size={16} className="text-white" />;
    }
  };

  const getCircleBg = (badge: string) => {
    return badge === "message" ? "bg-[#541C1F]" : "bg-[#C7A86D]";
  };

  return (
    <section 
      className="py-16 px-4 sm:px-6 bg-[#FAF3E7] relative overflow-hidden"
      id="timeline-section"
    >
      {/* Background soft lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8c6a33]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        
        {/* Header Section exactly as shown in the image */}
        <div className="space-y-2 mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.25em] text-[#C7A86D] font-bold block"
          >
            NOSSA JORNADA
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl font-light text-[#2C2621]"
          >
            A Linha do Tempo do Nosso Amor
          </motion.h2>
          
          {/* Elegant horizontal line with golden heart */}
          <div className="flex items-center justify-center gap-3 my-4 opacity-85 select-none pt-1">
            <div className="h-[0.5px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#C7A86D]" />
            <span className="text-[#C7A86D] text-xs">♥</span>
            <div className="h-[0.5px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#C7A86D]" />
          </div>
        </div>

        {/* Desktop Horizontal Timeline (md and up) */}
        <div className="hidden md:block relative mt-16 pb-12">
          {/* Connecting horizontal line */}
          <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[1px] bg-[#C7A86D]/20 z-0" />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center group"
              >
                {/* Node Circle */}
                <div 
                  className={`w-12 h-12 rounded-full ${getCircleBg(item.badge)} border-4 border-[#FAF3E7] shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10 relative cursor-default`}
                >
                  {getIcon(item.badge)}
                </div>

                {/* Card with notch */}
                <div className="mt-8 relative w-full">
                  {/* Small Notch/Arrow at the top of card pointing up */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FCF8F2] rotate-45 border-l border-t border-[#2C2621]/10 z-0" />
                  
                  {/* Bubble card */}
                  <div className="bg-[#FCF8F2] border border-[#2C2621]/10 rounded-2xl p-5 sm:p-6 text-center shadow-lg relative z-10 transition-shadow duration-300 hover:shadow-xl min-h-[170px] flex flex-col justify-center">
                    <span className="text-[9px] uppercase tracking-[0.15em] text-[#C7A86D] font-bold block mb-1.5">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-light text-[#2C2621] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#2C2621]/80 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline (below md) */}
        <div className="block md:hidden relative mt-8 pl-6 text-left">
          {/* Vertical line connector */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-[#C7A86D]/30" />

          <div className="space-y-8">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 relative"
              >
                {/* Mobile Circle Node */}
                <div 
                  className={`w-10 h-10 shrink-0 rounded-full ${getCircleBg(item.badge)} border-4 border-[#FAF3E7] shadow-sm flex items-center justify-center z-10 relative`}
                >
                  {getIcon(item.badge)}
                </div>

                {/* Card */}
                <div className="relative flex-1">
                  {/* Notch on the left pointing left to the circle node */}
                  <div className="absolute top-3.5 -left-1.5 w-3 h-3 bg-[#FCF8F2] rotate-45 border-l border-b border-[#2C2621]/10 z-0" />
                  
                  <div className="bg-[#FCF8F2] border border-[#2C2621]/10 rounded-2xl p-4 shadow-md relative z-10">
                    <span className="text-[8px] uppercase tracking-wider text-[#C7A86D] font-bold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base font-light text-[#2C2621] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#2C2621]/80 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
