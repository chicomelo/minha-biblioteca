import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { LivroService } from '../../services/livro.service';
import { StatusLeituraPipe } from '../../pipes/status-leitura.pipe';
import { Livro } from '../../models/livro';

@Component({
  selector: 'app-lista-livros',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    StatusLeituraPipe,
  ],
  templateUrl: './lista-livros.component.html',
  styleUrl: './lista-livros.component.css',
})
export class ListaLivrosComponent {
  private livroService = inject(LivroService);

  public livros$: Observable<Livro[]> = this.livroService.getAll();

  public excluir(id: number): void {
    const confirmar = window.confirm('Deseja realmente excluir este livro?');

    if (!confirmar) {
      return;
    }

    this.livroService.delete(id).subscribe({
      next: () => {
        this.livros$ = this.livroService.getAll();
      },
    });
  }
}
