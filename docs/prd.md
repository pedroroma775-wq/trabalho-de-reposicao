# Documento de Requisitos do Site EEPD-BH

## 1. Nome do Site
Site Institucional da Escola Presidente Dutra - BH (EEPD-BH)\n
## 2. Descrição do Site
Site institucional desenvolvido em PHP puro com banco de dados MySQL, destinado a apresentar a escola, seus cursos, notícias e facilitar a comunicação com a comunidade escolar através de sistema de login para professores e alunos.

## 3. Funcionalidades Principais

### 3.1 Página Inicial (Index.php)
- Exibição da história da escola com texto sobre origem, missão, visão e importância para a comunidade
- Carrossel com 8 imagens carregadas de forma randômica utilizando Bootstrap
- Menu de navegação principal com acesso a todas as seções

### 3.2 Página de Cursos\n- Listagem dos8 cursos oferecidos: Desenvolvimento de Sistemas, Informática, Logística, Fabricação Mecânica, Energias Renováveis, Segurança do Trabalho, Propedêutica e Eletrônica
- Cada curso contém: descrição, carga horária, grade curricular e imagens ilustrativas
\n### 3.3 Blog
- Área para postagem de notícias, eventos e comunicados da escola
- Sistema dinâmico com PHP e MySQL\n\n### 3.4 Contato
- Formulário com campos: nome, email, telefone e mensagem
- Envio via PHP com validação de dados

### 3.5 Sistema de Login e Cadastro
- Login diferenciado para professores e alunos
- Cadastro com campos: nome, email, telefone, senha\n- Autenticação via banco de dados MySQL

### 3.6 Páginas de Professores e Alunos
- Áreas separadas para listagem e gerenciamento de professores e alunos
\n### 3.7 Rodapé
- Informações institucionais: CNPJ (000.000/0001-0C), SRE - METROPOLITANA - A, CEP (00000-000), Endereço (Rua XXXX Nº XXXX), Belo Horizonte - Minas Gerais - Brasil
- Créditos:'Desenvolvido pelo Desenvolvimento de Sistemas @ Todos os direitos reservados a EEPD'

## 4. Tecnologias Utilizadas
- HTML5
- Bootstrap (para carrossel e responsividade)
- CSS (folhas de estilo separadas)
- PHP puro
- MySQL
- XAMPP (Apache + MySQL)
- Visual Studio Code
- Git / GitHub
\n## 5. Estrutura de Arquivos
```
/project
│ index.php
│ README.md
│ conexao.php
│ style.css
│
├── /assets
│     ├── /img
│     └── /icons
│
├── /pages
│     ├── escola.php
│     ├── cursos.php
│     ├── blog.php
│     ├── contato.php
│     ├── login.php
│     ├── cadastro.php
│     ├── professores.php
│     └── alunos.php
│
└── /scripts
       └── funções.php
```

## 6. Estilo de Design
- Configuração de cores: tons institucionais que remetem à educação (azul escuro e branco como cores principais)
- Layout: estrutura organizada em cards para cursos, layout responsivo com Bootstrap
- Elementos visuais: carrossel dinâmico na página inicial, ícones para identificação de seções, bordas suaves nos formulários
- Tipografia: fontes legíveis e profissionais adequadas para ambiente educacional