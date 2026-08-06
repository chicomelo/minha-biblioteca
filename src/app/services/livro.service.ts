import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { API_BASE_URL } from '../app.config';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private httpClient = inject(HttpClient);
  private apiBaseUrl = inject(API_BASE_URL);

  public getAll(): Observable<Livro[]> {
    return this.httpClient
      .get<Livro[]>(`${this.apiBaseUrl}/livros`)
      .pipe(shareReplay(1));
  }

  public get(id: number): Observable<Livro> {
    return this.httpClient.get<Livro>(`${this.apiBaseUrl}/livros/${id}`);
  }

  public post(livro: Livro): Observable<Livro> {
    return this.httpClient.post<Livro>(`${this.apiBaseUrl}/livros`, livro);
  }

  public put(livro: Livro): Observable<Livro> {
    return this.httpClient.put<Livro>(
      `${this.apiBaseUrl}/livros/${livro._id}`,
      livro
    );
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiBaseUrl}/livros/${id}`);
  }
}
