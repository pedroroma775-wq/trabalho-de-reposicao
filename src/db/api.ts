import { supabase } from './supabase';
import type {
  Profile,
  Course,
  BlogPost,
  BlogPostWithAuthor,
  ContactMessage,
  CarouselImage,
  ContactFormData,
  RegisterFormData,
} from '@/types/types';

// Profiles
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Falha ao atualizar perfil');
  return data;
}

export async function getAllTeachers(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'teacher')
    .order('full_name', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getAllStudents(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student')
    .order('full_name', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

// Courses
export async function getAllCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getCourse(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Blog Posts
export async function getPublishedBlogPosts(limit = 20, offset = 0): Promise<BlogPostWithAuthor[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:profiles(*)
    `)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function getBlogPost(id: string): Promise<BlogPostWithAuthor | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:profiles(*)
    `)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createBlogPost(post: {
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  author_id: string;
  published?: boolean;
}): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || null,
      image_url: post.image_url || null,
      author_id: post.author_id,
      published: post.published || false,
    })
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Falha ao criar postagem');
  return data;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Falha ao atualizar postagem');
  return data;
}

// Contact Messages
export async function createContactMessage(message: ContactFormData): Promise<ContactMessage> {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      name: message.name,
      email: message.email,
      phone: message.phone || null,
      message: message.message,
    })
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Falha ao enviar mensagem');
  return data;
}

// Carousel Images
export async function getActiveCarouselImages(): Promise<CarouselImage[]> {
  const { data, error } = await supabase
    .from('carousel_images')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

// Authentication
export async function signUp(formData: RegisterFormData) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('Falha ao criar usuário');

  // Create profile
  const { error: profileError } = await supabase.from('profiles').insert({
    id: authData.user.id,
    email: formData.email,
    full_name: formData.full_name,
    phone: formData.phone || null,
    role: formData.role,
  });

  if (profileError) throw profileError;

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}
