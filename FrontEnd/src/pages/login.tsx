import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { usarContextoGlobal } from '../models/contextoGlobal';
import { InputPadrao } from '../componentes/inputPadrao';
import { BotaoPadrao } from '../componentes/botaoPadrao';

export const Login = () => {
  const { state, dispatch } = usarContextoGlobal();
  const navigate = useNavigate();
  
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [etapa, setEtapa] = useState<1 | 2>(state.codigo2FAGerado && !state.autenticado ? 2 : 1);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [codigoInserido, setCodigoInserido] = useState('');
  
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const enviarEmail2FA = async (emailDestino: string) => {
    setCarregando(true);
    setErro(null);

    const codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();
    dispatch({ type: 'GERAR_2FA', payload: codigoGerado });

    const SERVICE_ID = 'service_2rurxeg';
    const TEMPLATE_ID = 'template_n3ws2ol';
    const PUBLIC_KEY = '7oADRSfrdqg7q-GHa';

    const templateParams = {
      to_email: emailDestino,
      codigo_2fa: codigoGerado,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setEtapa(2);
    } catch (error: any) {
      console.error(error);
      setErro(`Falha de disparo no e-mail. Código gerado de escape: ${codigoGerado}`);
      setEtapa(2); // Mantém avanço em teste para desenvolvimento fluido
    } finally {
      setCarregando(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) return;
    
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.mensagem || 'Erro ao efetuar autenticação.');
        setCarregando(false);
        return;
      }
      
      dispatch({ type: 'INICIAR_LOGIN', payload: email });
      await enviarEmail2FA(email);
    } catch (error) {
      setErro('A API local do backend (Porta 5000) está desconectada.');
      setCarregando(false);
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !senha) return;
    
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch('http://localhost:5000/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.mensagem || 'Erro ao forjar novo cadastro.');
        setCarregando(false);
        return;
      }
      
      dispatch({ type: 'INICIAR_LOGIN', payload: email });
      await enviarEmail2FA(email);
    } catch (error) {
      setErro('A API local do backend (Porta 5000) está desconectada.');
      setCarregando(false);
    }
  };

  const handleValidar2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (codigoInserido === state.codigo2FAGerado) {
      dispatch({ type: 'CONFIRMAR_2FA' });
      navigate('/cesta');
    } else {
      setErro('Código de Duplo Fator incorreto.');
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
        
        {etapa === 1 && (
          <>
            <h2 className="text-xl font-black text-center text-white mb-6 uppercase tracking-wider">
              {modo === 'login' ? ' Autenticação ' : ' Criar Conta '}
            </h2>
            
            {erro && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-300 px-4 py-2.5 rounded-lg text-xs font-semibold text-center mb-5">
                {erro}
              </div>
            )}

            <form onSubmit={modo === 'login' ? handleLogin : handleCadastro} className="flex flex-col">
              {modo === 'cadastro' && (
                <InputPadrao 
                  label="Nome do usuário" 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  required 
                  placeholder="Player_01"
                />
              )}
              <InputPadrao 
                label="Endereço de E-mail" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="player@dominio.com"
              />
              <InputPadrao 
                label="Senha de Acesso" 
                type="password" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                required 
                placeholder="********"
              />
              <BotaoPadrao 
                texto={carregando ? "Sincronizando..." : modo === 'login' ? "Conectar" : "Registrar Conta"} 
                type="submit" 
                className="mt-4 py-3" 
                disabled={carregando}
              />
              <p className="mt-5 text-center text-xs text-slate-400 tracking-wide">
                {modo === 'login' ? "Novo no servidor?" : "Já possui um ID cadastrado?"}{' '}
                <button 
                  type="button" 
                  onClick={() => { setModo(modo === 'login' ? 'cadastro' : 'login'); setErro(null); }} 
                  className="font-bold text-cyan-400 hover:text-cyan-300 underline transition-colors ml-1"
                >
                  {modo === 'login' ? 'Cadastre-se' : 'Faça Login'}
                </button>
              </p>
            </form>
          </>
        )}

        {etapa === 2 && (
          <form onSubmit={handleValidar2FA} className="flex flex-col">
            <h2 className="text-xl font-black text-center text-white mb-2 uppercase tracking-wider">🛡️ Segurança 2FA</h2>
            <p className="text-center text-slate-400 text-xs mb-6">Insira o token de verificação enviado para o seu e-mail.</p>
            
            {erro && (
              <div className="bg-rose-950/80 border border-rose-800 text-rose-300 px-4 py-2.5 rounded-lg text-xs font-semibold text-center mb-5">
                {erro}
              </div>
            )}

            <InputPadrao 
              label="Token de Acesso (6 dígitos)" 
              type="text" 
              maxLength={6}
              value={codigoInserido} 
              onChange={(e) => setCodigoInserido(e.target.value)} 
              required 
              placeholder="000000"
              className="text-center tracking-[0.5em] text-lg font-mono font-black"
            />
            
            <BotaoPadrao 
              texto="Confirmar Token" 
              type="submit" 
              className="mt-4 py-3" 
            />
          </form>
        )}
      </div>
    </div>
  );
};
