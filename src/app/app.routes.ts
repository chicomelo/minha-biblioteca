import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListaLivrosComponent } from './components/lista-livros/lista-livros.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { DetalhesLivroComponent } from './components/detalhes-livro/detalhes-livro.component';
import { FormLivroComponent } from './components/form-livro/form-livro.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Minha Biblioteca',
    component: HomeComponent,
  },
  {
    path: 'livros',
    title: 'Meus livros',
    component: ListaLivrosComponent,
  },
  {
    path: 'livros/novo',
    title: 'Novo livro',
    component: FormLivroComponent,
  },
  {
    path: 'livros/:id/editar',
    title: 'Editar livro',
    component: FormLivroComponent,
  },
  {
    path: 'livros/:id',
    title: 'Detalhes do livro',
    component: DetalhesLivroComponent,
  },
  {
    path: 'sobre',
    title: 'Sobre',
    component: SobreComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
