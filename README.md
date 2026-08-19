# Illury - Front-end Loja de Artefatos Mágicos

Este projeto é a interface de usuário (Front-end) da loja de artefatos mágicos **Illury**. Construído utilizando as melhores e mais modernas ferramentas do ecossistema React.

## Tecnologias Utilizadas

- **React 18** (Biblioteca de UI)
- **TypeScript** (Tipagem estática para maior segurança e previsibilidade do código)
- **Vite** (Bundler e Dev Server extremamente rápido)
- **Tailwind CSS** (Framework de CSS utilitário para estilização rápida e responsiva)
- **Lucide React** (Biblioteca de ícones SVG)
- **React Router Dom** (Navegação SPA)
- **Embla Carousel React** (Carrossel fluido e leve)

---

## Como Rodar o Projeto

Caso você tenha recém-baixado este repositório, você precisará do **Node.js** instalado em sua máquina. Siga os passos:

1. Abra o terminal na pasta do projeto (`front_end`).
2. Instale as dependências executando:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse o link fornecido no terminal (geralmente `http://localhost:5173`).

---

## Estrutura do Projeto (Padrão MVC no Front-end)

O projeto foi organizado separando responsabilidades lógicas e visuais, similar a um padrão Model-View-Controller, mas adaptado ao paradigma do React.

```text
src/
 ┣ componentes/        # Componentes visuais isolados, reutilizáveis e padronizados
 ┣ models/             # Lógica de negócio, regras de dados e gerenciamento de estado global
 ┣ pages/              # Views principais (telas da aplicação)
 ┣ style/              # Configurações globais de estilização
 ┣ App.tsx             # Arquivo raiz de rotas e layout mestre
 ┗ main.tsx            # Ponto de entrada (Entrypoint) do React
```

---

## Explicação Linha por Linha das Implementações

Abaixo, detalhamos o que foi feito nos principais arquivos e configurações.

### 1. Configuração do Tailwind CSS (`tailwind.config.js` e `global.css`)
- **`tailwind.config.js`**:
  - `darkMode: 'class'`: Configurado para permitir a alternância de modo escuro utilizando a classe `.dark` no elemento root, facilitando a estilização dual de cores.
  - `theme.extend.colors`: Adicionamos a paleta de cores exclusivas da Illury (`illury-dourado`, `illury-verde`, etc.) com variantes padrão (claro/pastel) e `escuro` para o modo noturno.
- **`global.css`**:
  - `@tailwind base; @tailwind components; @tailwind utilities;`: Injeta as classes utilitárias em todo o projeto.
  - `@layer components`: Permite criar "classes de componentes" que unem várias diretivas do Tailwind. Criamos as diretivas `.textura-borda` e `.textura-borda-solida` para aplicar sombras, bordas tracejadas e duplas aos cards, conferindo um ar mágico e rústico.

### 2. Uso Global vs Uso Local do Tailwind CSS
**O que fizemos (Uso Global)**:
Ao importar `@tailwind` no `global.css` e este arquivo no `main.tsx`, **todas** as classes utilitárias do Tailwind (`bg-red-500`, `flex`, `text-center`) ficam disponíveis globalmente em qualquer arquivo JSX/TSX. Esse é o padrão recomendado pela equipe do Tailwind, pois permite construir interfaces rapidamente sem se preocupar em nomear classes.

**Alternativa (Uso Local/Modulado)**:
Se a necessidade fosse restringir o estilo para não vazar globalmente (comum em arquiteturas de micro-frontends ou injeção em páginas legadas), usaríamos **CSS Modules**. 
Exemplo de Uso Local:
1. Criaríamos `Botao.module.css`.
2. Dentro dele, usaríamos `@apply bg-blue-500 text-white rounded;`.
3. No componente, importaríamos: `import styles from './Botao.module.css'` e aplicaríamos `<button className={styles.botao}>`.
Neste projeto **Illury**, optamos pelo **uso global** pois maximiza a produtividade e a consistência visual em toda a aplicação SPA.

### 3. Modelos e Estado Global (`models/`)
- **`dadosMockados.ts`**:
  - Define a interface `Produto` (TypeScript) garantindo que todo artefato mágico siga um contrato (id, nome, preco, imagem, etc.).
  - A função `inicializarMockData` checa se o `localStorage` possui a chave `"illury_catalogo"`. Se não, ele insere as espadas, cetros e escudos iniciais.
- **`contextoGlobal.tsx`**:
  - Implementa a **Context API do React** (nativa) unida ao Hook **useReducer**.
  - O estado engloba `cesta` (array de itens), `autenticado` (booleano), `codigo2FAGerado` (string) e `usuario` (string).
  - O **Reducer** cuida da lógica complexa de forma pura: ao receber a ação `'ADICIONAR_CESTA'`, ele varre a cesta; se o item já existe, aumenta a quantidade; se não, adiciona com quantidade 1.
  - `ProviderGlobal` encapsula toda a aplicação lá no `main.tsx`, fornecendo esse estado para todas as páginas sem "prop drilling" (passagem infinita de propriedades).

### 4. Componentes (`componentes/`)
- **`botaoPadrao.tsx` e `inputPadrao.tsx`**:
  - Encapsulam as tags nativas `<button>` e `<input>` estendendo seus atributos HTML normais usando `ButtonHTMLAttributes` e `InputHTMLAttributes` do React.
  - Recebem a propriedade mágica `...props` (Rest Operator), permitindo passar `onClick`, `onChange`, `placeholder` dinamicamente no momento do uso.
- **`appbar.tsx`**:
  - Barra superior fixada com navegação via `Link` (do React Router Dom) evitando o recarregamento da página.
  - Recupera o total de itens da cesta chamando o `usarContextoGlobal` e exibe um "badge" vermelho em cima do ícone do carrinho de compras caso haja algo lá.

### 5. Páginas (Views)
- **`home.tsx`**:
  - Ponto de entrada do usuário. Apresenta o banner principal com o personagem da loja e logo abaixo um carrossel.
  - Utiliza o `useEmblaCarousel` extraindo as referências e anexando à div de contêiner. Passamos no array os 3 primeiros itens extraídos de `obterCatalogo()` para girarem no carrossel.
- **`catalogo.tsx`**:
  - Renderiza todos os itens do `localStorage` num grid responsivo (1 coluna mobile, até 4 no desktop).
  - Aciona o despacho (`dispatch`) global no clique de compra.
- **`login.tsx` (Fluxo 2FA Nativo)**:
  - Usa estados locais (`useState`) para controlar se o usuário está na Etapa 1 (Email/Senha) ou Etapa 2 (Código 2FA).
  - Ao validar a Etapa 1, disparamos a ação `'GERAR_2FA'` para o Reducer com um `Math.random` simulando um código mágico de 6 dígitos (enviado ficticiamente por e-mail, mas exibido no log/alerta).
  - A Etapa 2 compara o código digitado com o gerado que reside na memória protegida do Contexto Global.
- **`cesta.tsx` (Rota Protegida e IoT)**:
  - Usa `useEffect` para validar logo ao montar o componente: se `state.autenticado` for `false`, manda o usuário de volta pro `/login` através do `navigate()`.
  - Exibe a lista final somando os valores, além de prever os Placeholders do status de entrega conectados à futuros sensores IoT.

### 6. Inicialização (App e Main)
- **`App.tsx`**: Mapeia as Rotas (`<Routes>`) ligando cada caminho (URL) a um Componente (Page).
- **`main.tsx`**: Envolve o `<App />` com os Provedores principais: `<ProviderGlobal>` (nosso estado de negócio) e `<BrowserRouter>` (motor de navegação URL).
"# FrontEND_MongoDB_LH" 
