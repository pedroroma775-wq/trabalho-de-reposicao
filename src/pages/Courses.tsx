import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, BookOpen } from 'lucide-react';
import { getAllCourses } from '@/db/api';
import type { Course } from '@/types/types';
import { useToast } from '@/hooks/use-toast';

const courseImages: Record<string, string> = {
  'Desenvolvimento de Sistemas': 'https://miaoda-site-img.s3cdn.medo.dev/images/067ce5cb-a82f-450f-9218-70a54897e807.jpg',
  'Informática': 'https://miaoda-site-img.s3cdn.medo.dev/images/8822747e-112f-4ec9-b195-8651b285094c.jpg',
  'Logística': 'https://miaoda-site-img.s3cdn.medo.dev/images/62229a9a-1d59-40f3-af56-7adef2db3e05.jpg',
  'Fabricação Mecânica': 'https://miaoda-site-img.s3cdn.medo.dev/images/f76890c3-3fe7-4b98-8089-724ea0bb4c35.jpg',
  'Energias Renováveis': 'https://miaoda-site-img.s3cdn.medo.dev/images/70c350de-1b5f-4d01-8102-a02da3165051.jpg',
  'Segurança do Trabalho': 'https://miaoda-site-img.s3cdn.medo.dev/images/07d01765-1815-4a8a-aec6-52107703427a.jpg',
  'Propedêutica': 'https://miaoda-site-img.s3cdn.medo.dev/images/5a30e128-cf3c-499f-bdd2-112e6063a5af.jpg',
  'Eletrônica': 'https://miaoda-site-img.s3cdn.medo.dev/images/191955fd-997c-4895-9274-b43c3f6ba540.jpg',
};

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar cursos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Nossos Cursos</h1>
          </div>
        </section>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {[...Array(8)].map((_, i) => (
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
          <h1 className="text-4xl font-bold text-center mb-4">Nossos Cursos</h1>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Oferecemos cursos técnicos de qualidade, preparando profissionais para o mercado de trabalho
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={courseImages[course.name] || 'https://miaoda-site-img.s3cdn.medo.dev/images/5a30e128-cf3c-499f-bdd2-112e6063a5af.jpg'}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">
                    Curso Técnico
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{course.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  {course.description}
                </p>
                
                {course.workload && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Carga Horária:</span>
                    <span>{course.workload}</span>
                  </div>
                )}
                
                {course.curriculum && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-medium">Grade Curricular:</span>
                    </div>
                    <div className="pl-6">
                      <ul className="space-y-1 text-sm text-foreground">
                        {course.curriculum.split(',').map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
