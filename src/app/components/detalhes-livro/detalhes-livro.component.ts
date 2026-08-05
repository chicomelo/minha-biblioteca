import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { LIVROS_EXEMPLO } from '../../data/livros-exemplo';
import { Livro } from '../../models/livro';

@Component({
  selector: 'app-detalhes-livro',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './detalhes-livro.component.html',
  styleUrl: './detalhes-livro.component.css',
})
export class DetalhesLivroComponent {
  private route = inject(ActivatedRoute);

  public livro: Livro | undefined = this.obterLivro();

  private obterLivro(): Livro | undefined {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return LIVROS_EXEMPLO.find((livro) => livro._id === id);
  }
}

