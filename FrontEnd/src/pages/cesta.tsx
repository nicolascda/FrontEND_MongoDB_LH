import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usarContextoGlobal } from '../models/contextoGlobal';
import { BotaoPadrao } from '../componentes/botaoPadrao';

export const Cesta = () => {
  const { state, dispatch } = usarContextoGlobal();
  const navigate = useNavigate();

  const total = state.cesta.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  const handleFinalizarCompra = () => {
    if (!state.autenticado) {
      navigate('/login');
    } else {
      alert("Sucesso! Os seus itens de jogo já foram processados e injetados na sua conta.");
      dispatch({ type: 'LOGOUT' }); // Limpa a cesta como demonstração de sucesso
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-black text-white mb-8 uppercase tracking-widest border-b border-slate-800 pb-4">
        Itens na lista de compra <span className="text-cyan-400">({state.cesta.length})</span>
      </h1>

      {state.cesta.length === 0 ? (
        <div className="text-center my-16 p-10 rounded-2xl bg-slate-900/50 border border-slate-800 max-w-xl mx-auto shadow-2xl">
          <p className="text-lg text-slate-400 mb-6">Sua cesta está vazia. Explore a loja e compre alguns produtos</p>
          <Link to="/catalogo">
            <BotaoPadrao texto="Abrir Loja de Itens" variante="primario" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de Itens */}
          <div className="flex-1 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-2xl">
            {state.cesta.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 py-4 last:border-0 gap-4">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img src={item.imagem} alt={item.nome} className="w-16 h-16 object-contain bg-slate-950 border border-slate-800 rounded-xl p-2 shadow-inner" />
                  <div>
                    <h3 className="font-black text-white uppercase tracking-wide text-sm">{item.nome}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <button 
                        className="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 px-2.5 py-0.5 rounded-md font-black transition-colors"
                        onClick={() => dispatch({ type: 'DIMINUIR_CESTA', payload: item.id })}
                        title="Diminuir quantidade"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-slate-200 w-6 text-center">{item.quantidade}</span>
                      <button 
                        className="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 px-2.5 py-0.5 rounded-md font-black transition-colors"
                        onClick={() => dispatch({ type: 'ADICIONAR_CESTA', payload: item })}
                        title="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                  <span className="font-black text-cyan-400 tracking-wider text-sm">{item.preco * item.quantidade} $</span>
                  <BotaoPadrao 
                    texto="Remover" 
                    variante="perigo" 
                    onClick={() => dispatch({ type: 'REMOVER_CESTA', payload: item.id })} 
                    className="text-[10px] px-3 py-1.5"
                  />
                </div>
              </div>
            ))}
            
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-lg font-black uppercase tracking-wider">
              <span className="text-slate-400 text-xs">Total do Inventário:</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{total} $</span>
            </div>
            
            <BotaoPadrao 
              texto={state.autenticado ? "Resgatar e Injetar Itens" : "Entrar na Conta para Resgatar"} 
              onClick={handleFinalizarCompra}
              className="w-full mt-6 py-3.5 text-xs tracking-widest" 
            />
          </div>

        
        </div>
      )}
    </div>
  );
};
