/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Users, MessageSquare, AlertCircle } from "lucide-react";
import { WEDDING_CONSTANTS } from "../constants";

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    family: "" as "noiva" | "noivo" | "",
    guests: "1" as "1" | "2",
    companionName: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) {
        error = "O nome completo é obrigatório.";
      } else if (value.trim().length < 3) {
        error = "O nome deve ter pelo menos 3 caracteres.";
      }
    } else if (name === "companionName" && formData.guests === "2") {
      if (!value.trim()) {
        error = "O nome do acompanhante é obrigatório para 2 pessoas.";
      }
    } else if (name === "family") {
      if (!value) {
        error = "Por favor, selecione a qual família pertence.";
      }
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const selectFamily = (family: "noiva" | "noivo") => {
    setFormData((prev) => ({ ...prev, family }));
    setTouched((prev) => ({ ...prev, family: true }));
    setErrors((prev) => ({ ...prev, family: "" }));
  };

  const selectGuests = (guests: "1" | "2") => {
    setFormData((prev) => ({ ...prev, guests }));
    // Clear companion errors if switching to 1 guest
    if (guests === "1") {
      setErrors((prev) => ({ ...prev, companionName: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const newTouched = {
      name: true,
      family: true,
      companionName: formData.guests === "2",
      message: false
    };
    setTouched(newTouched);

    // Validate all
    const newErrors: Record<string, string> = {};
    const nameErr = validateField("name", formData.name);
    if (nameErr) newErrors.name = nameErr;

    const familyErr = validateField("family", formData.family);
    if (familyErr) newErrors.family = familyErr;

    if (formData.guests === "2") {
      const compErr = validateField("companionName", formData.companionName);
      if (compErr) newErrors.companionName = compErr;
    }

    setErrors(newErrors);

    // If there are errors, stop
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    const isBride = formData.family === "noiva";
    const contact = isBride ? WEDDING_CONSTANTS.contacts.bride : WEDDING_CONSTANTS.contacts.groom;

    // Format the custom WhatsApp text based on user requirements
    const companionPart = formData.guests === "2" ? `\n🙋 Acompanhante: ${formData.companionName.trim()}` : "";
    const messagePart = formData.message.trim() ? `\n\n💬 Mensagem:\n"${formData.message.trim()}"` : "";

    const text = `Olá!

Gostaria de confirmar minha presença no pedido.

👤 Nome: ${formData.name.trim()}

👨‍👩‍👧 Família: ${isBride ? "Noiva" : "Noivo"}

👥 Quantidade de Pessoas: ${formData.guests}${companionPart}${messagePart}

Obrigado!`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${contact.apiNumber}&text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section 
      className="py-10 px-4 bg-[#FAF3E7] relative overflow-hidden"
      id="rsvp-section"
    >
      {/* Background blurs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#C7A86D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[#8c6a33]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[430px] mx-auto relative z-10">
        
        {/* RSVP Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#FCF8F2] border border-[#2C2621]/15 p-5 sm:p-6 rounded-[1.75rem] shadow-xl"
        >
          {/* Elegant physical paper double lines/decorations at the corners */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-[0.5px] border-l-[0.5px] border-[#C7A86D]/40" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-[0.5px] border-r-[0.5px] border-[#C7A86D]/40" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-[0.5px] border-l-[0.5px] border-[#C7A86D]/40" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-[0.5px] border-r-[0.5px] border-[#C7A86D]/40" />
          
          <div className="absolute top-6 left-6 w-2.5 h-2.5 border-t border-l border-[#C7A86D]/20 border-dashed" />
          <div className="absolute top-6 right-6 w-2.5 h-2.5 border-t border-r border-[#C7A86D]/20 border-dashed" />
          <div className="absolute bottom-6 left-6 w-2.5 h-2.5 border-b border-l border-[#C7A86D]/20 border-dashed" />
          <div className="absolute bottom-6 right-6 w-2.5 h-2.5 border-b border-r border-[#C7A86D]/20 border-dashed" />

          {/* Header inside the card */}
          <div className="text-center space-y-1.5 mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C7A86D] font-bold block">
              Confirmação de Presença
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-light italic text-[#2C2621] leading-relaxed max-w-xs mx-auto">
              Sua presença tornará este momento ainda mais especial.
            </h3>
            
            {/* Elegant horizontal line with golden heart */}
            <div className="flex items-center justify-center gap-2.5 my-2 opacity-80 select-none">
              <div className="h-[0.5px] w-10 sm:w-14 bg-gradient-to-r from-transparent to-[#C7A86D]" />
              <span className="text-[#C7A86D] text-xs">♥</span>
              <div className="h-[0.5px] w-10 sm:w-14 bg-gradient-to-l from-transparent to-[#C7A86D]" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Nome Completo */}
            <div className="space-y-1 text-left">
              <label htmlFor="name" className="text-[9px] uppercase tracking-widest font-bold text-[#8c6a33] block">
                NOME COMPLETO *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C7A86D]/70 group-focus-within:text-[#8c6a33] transition-colors">
                  <User size={14} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Seu nome completo"
                  className={`w-full pl-8.5 pr-3 py-2 bg-white border rounded-[0.5rem] outline-none text-xs sm:text-sm text-[#2C2621] placeholder-[#2C2621]/30 transition-all shadow-sm ${
                    touched.name && errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/25"
                      : "border-[#C7A86D]/25 focus:border-[#8c6a33] focus:ring-1 focus:ring-[#8c6a33]/25"
                  }`}
                />
              </div>
              {touched.name && errors.name && (
                <p className="text-[9px] text-red-500 font-medium flex items-center gap-1 mt-0.5">
                  <AlertCircle size={11} className="shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Família à qual pertence */}
            <div className="space-y-1 text-left">
              <label id="family-label" className="text-[9px] uppercase tracking-widest font-bold text-[#8c6a33] block">
                FAMÍLIA À QUAL PERTENCE *
              </label>
              <div className="grid grid-cols-2 gap-2" id="family">
                <button
                  type="button"
                  onClick={() => selectFamily("noiva")}
                  className={`py-2 px-2 rounded-lg border text-center text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                    formData.family === "noiva"
                      ? "bg-[#8c6a33] border-[#8c6a33] text-white shadow-sm scale-[1.01]"
                      : "bg-white border-[#C7A86D]/25 text-[#2C2621]/70 hover:bg-[#C7A86D]/5 hover:text-[#2C2621]"
                  }`}
                >
                  <span className="text-[9px]">Família da Noiva</span>
                  <span className="text-[7.5px] opacity-75 font-normal normal-case block">Sónia Gonçalves</span>
                </button>
                <button
                  type="button"
                  onClick={() => selectFamily("noivo")}
                  className={`py-2 px-2 rounded-lg border text-center text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                    formData.family === "noivo"
                      ? "bg-[#8c6a33] border-[#8c6a33] text-white shadow-sm scale-[1.01]"
                      : "bg-white border-[#C7A86D]/25 text-[#2C2621]/70 hover:bg-[#C7A86D]/5 hover:text-[#2C2621]"
                  }`}
                >
                  <span className="text-[9px]">Família do Noivo</span>
                  <span className="text-[7.5px] opacity-75 font-normal normal-case block">Wilson Dias</span>
                </button>
              </div>
              {touched.family && errors.family && (
                <p className="text-[9px] text-red-500 font-medium flex items-center gap-1 mt-0.5">
                  <AlertCircle size={11} className="shrink-0" />
                  {errors.family}
                </p>
              )}
            </div>

            {/* Quantidade de Convidados (Max 2, beautiful buttons style) */}
            <div className="space-y-1 text-left">
              <label className="text-[9px] uppercase tracking-widest font-bold text-[#8c6a33] block">
                QUANTIDADE DE CONVIDADOS *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => selectGuests("1")}
                  className={`py-2 px-2.5 rounded-lg border text-center text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer ${
                    formData.guests === "1"
                      ? "bg-[#8c6a33] border-[#8c6a33] text-white shadow-sm"
                      : "bg-white border-[#C7A86D]/25 text-[#2C2621]/70 hover:bg-[#C7A86D]/5"
                  }`}
                >
                  <Users size={12} />
                  <span>1 Pessoa</span>
                </button>
                <button
                  type="button"
                  onClick={() => selectGuests("2")}
                  className={`py-2 px-2.5 rounded-lg border text-center text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer ${
                    formData.guests === "2"
                      ? "bg-[#8c6a33] border-[#8c6a33] text-white shadow-sm"
                      : "bg-white border-[#C7A86D]/25 text-[#2C2621]/70 hover:bg-[#C7A86D]/5"
                  }`}
                >
                  <Users size={12} />
                  <span className="flex flex-col items-center">
                    <span>2 Pessoas</span>
                    <span className="text-[7px] font-normal normal-case opacity-90 block">Máximo</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Nome do Acompanhante (Dynamic with AnimatePresence) */}
            <AnimatePresence>
              {formData.guests === "2" && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 text-left overflow-hidden"
                >
                  <label htmlFor="companionName" className="text-[9px] uppercase tracking-widest font-bold text-[#8c6a33] block">
                    NOME DO ACOMPANHANTE *
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C7A86D]/70 group-focus-within:text-[#8c6a33] transition-colors">
                      <User size={14} />
                    </div>
                    <input
                      type="text"
                      id="companionName"
                      name="companionName"
                      required={formData.guests === "2"}
                      value={formData.companionName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Nome completo do acompanhante"
                      className={`w-full pl-8.5 pr-3 py-2 bg-white border rounded-[0.5rem] outline-none text-xs sm:text-sm text-[#2C2621] placeholder-[#2C2621]/30 transition-all shadow-sm ${
                        touched.companionName && errors.companionName
                          ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/25"
                          : "border-[#C7A86D]/25 focus:border-[#8c6a33] focus:ring-1 focus:ring-[#8c6a33]/25"
                      }`}
                    />
                  </div>
                  {touched.companionName && errors.companionName && (
                    <p className="text-[9px] text-red-500 font-medium flex items-center gap-1 mt-0.5">
                      <AlertCircle size={11} className="shrink-0" />
                      {errors.companionName}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mensagem */}
            <div className="space-y-1 text-left">
              <label htmlFor="message" className="text-[9px] uppercase tracking-widest font-bold text-[#8c6a33] block">
                MENSAGEM PARA OS NOIVOS (OPCIONAL)
              </label>
              <div className="relative group">
                <div className="absolute top-2 left-2.5 pointer-events-none text-[#C7A86D]/70 group-focus-within:text-[#8c6a33] transition-colors">
                  <MessageSquare size={14} />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Sua mensagem de carinho..."
                  className="w-full pl-8.5 pr-3 py-2 bg-white border border-[#C7A86D]/25 rounded-[0.5rem] outline-none text-xs sm:text-sm text-[#2C2621] placeholder-[#2C2621]/30 focus:border-[#8c6a33] focus:ring-1 focus:ring-[#8c6a33]/25 transition-all shadow-sm resize-none text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.family}
              className="w-full py-3 bg-[#541C1F] hover:bg-[#6b2529] disabled:opacity-50 disabled:bg-[#541C1F]/60 text-white rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md transition-all duration-300 transform active:scale-[0.99] cursor-pointer mt-3"
              id="btn-rsvp-submit"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>REDIRECIONANDO...</span>
                </>
              ) : (
                <>
                  <Send size={11} className="text-white" />
                  <span>CONFIRMAR PRESENÇA NO WHATSAPP</span>
                </>
              )}
            </button>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
