import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { LIVROS_EXEMPLO } from '../../data/livros-exemplo';

@Component({
  selector: 'app-lista-livros',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './lista-livros.component.html',
  styleUrl: './lista-livros.component.css',
})
export class ListaLivrosComponent {
  public livros = LIVROS_EXEMPLO;
}
