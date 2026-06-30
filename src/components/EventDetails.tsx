/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Shirt } from "lucide-react";
import { WEDDING_CONSTANTS } from "../constants";

export default function EventDetails() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_CONSTANTS.eventDate).getTime();

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, "0");

  return (
    <section 
      className="py-24 px-3 sm:px-6 bg-[#FAF3E7] relative overflow-hidden"
      id="details-section"
    >
      {/* Decorative background elements to enhance the luxury atmosphere */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#8c6a33]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#C7A86D] font-semibold block"
          >
            Informações Importantes
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-light tracking-wide text-[#2C2621]"
          >
            Data, Hora & Local
          </motion.h2>
          <div className="w-16 h-[1px] bg-[#C7A86D] mx-auto mt-4" />
        </div>

        {/* Countdown Timer */}
        <div className="max-w-2xl mx-auto">
          {timeLeft.isOver ? (
            <div className="text-center p-6 rounded-2xl bg-[#FCF8F2] border border-[#C7A86D]/30 shadow-lg">
              <p className="font-serif text-2xl text-[#C7A86D] italic">O grande dia chegou!</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 sm:gap-4 text-center">
              {[
                { label: "Dias", value: timeLeft.days },
                { label: "Horas", value: timeLeft.hours },
                { label: "Minutos", value: timeLeft.minutes },
                { label: "Segundos", value: timeLeft.seconds }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="bg-[#FCF8F2] border border-[#C7A86D]/20 rounded-xl p-2.5 sm:p-4 shadow-sm relative overflow-hidden"
                >
                  <div className="font-serif text-2xl sm:text-4xl font-light text-[#8c6a33]">
                    {formatNum(item.value)}
                  </div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#2C2621]/70 font-semibold mt-0.5">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* The Grand Highlighted Invitation Card (Date, Time, Location) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto bg-[#FCF8F2] border-2 border-[#C7A86D] p-1.5 rounded-3xl shadow-2xl"
        >
          {/* Inner double border */}
          <div className="border border-[#C7A86D]/30 rounded-2xl py-6 px-3.5 sm:p-10 md:p-12 space-y-10 relative">
            
            {/* Elegant physical-style corner ornaments */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 sm:top-4 sm:left-4 sm:w-8 sm:h-8 border-t-[1.5px] border-l-[1.5px] border-[#C7A86D]" />
            <div className="hidden sm:block absolute top-5 left-5 w-5 h-5 border-t-[0.5px] border-l-[0.5px] border-[#C7A86D]/50" />
            
            <div className="absolute top-2.5 right-2.5 w-4 h-4 sm:top-4 sm:right-4 sm:w-8 sm:h-8 border-t-[1.5px] border-r-[1.5px] border-[#C7A86D]" />
            <div className="hidden sm:block absolute top-5 right-5 w-5 h-5 border-t-[0.5px] border-r-[0.5px] border-[#C7A86D]/50" />
            
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 sm:bottom-4 sm:left-4 sm:w-8 sm:h-8 border-b-[1.5px] border-l-[1.5px] border-[#C7A86D]" />
            <div className="hidden sm:block absolute bottom-5 left-5 w-5 h-5 border-b-[0.5px] border-l-[0.5px] border-[#C7A86D]/50" />
            
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 sm:bottom-4 sm:right-4 sm:w-8 sm:h-8 border-b-[1.5px] border-r-[1.5px] border-[#C7A86D]" />
            <div className="hidden sm:block absolute bottom-5 right-5 w-5 h-5 border-b-[0.5px] border-r-[0.5px] border-[#C7A86D]/50" />

            {/* Part 1: Date & Time Visual Block */}
            <div className="text-center space-y-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C7A86D] font-bold block">
                Partilha connosco este momento
              </span>
              
              {/* Sábado, às 20h00 with refined side lines */}
              <div className="flex items-center justify-center gap-3 text-[#C7A86D] py-1">
                <div className="h-[0.5px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#C7A86D]" />
                <span className="text-xs sm:text-sm tracking-[0.2em] font-semibold uppercase text-[#8c6a33]">
                  Sábado, às 20h00
                </span>
                <div className="h-[0.5px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#C7A86D]" />
              </div>

              {/* 29 AGOSTO 2026 Display */}
              <h3 className="font-serif text-xl min-[360px]:text-2xl sm:text-4xl md:text-5xl font-light text-[#2C2621] tracking-[0.08em] sm:tracking-[0.12em] uppercase my-3 flex items-center justify-center gap-1 sm:gap-3 select-none flex-wrap">
                <span>29</span>
                <span className="text-[#C7A86D] text-base sm:text-xl animate-pulse-slow">♥</span>
                <span>Agosto</span>
                <span className="text-[#C7A86D] text-base sm:text-xl animate-pulse-slow">♥</span>
                <span>2026</span>
              </h3>
            </div>

            {/* Luxurious Ornamental Divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-[#C7A86D]/40 to-[#C7A86D]/40" />
              <div className="w-2 h-2 rounded-full border border-[#C7A86D] rotate-45" />
              <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent via-[#C7A86D]/40 to-[#C7A86D]/40" />
            </div>

            {/* Part 2: Location Visual Block (Highly Highlighted) */}
            <div className="text-center space-y-5">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C7A86D]/10 border border-[#C7A86D]/30 text-[#8c6a33]">
                <MapPin size={22} className="animate-bounce" />
              </div>
              
              <div className="space-y-3">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C7A86D] font-bold block">
                  Localização do Evento
                </span>
                
                {/* SALÃO DE FESTA SUZYMAR */}
                <div className="relative inline-block py-2 px-3 sm:px-10 rounded-2xl bg-gradient-to-r from-[#C7A86D]/5 via-[#C7A86D]/10 to-[#C7A86D]/5 border border-[#C7A86D]/30 shadow-sm max-w-full">
                  <h4 className="font-serif text-sm min-[360px]:text-base sm:text-3xl md:text-4xl font-normal text-[#8c6a33] tracking-wide uppercase leading-tight break-words">
                    Salão de Festa Suzymar
                  </h4>
                </div>

                {/* Viana/Kapalanga: Rua Norberto de Castro */}
                <div className="pt-2 max-w-md mx-auto px-1 sm:px-0">
                  <p className="font-sans text-[11px] min-[360px]:text-xs sm:text-base md:text-lg text-[#2C2621]/90 font-medium leading-relaxed break-words">
                    <span className="text-[#8c6a33] font-semibold tracking-wide uppercase text-[9px] min-[360px]:text-[10px] sm:text-xs block mb-1">Endereço</span>
                    Viana / Kapalanga: Rua Norberto de Castro
                  </p>
                  <p className="text-[10px] min-[360px]:text-[11px] sm:text-xs text-[#2C2621]/60 tracking-widest uppercase font-semibold mt-1">
                    Luanda, Angola
                  </p>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Elegant Dress Code Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto flex items-center gap-4 p-4 sm:p-5 bg-[#FCF8F2] border border-[#C7A86D]/30 rounded-2xl shadow-md text-left"
        >
          <div className="w-10 h-10 rounded-full bg-[#C7A86D]/10 flex items-center justify-center text-[#8c6a33] shrink-0">
            <Shirt size={18} />
          </div>
          <div>
            <span className="text-xs font-bold text-[#8c6a33] uppercase tracking-wider block">Traje Recomendado: Social</span>
            <span className="text-[11px] sm:text-xs text-[#2C2621]/80 block mt-0.5">Nota: O tom <span className="font-semibold text-[#8c6a33]">Castanho</span> é de uso exclusivo da noiva.</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
