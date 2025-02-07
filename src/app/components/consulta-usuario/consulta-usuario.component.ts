import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.scss']
})
export class ConsultaUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cpf', 'login', 'status', 'acoes']; // Definição das colunas da tabela
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  dataSource = new MatTableDataSource<Usuario>(); // Angular Material Table
  nome: string = '';
  cpf: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
 
  }

  listarUsuarios(): void {
    this.usuarioService.consultarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.usuariosFiltrados = usuarios;
        this.dataSource.data = usuarios; // Atualiza a tabela do Angular Material
      },
      error: (error) => {
        console.error('Erro ao consultar usuários:', error);
      }
    });
  }

  onConsultar(): void {
    this.listarUsuarios();
    this.usuarioService.consultarUsuarios(this.nome, this.cpf).subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.usuariosFiltrados = usuarios;
        this.dataSource.data = usuarios;
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
          this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
          this.usuariosFiltrados = this.usuarios;
          this.dataSource.data = this.usuarios;
          alert('Usuário excluído com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao excluir usuário:', error);
          alert('Ocorreu um erro ao tentar excluir o usuário.');
        }
      });
    }
  }

  irParaConsulta(): void {
    this.router.navigate(['/cadastro-usuario']);
  }
}
