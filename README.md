# Welcome to Your Miaoda Project
Miaoda Application Link URL
    URL:https://medo.dev/projects/app-813evjiby1oh

# EEPD-BH - Site Institucional

Site institucional da Escola Estadual Presidente Dutra em Belo Horizonte, desenvolvido com React, TypeScript e Supabase.

## Sobre o Projeto

Este é um site institucional moderno e responsivo para a Escola Estadual Presidente Dutra (EEPD-BH), oferecendo:

- **Página Inicial**: História da escola, missão, visão e valores com carrossel de imagens
- **Cursos**: Apresentação dos 8 cursos técnicos oferecidos
- **Notícias**: Blog com notícias e eventos da escola
- **Contato**: Formulário de contato com validação
- **Sistema de Login**: Autenticação para professores e alunos
- **Áreas Restritas**: Páginas para visualização de professores e alunos cadastrados

## Cursos Oferecidos

1. Desenvolvimento de Sistemas
2. Informática
3. Logística
4. Fabricação Mecânica
5. Energias Renováveis
6. Segurança do Trabalho
7. Propedêutica
8. Eletrônica

## Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Armazenamento**: Supabase Storage
- **Build Tool**: Vite
- **Routing**: React Router v7

## Estrutura do Projeto

```
├── README.md                 # Documentação
├── index.html               # Arquivo HTML principal
├── package.json             # Dependências do projeto
├── src/
│   ├── App.tsx             # Componente principal
│   ├── main.tsx            # Ponto de entrada
│   ├── routes.tsx          # Configuração de rotas
│   ├── components/         # Componentes reutilizáveis
│   │   ├── common/        # Header, Footer
│   │   └── ui/            # Componentes shadcn/ui
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home.tsx       # Página inicial
│   │   ├── Courses.tsx    # Página de cursos
│   │   ├── Blog.tsx       # Página de notícias
│   │   ├── Contact.tsx    # Página de contato
│   │   ├── Login.tsx      # Página de login
│   │   ├── Register.tsx   # Página de cadastro
│   │   ├── Teachers.tsx   # Página de professores
│   │   └── Students.tsx   # Página de alunos
│   ├── db/                # Configuração do banco de dados
│   │   ├── supabase.ts    # Cliente Supabase
│   │   └── api.ts         # Funções de API
│   ├── types/             # Definições de tipos TypeScript
│   └── hooks/             # Hooks customizados
├── supabase/
│   └── migrations/        # Migrações do banco de dados
└── tailwind.config.js     # Configuração do Tailwind CSS
```

## Funcionalidades

### Públicas (Sem autenticação)
- Visualização da história e informações da escola
- Navegação pelo carrossel de imagens
- Consulta de cursos oferecidos
- Leitura de notícias e eventos publicados
- Envio de mensagens através do formulário de contato
- Cadastro de nova conta (professor ou aluno)

### Autenticadas (Requer login)
- Visualização da lista de professores cadastrados
- Visualização da lista de alunos cadastrados
- Logout do sistema

### Administrativas (Requer permissão de admin)
- Gerenciamento de cursos
- Publicação e edição de notícias
- Visualização de mensagens de contato
- Gerenciamento de imagens do carrossel

## Banco de Dados

O projeto utiliza Supabase com as seguintes tabelas:

- **profiles**: Perfis de usuários (alunos, professores, admins)
- **courses**: Cursos oferecidos pela escola
- **blog_posts**: Notícias e eventos
- **contact_messages**: Mensagens enviadas pelo formulário
- **carousel_images**: Imagens do carrossel da página inicial

## Design

O site utiliza um esquema de cores educacional com:
- **Cor Primária**: Azul (#0066B3) - representa confiança e profissionalismo
- **Cor Secundária**: Branco e tons claros de azul
- **Tipografia**: Fontes legíveis e profissionais
- **Layout**: Responsivo, adaptado para desktop e mobile

## Requisitos do Sistema

```
Node.js ≥ 20
npm ≥ 10
```

## Instalação e Configuração

### 1. Instalar Dependências

```bash
npm install
# ou
pnpm install
```

### 2. Configurar Variáveis de Ambiente

O arquivo `.env` já está configurado com as credenciais do Supabase.

### 3. Executar o Projeto

```bash
npm run dev -- --host 127.0.0.1
# ou
npx vite --host 127.0.0.1
```

O site estará disponível em `http://127.0.0.1:5173`

## Dados Iniciais

O banco de dados já vem pré-populado com:
- **8 cursos técnicos** com descrições, cargas horárias e grades curriculares
- Estrutura completa de tabelas e políticas de segurança

Para adicionar notícias, imagens do carrossel ou criar usuários administradores, é necessário:
1. Criar uma conta através da página de cadastro
2. Acessar o painel do Supabase para promover o usuário a admin
3. Fazer login e gerenciar o conteúdo

## Informações Institucionais

- **CNPJ**: 000.000/0001-0C
- **SRE**: METROPOLITANA - A
- **CEP**: 00000-000
- **Endereço**: Rua XXXX Nº XXXX, Belo Horizonte - MG

## Créditos

Desenvolvido pelo curso de Desenvolvimento de Sistemas da EEPD-BH.

---

**Nota**: Este projeto foi desenvolvido com tecnologias modernas (React + TypeScript + Supabase) ao invés da stack PHP/MySQL originalmente especificada, oferecendo melhor performance, segurança e experiência de desenvolvimento.

