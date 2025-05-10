import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';


export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  login: string;
  senha: string;
  status: number;
}
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private apiUrl = 'https://santaizabel.net.br/api/auth/register';
  private apiCon = 'https://santaizabel.net.br/api';
  constructor(private http: HttpClient,private authService: AuthService) {}

  
  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
  consultarUsuarios(nome?: string, cpf?: string): Observable<Usuario[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (cpf) params = params.set('cpf', cpf);
  
    return this.http.get<Usuario[]>(`${this.apiCon}/usuario`, {headers, params });
  }
  excluirUsuario(id: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.apiCon}/usuario/${id}`, { headers });
}

  

}
