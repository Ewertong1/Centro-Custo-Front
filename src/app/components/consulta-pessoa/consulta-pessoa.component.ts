import { Component, OnInit } from '@angular/core';
import { PessoaService, Pessoa } from '../../services/pessoa.service';
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
  exibirResultados: boolean = false;


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
    const nomeFiltroLower = this.filtroNome ? this.filtroNome.toLowerCase() : '';
    const cpfFiltroLower = this.filtroCpf ? this.filtroCpf.toLowerCase() : '';

    this.pessoasFiltradas = this.pessoas.filter(pessoa => {
        const nomeLower = pessoa.nome.toLowerCase();
        const cpfLower = pessoa.cpf.toLowerCase();

        return (
            (!nomeFiltroLower || nomeLower.includes(nomeFiltroLower)) &&
            (!cpfFiltroLower || cpfLower.includes(cpfFiltroLower))
        );
    });

    this.exibirResultados = true;
    this.filtroNome = '';
    this.filtroCpf = '';
}


  
  

  irParaConsulta(): void {
    this.router.navigate(['/cadastro-pessoas']);
  }
}
