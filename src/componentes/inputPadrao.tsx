import React, { InputHTMLAttributes } from 'react';

interface InputPadraoProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const InputPadrao: React.FC<InputPadraoProps> = ({ label, className, ...props }) => {
  return (
    <div className={`flex flex-col mb-4 ${className || ''}`}>
      {label && <label className="mb-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">{label}</label>}
      <input 
        className="px-4 py-2.5 rounded-lg bg-slate-950 text-slate-100 border border-slate-800 
                   placeholder-slate-600 focus:outline-none focus:border-cyan-400 
                   focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 text-sm"
        {...props} 
      />
    </div>
  );
};
