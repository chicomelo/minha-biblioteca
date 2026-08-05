import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { LIVROS_EXEMPLO } from '../../data/livros-exemplo';

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
export class FormLivroComponent {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  public readonly id = this.route.snapshot.paramMap.get('id');
  public readonly editando = Boolean(this.id);

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

  constructor() {
    if (this.id) {
      const livro = LIVROS_EXEMPLO.find((item) => item._id === Number(this.id));

      if (livro) {
        this.formLivro.patchValue(livro);
      }
    }
  }

  public salvar(): void {
    if (this.formLivro.invalid) {
      this.formLivro.markAllAsTouched();
      return;
    }

    window.alert('O formulário está preenchido. O salvamento será conectado ao banco depois.');
  }
}

