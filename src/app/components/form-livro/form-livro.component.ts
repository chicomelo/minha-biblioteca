import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Livro, StatusLeitura } from '../../models/livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-form-livro',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-livro.component.html',
  styleUrl: './form-livro.component.css',
})
export class FormLivroComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private livroService = inject(LivroService);

  public readonly id = this.route.snapshot.paramMap.get('id');
  public readonly editando = Boolean(this.id);
  public mensagemErro = '';

  public formLivro = this.formBuilder.group({
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    categoria: ['', Validators.required],
    anoPublicacao: [null as number | null, [Validators.required, Validators.min(1)]],
    status: ['quero-ler', Validators.required],
    nota: [null as number | null, [Validators.min(0), Validators.max(5)]],
    observacoes: [''],
    favorito: [false],
  });

  public ngOnInit(): void {
    if (!this.id) {
      return;
    }

    this.livroService.get(Number(this.id)).subscribe({
      next: (livro) => {
        this.formLivro.patchValue({
          titulo: livro.titulo,
          autor: livro.autor,
          categoria: livro.categoria,
          anoPublicacao: livro.anoPublicacao,
          status: livro.status,
          nota: livro.nota ?? null,
          observacoes: livro.observacoes ?? '',
          favorito: livro.favorito,
        });
      },
      error: () => {
        this.mensagemErro = 'Não foi possível carregar o livro.';
      },
    });
  }

  public salvar(): void {
    if (this.formLivro.invalid) {
      this.formLivro.markAllAsTouched();
      return;
    }

    const valores = this.formLivro.getRawValue();
    const livro: Livro = {
      _id: this.id ? Number(this.id) : 0,
      titulo: valores.titulo ?? '',
      autor: valores.autor ?? '',
      categoria: valores.categoria ?? '',
      anoPublicacao: Number(valores.anoPublicacao),
      status: valores.status as StatusLeitura,
      nota: valores.nota ?? undefined,
      observacoes: valores.observacoes ?? undefined,
      favorito: valores.favorito ?? false,
    };

    const requisicao = this.editando
      ? this.livroService.put(livro)
      : this.livroService.post(livro);

    requisicao.subscribe({
      next: () => this.router.navigate(['/livros']),
      error: () => {
        this.mensagemErro = 'Não foi possível salvar o livro.';
      },
    });
  }
}

