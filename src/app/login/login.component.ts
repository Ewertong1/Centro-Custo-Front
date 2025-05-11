import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  focusedField: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      remember: [false]
    });
  }

  ngOnInit(): void {
    // Recuperar usuário salvo, se existir
    const savedUser = localStorage.getItem('rememberedUser');
    if (savedUser) {
      this.loginForm.patchValue({
        login: savedUser,
        remember: true
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onFocus(field: string): void {
    this.focusedField = field;
  }

  onBlur(): void {
    this.focusedField = null;
  }

  isFieldFocused(field: string): boolean {
    return this.focusedField === field;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { login, senha, remember } = this.loginForm.value;

      // Salvar ou remover usuário do localStorage
      if (remember) {
        localStorage.setItem('rememberedUser', login);
      } else {
        localStorage.removeItem('rememberedUser');
      }

      this.authService.login(login, senha).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = 'Usuário ou senha inválidos';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}

