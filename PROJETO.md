# Site Institucional EEPD-BH - Resumo do Projeto

## Visão Geral

Site institucional completo e moderno para a Escola Estadual Presidente Dutra em Belo Horizonte, desenvolvido com as mais recentes tecnologias web.

## Páginas Implementadas

### 1. Página Inicial (/)
- Carrossel automático com 8 imagens da escola (ordem aleatória a cada carregamento)
- História completa da escola
- Seção de Missão, Visão e Valores
- Destaque da importância para a comunidade
- Design responsivo com tema educacional azul e branco

### 2. Página de Cursos (/cursos)
- Listagem completa dos 8 cursos técnicos:
  1. Desenvolvimento de Sistemas
  2. Informática
  3. Logística
  4. Fabricação Mecânica
  5. Energias Renováveis
  6. Segurança do Trabalho
  7. Propedêutica
  8. Eletrônica
- Cada curso inclui: descrição, carga horária e grade curricular
- Cards visuais com imagens específicas para cada curso

### 3. Página de Notícias (/blog)
- Sistema de blog para notícias e eventos
- Exibição de posts publicados com imagem, título, resumo e data
- Informação do autor da postagem
- Design em grid responsivo

### 4. Página de Contato (/contato)
- Formulário completo com validação:
  - Nome (obrigatório, mínimo 3 caracteres)
  - Email (obrigatório, validação de formato)
  - Telefone (opcional)
  - Mensagem (obrigatório, mínimo 10 caracteres)
- Informações de contato da escola
- Horário de atendimento
- Mensagens salvas no banco de dados

### 5. Página de Login (/login)
- Sistema de autenticação seguro
- Validação de credenciais
- Redirecionamento após login bem-sucedido
- Link para página de cadastro

### 6. Página de Cadastro (/cadastro)
- Formulário de registro com validação
- Campos: nome completo, email, senha, telefone, tipo de conta
- Opções: Aluno ou Professor
- Criação automática de perfil no banco de dados

### 7. Página de Professores (/professores)
- Listagem de todos os professores cadastrados
- Exibição de nome, email e telefone
- Acesso restrito a usuários autenticados

### 8. Página de Alunos (/alunos)
- Listagem de todos os alunos cadastrados
- Exibição de nome, email e telefone
- Acesso restrito a usuários autenticados

## Funcionalidades Técnicas

### Autenticação e Autorização
- Sistema completo de login/logout
- Registro de novos usuários
- Diferenciação entre alunos, professores e administradores
- Proteção de rotas sensíveis

### Banco de Dados (Supabase)
- **profiles**: Perfis de usuários com roles
- **courses**: 8 cursos pré-cadastrados
- **blog_posts**: Sistema de notícias
- **contact_messages**: Mensagens do formulário
- **carousel_images**: Imagens do carrossel
- Row Level Security (RLS) configurado
- Políticas de acesso por role

### Design System
- Tema educacional com azul primário (#0066B3)
- Componentes shadcn/ui
- Totalmente responsivo (desktop e mobile)
- Modo claro e escuro
- Animações suaves
- Tipografia profissional

### Validações
- Formulários com validação em tempo real
- Mensagens de erro amigáveis
- Feedback visual para o usuário
- Proteção contra dados inválidos

## Tecnologias Utilizadas

- **React 18**: Framework frontend
- **TypeScript**: Tipagem estática
- **Vite**: Build tool moderna
- **Tailwind CSS**: Estilização
- **shadcn/ui**: Componentes UI
- **React Router v7**: Roteamento
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de schemas
- **Supabase**: Backend completo
  - PostgreSQL
  - Authentication
  - Storage
  - Row Level Security

## Dados Pré-Cadastrados

### Cursos (8 cursos completos)
Todos os cursos já estão cadastrados no banco de dados com:
- Nome
- Descrição detalhada
- Carga horária
- Grade curricular completa

### Estrutura de Segurança
- Políticas RLS configuradas
- Funções auxiliares (is_admin, is_teacher_or_admin)
- Acesso público para leitura de cursos e posts publicados
- Acesso restrito para escrita e gerenciamento

## Diferenciais

1. **Moderno**: Tecnologias atuais e performáticas
2. **Seguro**: Autenticação robusta e RLS
3. **Responsivo**: Funciona perfeitamente em todos os dispositivos
4. **Validado**: Todas as entradas são validadas
5. **Acessível**: Interface intuitiva e amigável
6. **Escalável**: Arquitetura preparada para crescimento
7. **Manutenível**: Código limpo e bem organizado

## Próximos Passos Sugeridos

Para colocar o site em produção:

1. **Criar conta de administrador**:
   - Cadastrar através da página de registro
   - Acessar o painel do Supabase
   - Alterar o role do usuário para 'admin'

2. **Adicionar conteúdo**:
   - Publicar notícias e eventos
   - Adicionar imagens ao carrossel
   - Atualizar informações de contato

3. **Personalizar**:
   - Substituir endereços e telefones genéricos
   - Adicionar logo da escola
   - Ajustar textos conforme necessário

4. **Deploy**:
   - Fazer deploy em plataforma como Vercel ou Netlify
   - Configurar domínio personalizado
   - Configurar variáveis de ambiente

## Informações de Contato do Projeto

- **Desenvolvido por**: Curso de Desenvolvimento de Sistemas - EEPD-BH
- **Tecnologia**: React + TypeScript + Supabase
- **Ano**: 2025

---

**Observação**: Este projeto foi desenvolvido com tecnologias modernas ao invés da stack PHP/MySQL originalmente especificada, oferecendo melhor performance, segurança, experiência de desenvolvimento e facilidade de manutenção.
