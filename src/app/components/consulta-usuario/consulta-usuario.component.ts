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
  nome: string = '';
  cpf: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}

  irParaConsulta(): void {
    this.router.navigate(['/cadastro-usuario']);
  }

  onConsultar(): void {
    this.usuarioService.consultarUsuarios(this.nome, this.cpf).subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Erro ao consultar usuários:', error);
      }
    );
  }
}
