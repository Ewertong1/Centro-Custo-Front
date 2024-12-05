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
    this.listarUsuarios();
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
    const nomeFiltroLower = this.nome ? this.nome.toLowerCase() : '';
    const cpfFiltroLower = this.cpf ? this.cpf.toLowerCase() : '';
  
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const nomeLower = usuario.nome.toLowerCase();
      const cpfLower = usuario.cpf.toLowerCase();
  
      return (
        (!nomeFiltroLower || nomeLower.includes(nomeFiltroLower)) &&
        (!cpfFiltroLower || cpfLower.includes(cpfFiltroLower))
      );
    });
  
    this.nome = '';  // Limpa o filtro de nome após a consulta
    this.cpf = '';   // Limpa o filtro de CPF após a consulta
  }
  
}
