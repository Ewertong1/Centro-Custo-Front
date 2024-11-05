import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {}

  listarPessoas(): Observable<Pessoa[]> {
    const token = this.authService.getToken(); // Recupera o token do AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Adiciona o token ao cabeçalho

    return this.http.get<Pessoa[]>(this.apiUrl, { headers });
  }

  adicionarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Pessoa>(this.apiUrl, pessoa, { headers });
  }

  consultarPessoas(nome?: string, cpf?: string): Observable<Pessoa[]> {
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome', nome);
    }
    if (cpf) {
      params = params.set('cpf', cpf);
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Pessoa[]>(this.apiUrl, { params, headers });
  }
}
