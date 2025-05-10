import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://santaizabel.net.br/api/auth/login';

  constructor(private http: HttpClient , private router: Router) {}

  login(login: string, senha: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { login, senha });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); 
  }

  getPessoas(): Observable<any> {
    const token = localStorage.getItem('token'); // Pega o token do localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Adiciona o token ao cabeçalho
    
    return this.http.get<any>('https://santaizabel.net.br/api/pessoas', { headers });
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    // Suponha que o token tenha um payload com as informações do usuário
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.status === 1; // 1 para admin
    }
    return false;
  }
  
  
}
