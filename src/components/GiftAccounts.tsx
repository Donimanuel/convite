/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Landmark } from "lucide-react";
import { WEDDING_CONSTANTS } from "../constants";

interface GiftAccountsProps {
  onTriggerToast: (msg: string) => void;
}

export default function GiftAccounts({ onTriggerToast }: GiftAccountsProps) {
  const handleCopy = (text: string, label: string) => {
    const fallbackCopyText = (data: string) => {
      const textArea = document.createElement("textarea");
      textArea.value = data;
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          onTriggerToast(`${label} copiado com sucesso!`);
        } else {
          onTriggerToast(`Não foi possível copiar. Por favor, selecione e copie manualmente.`);
        }
      } catch (err) {
        console.error("Erro no fallback de cópia:", err);
        onTriggerToast(`Erro ao copiar ${label}.`);
      }
      document.body.removeChild(textArea);
    };

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(text)
        .then(() => {
          onTriggerToast(`${label} copiado com sucesso!`);
        })
        .catch((err) => {
          console.warn("Falha no clipboard API, tentando fallback:", err);
          fallbackCopyText(text);
        });
    } else {
      fallbackCopyText(text);
    }
  };

  return (
    <section 
      className="py-16 px-4 sm:px-6 bg-[#FAF3E7] relative overflow-hidden"
      id="gifts-section"
    >
      {/* Decorative luxury gradient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-[#C7A86D] font-bold block"
          >
            Presentes & Apoio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-[#2C2621]"
          >
            Dados para Contribuição
          </motion.h2>
          <p className="text-xs sm:text-sm text-[#2C2621]/80 max-w-md mx-auto font-light leading-relaxed pt-1.5">
            A vossa presença é o nosso maior presente. No entanto, se desejar presentear-nos com uma contribuição para o início do nosso lar, disponibilizamos os nossos dados bancários abaixo.
          </p>
          <div className="w-16 h-[1px] bg-[#C7A86D] mx-auto mt-4" />
        </div>

        {/* Bank Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WEDDING_CONSTANTS.bankAccounts.map((account, index) => (
            <motion.div
              key={account.iban}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative bg-[#FCF8F2] border border-[#2C2621]/15 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Card Container */}
              <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-between h-full relative">
                
                {/* Subtle ornamental patterns in corners */}
                <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-[#C7A86D]/30 rounded-tl" />
                <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-[#C7A86D]/30 rounded-br" />

                {/* Bank Header: Landmark Icon and Title */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-[#C7A86D]/40 flex items-center justify-center text-[#8c6a33] bg-white shadow-sm shrink-0">
                    <Landmark size={16} />
                  </div>
                  <span className="font-serif text-base text-[#2C2621] font-medium">
                    {account.bankName}
                  </span>
                </div>

                {/* Titular da Conta */}
                <div className="space-y-1">
                  <span className="text-[10px] text-[#A28755] uppercase tracking-[0.15em] font-bold block">
                    Titular da Conta
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#2C2621] font-light leading-snug">
                    {account.owner}
                  </h3>
                </div>

                {/* Número do IBAN */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-[#A28755] uppercase tracking-[0.15em] font-bold block">
                    Número do IBAN
                  </span>
                  <div className="bg-[#FAF6F0] rounded-2xl py-3 px-4 flex items-center justify-center border border-[#C7A86D]/15 overflow-hidden">
                    <p className="font-mono text-[10px] sm:text-xs font-bold text-[#541C1F] tracking-wider text-center select-all whitespace-nowrap">
                      {account.iban}
                    </p>
                  </div>
                </div>

                {/* Copiar IBAN Button */}
                <button
                  onClick={() => handleCopy(account.iban, "IBAN")}
                  className="w-full mt-2 py-2.5 bg-white hover:bg-[#C7A86D]/5 border border-[#C7A86D] text-[#8c6a33] rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  id={`btn-copy-all-${index}`}
                >
                  <Copy size={12} className="text-[#8c6a33]" />
                  <span>Copiar IBAN</span>
                </button>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-6"
        >
          <p className="font-serif text-sm sm:text-base italic text-[#2C2621]/70 tracking-wide font-light">
            “Com carinho agradecemos, o gesto de amor e generosidade.”
          </p>
        </motion.div>

      </div>
    </section>
  );
}
