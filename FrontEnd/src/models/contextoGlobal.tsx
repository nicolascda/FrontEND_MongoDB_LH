import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { Produto } from './dadosMockados';

export interface ItemCesta extends Produto {
  quantidade: number;
}

export interface EstadoGlobal {
  cesta: ItemCesta[];
  autenticado: boolean;
  codigo2FAGerado: string | null;
  usuario: string | null;
}

type AcaoContexto =
  | { type: 'ADICIONAR_CESTA'; payload: Produto }
  | { type: 'REMOVER_CESTA'; payload: number }
  | { type: 'DIMINUIR_CESTA'; payload: number }
  | { type: 'INICIAR_LOGIN'; payload: string }
  | { type: 'GERAR_2FA'; payload: string }
  | { type: 'CONFIRMAR_2FA' }
  | { type: 'LOGOUT' };

const getEstadoInicial = (): EstadoGlobal => {
  const sessionData = localStorage.getItem('illury_auth_session');
  let auth = { autenticado: false, codigo2FAGerado: null, usuario: null };
  
  if (sessionData) {
    try {
      auth = JSON.parse(sessionData);
    } catch (error) {
      console.error('Erro ao ler sessão do localStorage', error);
    }
  }

  return {
    cesta: [],
    ...auth
  };
};

const estadoInicial: EstadoGlobal = getEstadoInicial();

const reducer = (state: EstadoGlobal, action: AcaoContexto): EstadoGlobal => {
  switch (action.type) {
    case 'ADICIONAR_CESTA': {
      const itemExistente = state.cesta.find(item => item.id === action.payload.id);
      if (itemExistente) {
        return {
          ...state,
          cesta: state.cesta.map(item =>
            item.id === action.payload.id ? { ...item, quantidade: item.quantidade + 1 } : item
          )
        };
      }
      return { ...state, cesta: [...state.cesta, { ...action.payload, quantidade: 1 }] };
    }
    case 'DIMINUIR_CESTA': {
      const itemExistente = state.cesta.find(item => item.id === action.payload);
      if (itemExistente && itemExistente.quantidade > 1) {
        return {
          ...state,
          cesta: state.cesta.map(item =>
            item.id === action.payload ? { ...item, quantidade: item.quantidade - 1 } : item
          )
        };
      }
      return { ...state, cesta: state.cesta.filter(item => item.id !== action.payload) };
    }
    case 'REMOVER_CESTA':
      return { ...state, cesta: state.cesta.filter(item => item.id !== action.payload) };
    case 'INICIAR_LOGIN':
      return { ...state, usuario: action.payload };
    case 'GERAR_2FA':
      return { ...state, codigo2FAGerado: action.payload };
    case 'CONFIRMAR_2FA':
      return { ...state, autenticado: true, codigo2FAGerado: null };
    case 'LOGOUT':
      return { ...state, autenticado: false, usuario: null, cesta: [] };
    default:
      return state;
  }
};

const ContextoGlobal = createContext<{
  state: EstadoGlobal;
  dispatch: React.Dispatch<AcaoContexto>;
}>({ state: estadoInicial, dispatch: () => null });

export const ProviderGlobal = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  React.useEffect(() => {
    const authData = {
      autenticado: state.autenticado,
      codigo2FAGerado: state.codigo2FAGerado,
      usuario: state.usuario
    };
    localStorage.setItem('illury_auth_session', JSON.stringify(authData));
  }, [state.autenticado, state.codigo2FAGerado, state.usuario]);

  return (
    <ContextoGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextoGlobal.Provider>
  );
};

export const usarContextoGlobal = () => useContext(ContextoGlobal);
