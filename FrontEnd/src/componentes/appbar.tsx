import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBasket, User, LogOut, LogIn, CircleDollarSign } from 'lucide-react';
import { usarContextoGlobal } from '../models/contextoGlobal';

export const Appbar = () => {
  const { state, dispatch } = usarContextoGlobal();
  const navigate = useNavigate();

  const totalCesta = state.cesta.reduce((acc, item) => acc + item.quantidade, 0);

  const handleSair = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <header className="bg-slate-900/90 dark:bg-slate-950/95 border-b border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.4)] p-4 sticky top-0 z-50 backdrop-blur-md">
      {/* O px-6 cria o recuo de segurança na borda esquerda e direita da barra */}
      <div className="container mx-auto flex justify-between items-center px-6">

        {/* LOGO (Isolada na esquerda) */}
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="font-black text-xl tracking-widest text-white group-hover:text-cyan-400 transition-colors uppercase">
            LOGJA<span className="text-cyan-400 group-hover:text-white">.COM.BR</span>
          </span>
        </Link>

        {/* GRUPO DA DIREITA (Todos os utilitários, links e login agrupados juntos) */}
        {/* O pr-4 cria o recuo extra para afastar todo o bloco do canto final da tela */}
        <div className="flex items-center space-x-5 text-slate-300 dark:text-slate-200 pr-4">

          <div className="flex items-center border-l border-slate-800 pl-4 space-x-2.5">
            <CircleDollarSign size={18} />
            <Link to="/catalogo" className="hover:text-cyan-400 font-bold uppercase tracking-wider text-xs transition-colors hidden sm:inline">
              Loja
            </Link>
          </div>


          {/* Autenticação integrada diretamente no fluxo antes da cesta */}
          {state.autenticado ? (
            <div className="flex items-center space-x-4 border-l border-slate-800 pl-4">
              <div className="flex items-center space-x-1.5 text-xs font-semibold tracking-wide text-slate-400">
                <User size={16} className="text-purple-400" />
                <span className="max-w-[100px] truncate text-slate-200">{state.usuario}</span>
              </div>
              <button
                onClick={handleSair}
                className="hover:text-rose-400 transition-colors flex items-center text-xs font-bold uppercase tracking-wider gap-1"
                title="Desconectar ID"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Sair</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center border-l border-slate-800 pl-4">
              <Link
                to="/login"
                className="hover:text-cyan-400 transition-colors flex items-center text-xs font-bold uppercase tracking-wider gap-1.5"
                title="Entrar na Conta"
              >
                <LogIn size={18} />
                <span>Entrar</span>
              </Link>
            </div>
          )}

          {/* Cesta com badge customizado */}
          <Link to="/cesta" className="relative text-slate-300 hover:text-cyan-400 transition-colors p-1" title="Inventário de Compras">
            <ShoppingBasket size={22} />
            {totalCesta > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-slate-900 shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {totalCesta}
              </span>
            )}
          </Link>

        </div>
      </div>
    </header>
  );
};
