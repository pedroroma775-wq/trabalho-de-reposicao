import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, User, Newspaper } from 'lucide-react';
import { getPublishedBlogPosts } from '@/db/api';
import type { BlogPostWithAuthor } from '@/types/types';
import { useToast } from '@/hooks/use-toast';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const data = await getPublishedBlogPosts(20, 0);
      setPosts(data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar notícias.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Notícias e Eventos</h1>
          </div>
        </section>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-lg bg-muted" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-muted" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2 bg-muted" />
                  <Skeleton className="h-4 w-5/6 bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Notícias e Eventos</h1>
          </div>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Fique por dentro das últimas novidades, eventos e comunicados da EEPD-BH
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <Card className="p-12 text-center">
            <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Nenhuma notícia publicada
            </h2>
            <p className="text-muted-foreground">
              Em breve teremos novidades para compartilhar com você.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                {post.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <CardHeader className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Notícia</Badge>
                  </div>
                  <CardTitle className="text-xl text-primary line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {post.excerpt && (
                    <p className="text-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author.full_name || 'Autor desconhecido'}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
