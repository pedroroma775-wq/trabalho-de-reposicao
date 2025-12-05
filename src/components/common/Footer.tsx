import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre a Escola</h3>
            <p className="text-sm opacity-90">
              A Escola Estadual Presidente Dutra é uma instituição de ensino técnico comprometida com a excelência educacional e a formação de profissionais qualificados para o mercado de trabalho.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informações Institucionais</h3>
            <div className="text-sm space-y-2 opacity-90">
              <p>CNPJ: 000.000/0001-0C</p>
              <p>SRE - METROPOLITANA - A</p>
              <p>CEP: 00000-000</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="text-sm space-y-2 opacity-90">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>Rua XXXX Nº XXXX<br />Belo Horizonte - Minas Gerais - Brasil</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-90">
          <p>Desenvolvido pelo Desenvolvimento de Sistemas @ Todos os direitos reservados a EEPD</p>
          <p className="mt-2">{currentYear} EEPD-BH</p>
        </div>
      </div>
    </footer>
  );
}
