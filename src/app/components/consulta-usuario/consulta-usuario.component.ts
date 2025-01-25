import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.scss']
  
})
export class ConsultaUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  nome: string = '';
  cpf: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarios = [];
    this.usuariosFiltrados = [];
}

  listarUsuarios(): void {
    this.usuarioService.consultarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.usuariosFiltrados = usuarios; // Inicializa `usuariosFiltrados` com todos os usuários
      },
      error: (error) => {
        console.error('Erro ao consultar usuários:', error);
      }
    });
    
  }

  irParaConsulta(): void {
    this.router.navigate(['/cadastro-usuario']);
  }

  onConsultar(): void {
    this.usuarioService.consultarUsuarios(this.nome, this.cpf).subscribe({
        next: (usuarios) => {
            this.usuarios = usuarios;
            this.usuariosFiltrados = usuarios; // Atualiza os resultados na tabela
        },
        error: (error) => {
            console.error('Erro ao consultar usuários:', error);
        },
    });
}

excluirUsuario(usuario: Usuario): void {
  if (confirm(`Tem certeza que deseja excluir o usuário ${usuario.nome}?`)) {
      this.usuarioService.excluirUsuario(usuario.id).subscribe({
          next: () => {
              // Remove o usuário excluído da lista local
              this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
              alert('Usuário excluído com sucesso!');
          },
          error: (error) => {
              console.error('Erro ao excluir usuário:', error);
              alert('Ocorreu um erro ao tentar excluir o usuário.');
          }
      });
  }
}


  
}
