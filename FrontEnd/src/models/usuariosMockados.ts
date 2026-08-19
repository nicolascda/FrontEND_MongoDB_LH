export interface Usuario {
  nome: string;
  email: string;
  senhaHash: string;
}

// NOTA: Funções locais aposentadas. Integração direta com a API na porta 5000 ativa!
// const CHAVE_STORAGE = 'illury_usuarios';
// export const obterUsuarios = (): Usuario[] => { ... }
// export const usuarioExiste = (email: string): boolean => { ... }
// export const cadastrarUsuario = (usuario: Usuario): void => { ... }
// export const validarCredenciais = (email: string, senhaTentativa: string): boolean => { ... }
