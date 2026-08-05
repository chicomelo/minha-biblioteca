import { Livro } from '../models/livro';

export const LIVROS_EXEMPLO: Livro[] = [
  {
    _id: 1,
    titulo: 'O Hobbit',
    autor: 'J. R. R. Tolkien',
    categoria: 'Fantasia',
    anoPublicacao: 1937,
    status: 'concluido',
    nota: 5,
    favorito: true,
    observacoes: 'Uma aventura clássica.',
  },
  {
    _id: 2,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    categoria: 'Romance',
    anoPublicacao: 1899,
    status: 'lendo',
    favorito: false,
  },
  {
    _id: 3,
    titulo: 'Clean Code',
    autor: 'Robert C. Martin',
    categoria: 'Tecnologia',
    anoPublicacao: 2008,
    status: 'quero-ler',
    favorito: false,
  },
];

