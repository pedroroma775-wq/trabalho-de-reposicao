import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Target, Eye, Heart, Award } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

const carouselImages = [
  {
    url: 'https://miaoda-site-img.s3cdn.medo.dev/images/e9c6b595-56f1-444b-bade-86b5e3654d20.jpg',
    title: 'Sala de Aula Moderna',
  },
  {
    url: 'https://miaoda-site-img.s3cdn.medo.dev/images/60c29a57-6024-4404-a35e-99ef8dafcbda.jpg',
    title: 'Laboratório de Informática',
  },
  {
    url: 'https://miaoda-site-img.s3cdn.medo.dev/images/8d696446-d13d-4e36-b0cd-d4f450f0df60.jpg',
    title: 'Oficina Mecânica',
  },
  {
    url: 'https://miaoda-site-img.s3cdn.medo.dev/images/0f464509-b322-4113-8546-e651da775a1d.jpg',
    title: 'Biblioteca',
  },
  {
    url: 'https://miaoda-site-img.s3cdn.medo.dev/images/929e9d1b-0d04-421c-b58b-c2f6d71ec20b.jpg',
    title: 'Pátio da Escola',
  },
  {
    url: 'https://miaoda-site-img.s3cdn.medo.dev/images/ad427174-90aa-4be4-8798-b1830db230a6.jpg',
    title: 'Laboratório de Eletrônica',
  },
  {
    url: 'https://miaoda-site-img.s3cdn.medo.dev/images/f6161f75-3407-4753-9184-deb6de62cea5.jpg',
    title: 'Sala de Tecnologia',
  },
  {
    url: 'https://miaoda-site-img.s3cdn.medo.dev/images/698a55f6-866a-4435-822b-e87960d1e5ab.jpg',
    title: 'Fachada da Escola',
  },
];

export default function Home() {
  const [shuffledImages, setShuffledImages] = useState(carouselImages);

  useEffect(() => {
    const shuffled = [...carouselImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl xl:text-5xl font-bold mb-4">
            Escola Estadual Presidente Dutra
          </h1>
          <p className="text-xl xl:text-2xl opacity-90">
            Excelência em Educação Técnica e Profissional
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {shuffledImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[300px] xl:h-[500px] rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                    <h3 className="text-primary-foreground text-2xl font-semibold">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">Nossa História</h2>
            <div className="prose max-w-none space-y-4 text-foreground">
              <p className="text-lg leading-relaxed">
                A Escola Estadual Presidente Dutra (EEPD-BH) é uma instituição de ensino técnico
                localizada em Belo Horizonte, Minas Gerais, que há décadas se dedica à formação
                de profissionais qualificados e cidadãos conscientes de seu papel na sociedade.
              </p>
              <p className="text-lg leading-relaxed">
                Fundada com o objetivo de democratizar o acesso à educação técnica de qualidade,
                a EEPD-BH tornou-se referência na região metropolitana, oferecendo cursos que
                atendem às demandas do mercado de trabalho e contribuem para o desenvolvimento
                econômico e social da comunidade.
              </p>
              <p className="text-lg leading-relaxed">
                Nossa escola conta com infraestrutura moderna, laboratórios equipados e um corpo
                docente altamente qualificado, comprometido com a excelência no ensino e na
                formação integral dos estudantes.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Missão, Visão e Valores
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Missão</h3>
                </div>
                <p className="text-foreground leading-relaxed">
                  Proporcionar educação técnica de excelência, formando profissionais competentes
                  e éticos, capazes de contribuir para o desenvolvimento sustentável da sociedade.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Visão</h3>
                </div>
                <p className="text-foreground leading-relaxed">
                  Ser reconhecida como instituição de referência em educação técnica e
                  profissional, promovendo inovação, qualidade e inclusão social.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Valores</h3>
                </div>
                <ul className="text-foreground leading-relaxed space-y-2">
                  <li>• Excelência educacional</li>
                  <li>• Ética e responsabilidade</li>
                  <li>• Inovação e criatividade</li>
                  <li>• Respeito e inclusão</li>
                  <li>• Compromisso social</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Card className="bg-accent">
          <CardContent className="p-8 text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">
              Importância para a Comunidade
            </h2>
            <p className="text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
              A EEPD-BH desempenha papel fundamental na transformação social da região,
              oferecendo oportunidades de qualificação profissional para jovens e adultos,
              contribuindo para a redução das desigualdades e o fortalecimento da economia local.
              Nossa escola é um espaço de aprendizado, crescimento e realização de sonhos.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
