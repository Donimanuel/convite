/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { ArrowUp, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { WEDDING_CONSTANTS } from "./constants";
import CustomCursor from "./components/CustomCursor";
import Toast from "./components/Toast";
import FloatingMusic from "./components/FloatingMusic";
import InteractiveEnvelope from "./components/InteractiveEnvelope";
import HeroSection from "./components/HeroSection";
import CoupleSection from "./components/CoupleSection";
import EventDetails from "./components/EventDetails";
import GuestManual from "./components/GuestManual";
import TimelineSection from "./components/TimelineSection";
import GiftAccounts from "./components/GiftAccounts";
import RSVPForm from "./components/RSVPForm";

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(() => {
    return localStorage.getItem("wedding_envelope_opened") === "true";
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-[#C7A86D]/30 selection:text-[#2C2621]" id="app-root">
      
      {/* Luxury Golden Trail Cursor */}
      <CustomCursor />

      {/* Floating Toast Notification */}
      <Toast 
        show={showToast} 
        message={toastMsg} 
        onClose={() => setShowToast(false)} 
      />

      <AnimatePresence mode="wait">
        {!isEnvelopeOpened ? (
          <motion.div
            key="envelope-view"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="w-full min-h-screen"
          >
            <InteractiveEnvelope 
              onOpen={() => {
                localStorage.setItem("wedding_envelope_opened", "true");
                setIsEnvelopeOpened(true);
              }}
              groomName={WEDDING_CONSTANTS.groom.firstName}
              brideName={WEDDING_CONSTANTS.bride.firstName}
            />
          </motion.div>
        ) : (
          <motion.div
            key="invitation-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full flex flex-col"
          >
            {/* Elegant Background Music Stream */}
            <FloatingMusic 
              url={WEDDING_CONSTANTS.backgroundMusic} 
              autoPlayTrigger={isEnvelopeOpened} 
            />

            {/* Main Interactive Invitation Modules */}
            <HeroSection onNextSection={() => scrollToSection("couple-section")} />
            
            <CoupleSection />
            
            <EventDetails />
            
            <GuestManual />
            
            <TimelineSection />
            
            <GiftAccounts onTriggerToast={triggerToast} />
            
            <RSVPForm />

            {/* High Luxury Footer */}
            <footer className="py-12 px-4 sm:px-6 bg-gradient-to-t from-[#2C2621] to-[#3a322b] text-white text-center relative overflow-hidden">
              {/* Subtle gold sparks inside footer */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/images/cream_paper_texture_1782826688787.jpg')" }} />
              
              <div className="max-w-xl mx-auto space-y-6 relative z-10">
                <div className="w-12 h-12 rounded-full border border-[#C7A86D]/30 mx-auto flex items-center justify-center text-[#C7A86D] bg-white/5">
                  <Heart size={20} fill="#C7A86D" className="animate-pulse" />
                </div>
                
                <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-[#E6D0A7] font-light italic">
                  Esperamos por si!
                </h3>
                
                <p className="font-serif text-lg text-white/80 leading-relaxed font-light">
                  "Esperamos por você para celebrar connosco este momento inesquecível."
                </p>
                
                <div className="w-20 h-[1px] bg-[#C7A86D]/40 mx-auto" />
                
                <p className="font-serif text-xl text-[#C7A86D] tracking-widest font-light">
                  Com carinho,
                  <span className="block mt-1 font-serif text-2xl font-light tracking-normal text-white italic">
                    {WEDDING_CONSTANTS.groom.firstName} & {WEDDING_CONSTANTS.bride.firstName}
                  </span>
                </p>

                <p className="text-[9px] text-white/40 tracking-wider uppercase mt-8 font-mono">
                  © 2026 • Convite Digital Premium
                </p>
              </div>
            </footer>

            {/* Back to Top Button */}
            <AnimatePresence>
              {showBackToTop && (
                <motion.button
                  key="btn-back-to-top"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#FCF8F2] hover:bg-[#C7A86D] border border-[#C7A86D] flex items-center justify-center text-[#C7A86D] hover:text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                  title="Voltar ao topo"
                  id="btn-back-to-top-floating"
                >
                  <ArrowUp size={18} />
                </motion.button>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
