/*
# Create School Database Schema

## 1. New Tables

### profiles
- `id` (uuid, primary key, references auth.users)
- `email` (text, unique)
- `full_name` (text)
- `role` (user_role: 'student', 'teacher', 'admin')
- `phone` (text)
- `created_at` (timestamptz)

### courses
- `id` (uuid, primary key)
- `name` (text, not null)
- `description` (text)
- `workload` (text) - carga horária
- `curriculum` (text) - grade curricular
- `image_url` (text)
- `created_at` (timestamptz)

### blog_posts
- `id` (uuid, primary key)
- `title` (text, not null)
- `content` (text, not null)
- `excerpt` (text)
- `image_url` (text)
- `author_id` (uuid, references profiles)
- `published` (boolean, default false)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### contact_messages
- `id` (uuid, primary key)
- `name` (text, not null)
- `email` (text, not null)
- `phone` (text)
- `message` (text, not null)
- `created_at` (timestamptz)

### carousel_images
- `id` (uuid, primary key)
- `image_url` (text, not null)
- `title` (text)
- `display_order` (integer)
- `active` (boolean, default true)
- `created_at` (timestamptz)

## 2. Security
- Enable RLS on all tables
- Public read access for courses, blog_posts (published), carousel_images
- Authenticated users can read their own profile
- Teachers and admins can create/edit blog posts
- Admins have full access to all tables
- Contact messages are write-only for public, read-only for admins

## 3. Notes
- Using UUID for all primary keys
- Timestamps for audit trail
- Role-based access control
*/

-- Create user role enum
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  full_name text,
  role user_role DEFAULT 'student'::user_role NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  workload text,
  curriculum text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  author_id uuid REFERENCES profiles(id),
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create carousel_images table
CREATE TABLE IF NOT EXISTS carousel_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text,
  display_order integer,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_images ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Helper function to check if user is teacher or admin
CREATE OR REPLACE FUNCTION is_teacher_or_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role IN ('teacher'::user_role, 'admin'::user_role)
  );
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL USING (is_admin(auth.uid()));

-- Courses policies (public read)
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage courses" ON courses
  FOR ALL USING (is_admin(auth.uid()));

-- Blog posts policies
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Teachers can view all posts" ON blog_posts
  FOR SELECT USING (is_teacher_or_admin(auth.uid()));

CREATE POLICY "Teachers can create posts" ON blog_posts
  FOR INSERT WITH CHECK (is_teacher_or_admin(auth.uid()));

CREATE POLICY "Authors can update own posts" ON blog_posts
  FOR UPDATE USING (author_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Admins can delete posts" ON blog_posts
  FOR DELETE USING (is_admin(auth.uid()));

-- Contact messages policies
CREATE POLICY "Anyone can create contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact messages" ON contact_messages
  FOR SELECT USING (is_admin(auth.uid()));

-- Carousel images policies
CREATE POLICY "Anyone can view active carousel images" ON carousel_images
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage carousel images" ON carousel_images
  FOR ALL USING (is_admin(auth.uid()));

-- Insert initial courses data
INSERT INTO courses (name, description, workload, curriculum) VALUES
('Desenvolvimento de Sistemas', 'Curso técnico focado em programação, desenvolvimento web e mobile, banco de dados e metodologias ágeis.', '1200 horas', 'Lógica de Programação, Banco de Dados, Desenvolvimento Web, Desenvolvimento Mobile, Engenharia de Software'),
('Informática', 'Curso técnico abrangente em tecnologia da informação, manutenção de computadores e redes.', '1000 horas', 'Hardware, Redes de Computadores, Sistemas Operacionais, Suporte Técnico, Segurança da Informação'),
('Logística', 'Curso técnico em gestão de cadeia de suprimentos, armazenagem e distribuição.', '800 horas', 'Gestão de Estoque, Transporte e Distribuição, Armazenagem, Logística Reversa, Supply Chain'),
('Fabricação Mecânica', 'Curso técnico em processos de fabricação, usinagem e controle de qualidade.', '1200 horas', 'Desenho Técnico, Processos de Usinagem, Metrologia, CNC, Controle de Qualidade'),
('Energias Renováveis', 'Curso técnico em sistemas de energia solar, eólica e sustentabilidade energética.', '1000 horas', 'Energia Solar Fotovoltaica, Energia Eólica, Eficiência Energética, Sustentabilidade, Instalações Elétricas'),
('Segurança do Trabalho', 'Curso técnico em prevenção de acidentes, normas regulamentadoras e saúde ocupacional.', '1200 horas', 'Legislação de Segurança, Prevenção de Acidentes, Ergonomia, Primeiros Socorros, Gestão de Riscos'),
('Propedêutica', 'Curso preparatório para o ensino superior com foco em ciências exatas e humanas.', '600 horas', 'Matemática, Física, Química, Português, Redação, História, Geografia'),
('Eletrônica', 'Curso técnico em circuitos eletrônicos, automação e sistemas embarcados.', '1200 horas', 'Circuitos Eletrônicos, Eletrônica Digital, Microcontroladores, Automação Industrial, Manutenção Eletrônica');

-- Create function to update blog_posts updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
