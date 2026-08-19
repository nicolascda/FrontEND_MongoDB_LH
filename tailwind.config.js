/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        illury: {
          // O antigo Dourado agora mapeia para o Ciano Neon (Cor de Ação Principal)
          dourado: {
            DEFAULT: '#06b6d4', // cyan-500
            escuro: '#0891b2'   // cyan-600
          },
          // O antigo Verde agora mapeia para o Roxo Elétrico (Gradientes e Alertas)
          verde: {
            DEFAULT: '#a855f7', // purple-500
            escuro: '#7e22ce'   // purple-700
          },
          // O antigo Marrom agora vira o Azul Escuro de HUD (Fundo de Painéis e Cards)
          marrom: {
            DEFAULT: '#1e293b', // slate-800
            escuro: '#0f172a'   // slate-900
          },
          // O antigo Beje agora vira o Fundo Principal Gamer Profundo
          beje: {
            DEFAULT: '#020617', // slate-950
            escuro: '#030712'   // cinza/preto absoluto
          },
          // O antigo Pêssego agora vira um Azul Marinho Digital para a AppBar
          pessego: {
            DEFAULT: '#0f172a', // slate-900
            escuro: '#020617'   // slate-950
          }
        }
      }
    },
  },
  plugins: [],
}