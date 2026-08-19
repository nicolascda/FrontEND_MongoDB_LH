import React, { ButtonHTMLAttributes } from 'react';

interface BotaoPadraoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primario' | 'secundario' | 'perigo';
  texto: string;
}

export const BotaoPadrao: React.FC<BotaoPadraoProps> = ({ variante = 'primario', texto, className, ...props }) => {
  const baseStyle = "px-5 py-2.5 font-black rounded-lg uppercase tracking-widest text-xs transition-all duration-300 transform hover:scale-105 active:scale-95 border";
  
  const variantes = {
    primario: "bg-cyan-500 text-slate-950 border-cyan-400 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    secundario: "bg-purple-600 text-white border-purple-500 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    perigo: "bg-rose-600 text-white border-rose-500 hover:bg-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
  };

  return (
    <button 
      className={`${baseStyle} ${variantes[variante]} ${className || ''}`}
      {...props}
    >
      {texto}
    </button>
  );
};
