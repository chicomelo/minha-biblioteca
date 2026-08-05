export type StatusLeitura = 'quero-ler' | 'lendo' | 'concluido';

export interface Livro {
  _id: number;
  titulo: string;
  autor: string;
  categoria: string;
  anoPublicacao: number;
  status: StatusLeitura;
  nota?: number;
  favorito: boolean;
  observacoes?: string;
}

