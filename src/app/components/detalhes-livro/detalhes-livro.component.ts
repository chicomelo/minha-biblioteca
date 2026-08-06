import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { LivroService } from '../../services/livro.service';
import { StatusLeituraPipe } from '../../pipes/status-leitura.pipe';

@Component({
  selector: 'app-detalhes-livro',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    StatusLeituraPipe,
  ],
  templateUrl: './detalhes-livro.component.html',
  styleUrl: './detalhes-livro.component.css',
})
export class DetalhesLivroComponent {
  private route = inject(ActivatedRoute);
  private livroService = inject(LivroService);

  private id = Number(this.route.snapshot.paramMap.get('id'));
  public livro$ = this.livroService.get(this.id);
}
