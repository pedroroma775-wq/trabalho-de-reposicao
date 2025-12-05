import Home from './pages/Home';
import Courses from './pages/Courses';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Início',
    path: '/',
    element: <Home />,
    visible: true,
  },
  {
    name: 'Cursos',
    path: '/cursos',
    element: <Courses />,
    visible: true,
  },
  {
    name: 'Notícias',
    path: '/blog',
    element: <Blog />,
    visible: true,
  },
  {
    name: 'Contato',
    path: '/contato',
    element: <Contact />,
    visible: true,
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false,
  },
  {
    name: 'Cadastro',
    path: '/cadastro',
    element: <Register />,
    visible: false,
  },
  {
    name: 'Professores',
    path: '/professores',
    element: <Teachers />,
    visible: false,
  },
  {
    name: 'Alunos',
    path: '/alunos',
    element: <Students />,
    visible: false,
  },
];

export default routes;
