import { ENDPOINTS_IMAGENS } from '../constantes/endpoints';

// 1. Interface espelhando EXATAMENTE o banco MongoDB
export interface Produto {
  _id: string;            
  nome_produto: string;   
  valor: number;          
  imagem: string;
  capacidade?: string | null; 
  plataforma?: string | null;
  multijogador?: string | null;
  genero?: string | null;
}

// 2. Função utilitária principal para buscar os dados diretamente do seu MongoDB
export const buscarProdutosDoBanco = async (): Promise<Produto[]> => {
  try {
    const resposta = await fetch('http://localhost:3000/api/produtos');
    
    if (!resposta.ok) {
      throw new Error('Falha ao conectar com o cofre de artefatos.');
    }
    
    const dados: Produto[] = await resposta.json();
    return dados;
  } catch (error) {
    console.error('Erro na requisição de produtos:', error);
    return []; 
  }
};

// 3. Inicializa o LocalStorage apenas de forma vazia caso não exista nada salvo localmente
export const inicializarMockData = () => {
  const data = localStorage.getItem("illury_catalogo");
  if (!data) {
    localStorage.setItem("illury_catalogo", JSON.stringify([]));
  }
};

// 4. Retorna o catálogo salvo no LocalStorage convertido para a nova tipagem
export const obterCatalogo = (): Produto[] => {
  const data = localStorage.getItem("illury_catalogo");
  return data ? JSON.parse(data) : [];
};
