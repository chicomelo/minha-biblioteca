import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { LivroService } from '../../services/livro.service';
import { StatusLeituraPipe } from '../../pipes/status-leitura.pipe';
import { Livro, StatusLeitura } from '../../models/livro';
import { LivroFavoritoDirective } from '../../directives/livro-favorito.directive';

@Component({
  selector: 'app-lista-livros',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    StatusLeituraPipe,
    LivroFavoritoDirective,
  ],
  templateUrl: './lista-livros.component.html',
  styleUrl: './lista-livros.component.css',
})
export class ListaLivrosComponent {
  private livroService = inject(LivroService);

  public livros$: Observable<Livro[]> = this.livroService.getAll();
  public busca = '';
  public statusSelecionado: StatusLeitura | 'todos' = 'todos';

  public livrosFiltrados(livros: Livro[]): Livro[] {
    const texto = this.busca.trim().toLowerCase();

    return livros.filter((livro) => {
      const correspondeAoTexto =
        !texto ||
        livro.titulo.toLowerCase().includes(texto) ||
        livro.autor.toLowerCase().includes(texto);

      const correspondeAoStatus =
        this.statusSelecionado === 'todos' ||
        livro.status === this.statusSelecionado;

      return correspondeAoTexto && correspondeAoStatus;
    });
  }

  public atualizarBusca(event: Event): void {
    this.busca = (event.target as HTMLInputElement).value;
  }

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

  public alternarFavorito(livro: Livro): void {
    const acao = livro.favorito ? 'remover dos favoritos' : 'adicionar aos favoritos';
    const confirmar = window.confirm(`Deseja ${acao} este livro?`);

    if (!confirmar) {
      return;
    }

    const livroAtualizado: Livro = {
      ...livro,
      favorito: !livro.favorito,
    };

    this.livroService.put(livroAtualizado).subscribe({
      next: () => {
        this.livros$ = this.livroService.getAll();
      },
    });
  }
}
