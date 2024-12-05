import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
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
