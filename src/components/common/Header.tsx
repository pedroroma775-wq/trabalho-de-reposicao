import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/db/supabase';
import { getCurrentUser, signOut } from '@/db/api';
import { useToast } from '@/hooks/use-toast';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    try {
      const user = await getCurrentUser();
      setIsLoggedIn(!!user);
    } catch {
      setIsLoggedIn(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      toast({
        title: 'Logout realizado',
        description: 'Você saiu da sua conta com sucesso.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao fazer logout.',
        variant: 'destructive',
      });
    }
  }

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/cursos', label: 'Cursos' },
    { path: '/blog', label: 'Notícias' },
    { path: '/contato', label: 'Contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold">EEPD-BH</span>
          </Link>

          <div className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-foreground text-primary'
                    : 'hover:bg-primary-light'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <>
                <Link to="/professores">
                  <Button variant="outline" size="sm" className="bg-primary-foreground text-primary hover:bg-accent">
                    <User className="h-4 w-4 mr-2" />
                    Professores
                  </Button>
                </Link>
                <Link to="/alunos">
                  <Button variant="outline" size="sm" className="bg-primary-foreground text-primary hover:bg-accent">
                    <User className="h-4 w-4 mr-2" />
                    Alunos
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="bg-primary-foreground text-primary hover:bg-accent">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="bg-primary-foreground text-primary hover:bg-accent">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 rounded-md hover:bg-primary-light transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="xl:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-foreground text-primary'
                    : 'hover:bg-primary-light'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link to="/professores" onClick={() => setIsMenuOpen(false)} className="block">
                  <Button variant="outline" size="sm" className="w-full bg-primary-foreground text-primary">
                    <User className="h-4 w-4 mr-2" />
                    Professores
                  </Button>
                </Link>
                <Link to="/alunos" onClick={() => setIsMenuOpen(false)} className="block">
                  <Button variant="outline" size="sm" className="w-full bg-primary-foreground text-primary">
                    <User className="h-4 w-4 mr-2" />
                    Alunos
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full bg-primary-foreground text-primary">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block">
                <Button variant="outline" size="sm" className="w-full bg-primary-foreground text-primary">
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
