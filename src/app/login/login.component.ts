import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Certifique-se de que o AuthService está no caminho correto
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { login, senha } = this.loginForm.value;
      this.authService.login(login, senha).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
         // console.log('Token set:', localStorage.getItem('token')); 
          this.router.navigate(['/consulta-pessoas']);
        },
        error: (err) => {
          this.errorMessage = 'Credenciais incorretas ou erro de conexão.';
        }
      });
    }
  }
  
}
