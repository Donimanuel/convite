/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { MailOpen, MousePointerClick } from "lucide-react";

interface InteractiveEnvelopeProps {
  onOpen: () => void;
  groomName: string;
  brideName: string;
}

export default function InteractiveEnvelope({ onOpen, groomName, brideName }: InteractiveEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    
    setIsOpening(true);
    
    // Trigger gold confetti explosion
    const triggerConfetti = () => {
      const colors = ["#C7A86D", "#E6D0A7", "#9F804B", "#FFF5DF"];
      const end = Date.now() + 1.5 * 1000;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    };

    // Sequence animations
    setTimeout(() => {
      triggerConfetti();
    }, 400);

    setTimeout(() => {
      setIsOpen(true);
      onOpen();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FCF8F2] flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background floral flourishes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 md:w-80 md:h-80 bg-cover bg-no-repeat rotate-90" style={{ backgroundImage: "url('/assets/images/gold_floral_wreath_1782826669856.jpg')" }} />
        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-80 md:h-80 bg-cover bg-no-repeat -rotate-90" style={{ backgroundImage: "url('/assets/images/gold_floral_wreath_1782826669856.jpg')" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[500px] flex flex-col items-center gap-8 relative z-10"
      >
        <div className="text-center space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-20 h-20 mx-auto rounded-full bg-[#C7A86D]/10 flex items-center justify-center border border-[#C7A86D]/30 mb-2"
          >
            <span className="font-serif text-3xl font-light text-[#C7A86D]">WS</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-serif text-3xl md:text-4xl tracking-wide text-[#2C2621]"
          >
            {groomName} & {brideName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs tracking-[0.2em] uppercase text-[#C7A86D] font-medium"
          >
            Convite de Pedido Digital
          </motion.p>
        </div>

        {/* Envelope Container with 3D look */}
        <div 
          onClick={handleOpen}
          className={`w-full aspect-[4/3] bg-[#EBE4D8] border border-[#C7A86D]/40 rounded-lg shadow-2xl relative cursor-pointer group select-none overflow-visible transition-transform duration-500 hover:-translate-y-2 ${isOpening ? "pointer-events-none" : ""}`}
          style={{ perspective: "1000px" }}
          id="interactive-envelope-body"
        >
          {/* Backplate of the envelope */}
          <div className="absolute inset-0 bg-[#E8DCC4] rounded-lg overflow-hidden border border-[#C7A86D]/30 shadow-inner flex items-center justify-center">
            {/* Embedded letter waiting to pull up */}
            <motion.div
              animate={isOpening ? { y: -160, scale: 1.02, opacity: 1 } : { y: 0, scale: 0.95, opacity: 0.8 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute w-[92%] h-[85%] bg-[#FCF8F2] rounded border border-[#C7A86D]/30 p-6 flex flex-col items-center justify-between text-center shadow-lg"
              style={{ zIndex: 1 }}
            >
              <div className="w-8 h-8 rounded-full border border-[#C7A86D]/40 flex items-center justify-center font-serif text-[#C7A86D] text-xs">WS</div>
              <div className="space-y-1">
                <p className="font-serif italic text-[#C7A86D] text-sm">Estás Convidado</p>
                <p className="font-serif text-xl tracking-tight text-[#2C2621]">{groomName} & {brideName}</p>
              </div>
              <div className="w-12 h-[1px] bg-[#C7A86D]" />
            </motion.div>
          </div>

          {/* Front Flaps (drawn with SVGs and triangles to look real) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg" style={{ zIndex: 5 }}>
            <svg viewBox="0 0 100 75" className="w-full h-full" fill="none">
              {/* Left Side Flap */}
              <path d="M0 0 L42 37.5 L0 75 Z" fill="#EADFCE" stroke="#D1C3AD" strokeWidth="0.25" />
              {/* Right Side Flap */}
              <path d="M100 0 L58 37.5 L100 75 Z" fill="#EADFCE" stroke="#D1C3AD" strokeWidth="0.25" />
              {/* Bottom Flap */}
              <path d="M0 75 L50 34 L100 75 Z" fill="#E5D6C0" stroke="#CDBC9F" strokeWidth="0.25" />
            </svg>
          </div>

          {/* Animated Envelope Top Flap (Opens up) */}
          <motion.div
            style={{ 
              originY: 0,
              zIndex: isOpening ? 2 : 10 
            }}
            animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 aspect-[4/1.8] pointer-events-none"
          >
            <svg viewBox="0 0 100 45" className="w-full h-full drop-shadow-md" fill="none">
              <path d="M0 0 L50 45 L100 0 Z" fill="#EDE4D6" stroke="#DCD0BD" strokeWidth="0.2" />
            </svg>
          </motion.div>

          {/* Gold Wax Seal (Fades or scales down when opening) */}
          <motion.div
            animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full gold-bg-gradient flex items-center justify-center shadow-lg border border-[#FCF8F2]/30"
            style={{ zIndex: 12 }}
          >
            {/* Wax seal design detail */}
            <div className="w-14 h-14 rounded-full border border-dashed border-[#FCF8F2]/40 flex items-center justify-center font-serif font-light text-white text-lg tracking-wider">
              WS
            </div>
          </motion.div>

          {/* Pulse Ripple around Wax Seal when hovering */}
          {!isOpening && (
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[#C7A86D]/40 animate-ping opacity-25 pointer-events-none" style={{ zIndex: 9 }} />
          )}
        </div>

        {/* Action Prompt */}
        <motion.div
          animate={isOpening ? { opacity: 0, y: 10 } : { opacity: 1, y: [0, -5, 0] }}
          transition={isOpening ? { duration: 0.3 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={handleOpen}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7A86D] font-medium flex items-center gap-2">
            <MailOpen size={14} /> Toque no envelope para abrir o convite
          </span>
          <MousePointerClick size={16} className="text-[#C7A86D]/80 animate-pulse" />
        </motion.div>
      </motion.div>
    </div>
  );
}
