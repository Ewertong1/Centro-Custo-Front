import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario, UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent {

  usuario: Usuario = {
    nome: '',
    cpf: '',
    login: '',
    senha: '',
    status: 0
  };

  constructor(private usuarioService: UsuarioService,private router: Router) {}


  toggleStatus(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.usuario.status = isChecked ? 1 : 0;
  }

  irParaConsulta(): void {
    this.router.navigate(['/consulta-usuario']);
  }
 onSubmit(): void {
  this.usuarioService.registrarUsuario(this.usuario).subscribe({
    next: (response) => {
      alert (response);
      console.log('Usuário registrado com sucesso', response);
      // Adicione qualquer lógica adicional, como redirecionamento ou mensagem de sucesso
    },
    error: (error) => {
      console.error('Erro ao registrar usuário', error);
      alert('Usuário registrado com sucesso.');  //revisar esse metodo. está retornando a mensagem errada.
    },
    complete: () => {
      console.log('Processo de registro de usuário completo');
    }
  });
  
}}
