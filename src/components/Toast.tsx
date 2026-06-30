/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Check, Info } from "lucide-react";

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
  type?: "success" | "info";
}

export default function Toast({ show, message, onClose, type = "success" }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-[9999] animate-bounce shadow-2xl rounded-xl glass-card px-5 py-4 flex items-center gap-3 border-2 border-[#C7A86D] max-w-sm">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C7A86D]/10 flex items-center justify-center text-[#C7A86D]">
        {type === "success" ? <Check size={18} /> : <Info size={18} />}
      </div>
      <div>
        <p className="text-sm font-semibold text-[#2C2621]">
          {type === "success" ? "Sucesso!" : "Aviso"}
        </p>
        <p className="text-xs text-[#2C2621]/80">{message}</p>
      </div>
    </div>
  );
}
