import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


export interface Usuario {
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
  private apiUrl = 'http://localhost:8080/api/auth/register';
  constructor(private http: HttpClient) {}
  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
  consultarUsuarios(nome?: string, cpf?: string): Observable<Usuario[]> {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (cpf) params = params.set('cpf', cpf);
  
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`, { params });
  }
  

}
