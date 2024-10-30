import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../services/pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-pessoa',
  templateUrl: './consulta-pessoa.component.html',
  styleUrls: ['./consulta-pessoa.component.scss']
})
export class ConsultaPessoaComponent implements OnInit {
  filtroNome: string = '';
  filtroCpf: string = '';
  pessoas: Pessoa[] = [];
  pessoasFiltradas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService, private router: Router) {}

  ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas(): void {
    this.pessoaService.listarPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
      this.pessoasFiltradas = pessoas;
    });
  }

  consultar(): void {
    this.pessoasFiltradas = this.pessoas.filter(pessoa => {
      return (
        (!this.filtroNome || pessoa.nome.includes(this.filtroNome)) &&
        (!this.filtroCpf || pessoa.cpf.includes(this.filtroCpf))
      );
    });
  }
  irParaCadastro(): void {
    // Redireciona para a tela de cadastro
    this.router.navigate(['/cadastro-pessoas']);
  }
}
