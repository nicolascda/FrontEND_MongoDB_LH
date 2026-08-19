import React, { InputHTMLAttributes } from 'react';

interface RadioPadraoProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioPadrao: React.FC<RadioPadraoProps> = ({ label, className, ...props }) => {
  return (
    <label className={`flex items-center space-x-2.5 cursor-pointer mb-2 text-slate-300 hover:text-white transition-colors text-sm font-semibold select-none ${className || ''}`}>
      <input 
        type="radio" 
        className="form-radio h-4 w-4 bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500/50 focus:ring-offset-0 focus:ring-2 rounded-full transition duration-150 ease-in-out cursor-pointer" 
        {...props} 
      />
      <span className="tracking-wide">{label}</span>
    </label>
  );
};
