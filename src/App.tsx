import React, { useEffect } from 'react';
import { Appbar } from './componentes/appbar';
import { AppRoutes } from './routes';
import { inicializarMockData } from './models/dadosMockados';

function App() {
  useEffect(() => {
    // Inicializa o localStorage com o novo catálogo de skins e drops gamer se estiver vazio
    inicializarMockData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased">
      <Appbar />
      <main className="flex-grow flex flex-col">
        <AppRoutes />
      </main>
      
      {/* Rodapé Estilo Gamer Lobby */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-center p-5 text-xs font-semibold tracking-wider uppercase">
        <p> LOGJA.COM.BR - Todos os direitos reservados para o comprador.</p>
      </footer>
    </div>
  );
}

export default App;
