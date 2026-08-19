import React, { useEffect, useState } from 'react';
import { obterCatalogo, Produto } from '../models/dadosMockados';
import { usarContextoGlobal } from '../models/contextoGlobal';
import { BotaoPadrao } from '../componentes/botaoPadrao';

export const Catalogo = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { dispatch } = usarContextoGlobal();

  useEffect(() => {
    setProdutos(obterCatalogo());
  }, []);

  const handleAdicionar = (produto: Produto) => {
    dispatch({ type: 'ADICIONAR_CESTA', payload: produto });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 mb-8 text-center uppercase tracking-widest">
        Produtos Disponíveis
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="flex flex-col bg-slate-900 border border-slate-800/80 p-5 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] relative overflow-hidden group"
          >
            <div className="flex-1 flex justify-center items-center h-44 mb-4 rounded-xl bg-slate-950/60 border border-slate-800/40 p-4 transition-colors group-hover:bg-slate-950">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="max-h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.03)] transition-transform duration-300 group-hover:scale-110"
              />


            </div>

            <h2 className="text-base font-black text-white mb-2 uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
              {produto.nome}
            </h2>

            <div className="text-[11px] text-slate-400 mb-4 flex-1 space-y-1 bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">

              {produto.plataforma && (
                <p>
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Plataforma:</span>{' '}
                  <span className="text-slate-200">{produto.plataforma}</span>
                </p>
              )}

              {produto.capacidade && (
                <p>
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Capacidade:</span>{' '}
                  <span className="text-slate-200">{produto.capacidade}</span>
                </p>
              )}

              {produto.genero && (
                <p>
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Gênero:</span>{' '}
                  <span className="text-slate-200">{produto.genero}</span>
                </p>
              )}

              {produto.multijogador && (
                <p>
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Multijogador:</span>{' '}
                  <span className="text-slate-200">{produto.multijogador}</span>
                </p>
              )}

            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-auto pt-3 border-t border-slate-800">
              <span className="text-sm font-black text-cyan-400 tracking-wider text-center sm:text-left">
                {produto.preco} $
              </span>
              <BotaoPadrao
                texto="Comprar"
                onClick={() => handleAdicionar(produto)}
                className="text-[10px] py-2 px-3 tracking-widest"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
