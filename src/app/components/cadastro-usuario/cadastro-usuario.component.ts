import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ], 
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {

  cadastroUsuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.cadastroUsuarioForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      status: [false]
    });
  }

  irParaConsulta(): void {
    this.router.navigate(['/consulta-usuario']);
  }

  cadastrar(): void {
    this.onSubmit();
  }
  onSubmit(): void {
    if (this.cadastroUsuarioForm.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const usuario = {
      ...this.cadastroUsuarioForm.value,
      status: this.cadastroUsuarioForm.value.status ? 1 : 2
    };
    this.usuarioService.registrarUsuario(usuario).subscribe({
      next: (response) => {
        alert('Usuário registrado com sucesso!');
        console.log('Usuário registrado:', response);
        this.router.navigate(['/consulta-usuario']);
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro ao registrar usuário, tente novamente.');
      }
    });
  }
}
