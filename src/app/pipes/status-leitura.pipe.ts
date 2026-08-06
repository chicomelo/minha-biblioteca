import { Pipe, PipeTransform } from '@angular/core';

import { StatusLeitura } from '../models/livro';

@Pipe({
  name: 'statusLeitura',
  standalone: true,
})
export class StatusLeituraPipe implements PipeTransform {
  public transform(status: StatusLeitura): string {
    switch (status) {
      case 'quero-ler':
        return 'Quero ler';
      case 'lendo':
        return 'Lendo';
      case 'concluido':
        return 'Concluído';
      default:
        return status;
    }
  }
}

