import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth/login';

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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>(environment.apiUrl + '/pessoas', { headers });
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
