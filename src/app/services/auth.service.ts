import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  login(login: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { login, senha });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); 
  }

  getPessoas(): Observable<any> {
    const token = localStorage.getItem('token'); // Pega o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Adiciona o token ao cabeçalho
    
    return this.http.get<any>('http://localhost:8080/api/pessoas', { headers });
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  
}
