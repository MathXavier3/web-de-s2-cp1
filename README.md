# Sistema de Cadastro - Jogadoras de Futebol Feminino

## 📋 Sobre o Projeto

Este é um sistema web desenvolvido para gerenciar informações de jogadoras de futebol feminino, permitindo realizar operações CRUD (Create, Read, Update, Delete) completas. A aplicação utiliza HTML, CSS e JavaScript puro, com armazenamento local no navegador através do LocalStorage.

## 👥 Integrantes

- **Felipe Riofrio Cheban Nicolau** - RM 563068
- **Matheus Augusto Santa Rosa Costa Xavier** - RM 565931

## 🚀 Funcionalidades

### ✅ Requisitos Obrigatórios

1. **Inicialização**

   - Carregamento automático dos dados iniciais no LocalStorage
   - 5 jogadoras pré-cadastradas do Corinthians

2. **Listagem (Read)**

   - Exibição em cards com foto, nome, posição, clube e estatísticas
   - Design responsivo e moderno

3. **Sistema de Favoritos**

   - Ícone de estrela para marcar/desmarcar jogadoras como favoritas
   - Persistência no LocalStorage
   - Destaque visual para jogadoras favoritas

4. **Cadastro (Create)**

   - Formulário completo com validação
   - Campos: nome, posição, clube, foto (URL), gols, assistências, jogos
   - Validação de campos obrigatórios
   - Feedback de sucesso

5. **Edição (Update)**

   - Edição completa de dados existentes
   - Formulário pré-preenchido
   - Feedback de sucesso

6. **Remoção (Delete)**
   - Confirmação via modal
   - Feedback de sucesso

### 🎁 Funcionalidades Bônus

1. **Campo de Busca**

   - Busca por nome ou posição em tempo real

2. **Filtro por Clube**

   - Dropdown com todos os clubes cadastrados
   - Filtro dinâmico

3. **Ordenação**
   - Por nome (alfabética)
   - Por posição (alfabética)
   - Por gols (maior para menor)
   - Por jogos (maior para menor)

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com Flexbox e Grid
- **JavaScript ES6+** - Lógica da aplicação
- **LocalStorage** - Persistência de dados
- **Font Awesome** - Ícones

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITORIO]
```

2. Abra o arquivo `index.html` em qualquer navegador moderno

3. A aplicação carregará automaticamente com as jogadoras iniciais

## 📊 Dados Iniciais

A aplicação vem pré-carregada com 5 jogadoras do Corinthians:

- **Andressa Alves** (Meio-campo)
- **Dayana Rodríguez** (Meio-campo)
- **Mariza** (Zagueira)
- **Thaís Regina** (Zagueira)
- **Letícia Teles** (Zagueira)

## 🔧 Estrutura do Projeto

```
web-de-s2-cp1/
├── index.html          # Página principal
├── styles.css          # Estilos da aplicação
├── script.js           # Lógica JavaScript
└── README.md           # Documentação
```

## 📝 Funcionalidades Detalhadas

### Formulário de Cadastro/Edição

- Validação em tempo real
- Campos obrigatórios marcados com \*
- Suporte a URLs de imagem
- Números inteiros para estatísticas

### Sistema de Favoritos

- Toggle com ícone de estrela
- Persistência no LocalStorage
- Destaque visual (borda dourada)

### Busca e Filtros

- Busca instantânea por nome ou posição
- Filtro dinâmico por clube
- Ordenação múltipla
- Combinação de filtros

### Feedback Visual

- Alertas de sucesso/erro
- Modal de confirmação
- Estados de loading
- Mensagens informativas

## 🌐 Deploy

A aplicação está disponível no GitHub Pages:
**[]**

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte da avaliação CP1 da disciplina de Desenvolvimento Web.

---

**Desenvolvido com ❤️ para o futebol feminino brasileiro**
