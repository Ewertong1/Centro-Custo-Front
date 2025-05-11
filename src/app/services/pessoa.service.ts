import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

export interface Pessoa {
  id: number ;
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

  private apiUrl = environment.apiUrl + '/pessoas';
  private baseUrl = 'https://santaizabel.net.br/api'; 

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

  adicionarPessoaComAnexos(pessoa: Pessoa, anexos: File[]): Observable<Pessoa> {
    const formData = new FormData();
    formData.append('pessoa', new Blob([JSON.stringify(pessoa)], { type: 'application/json' }));

    anexos.forEach((arquivo, index) => {
        formData.append(`anexos`, arquivo, arquivo.name);
    });

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Pessoa>(`${this.apiUrl}/com-anexos`, formData, { headers });
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
  getPessoaDetalhes(idPessoa: number): Observable<any> {
    return this.http.get<any>(`/api/pessoa/${idPessoa}/arquivos`);
  }

  buscarPessoaPorId(idPessoa: number): Observable<any> {
  
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get(`${this.baseUrl}/pessoas/${idPessoa}`, { headers });
    
  }
  
  buscarArquivosPorPessoa(idPessoa: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get(`${this.baseUrl}/repositorio/pessoa/${idPessoa}/arquivos`, { headers });
  }
  
}
