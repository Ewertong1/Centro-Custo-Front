import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pessoa {
  id: number | null;
  nome: string;
  cpf: string;
  telefone: string;
  loginGov: string;
  senhaGov: string;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = '/api/pessoas';

  constructor(private http: HttpClient) {}

  listarPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  adicionarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa);
  }

  consultarPessoas(nome?: string, cpf?: string): Observable<Pessoa[]> {
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome', nome);
    }
    if (cpf) {
      params = params.set('cpf', cpf);
    }
    
    return this.http.get<Pessoa[]>(this.apiUrl, { params });
  }
}
