import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';

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
    path: 'sobre',
    title: 'Sobre',
    component: SobreComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
