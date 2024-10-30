import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../services/pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.scss']
})
export class CadastroPessoaComponent implements OnInit {
  novaPessoa: Pessoa = { id: 0, nome: '', cpf: '', telefone: '', loginGov: '', senhaGov: '' };

  constructor(private pessoaService: PessoaService, private router: Router) {}

  ngOnInit(): void {}

  adicionarPessoa(): void {
    // Remove pontos e traço antes de validar e enviar
    const cpfNumerico = this.novaPessoa.cpf.replace(/\D/g, '');
  
    if (cpfNumerico.length !== 11) {
      alert('O CPF deve conter 11 dígitos.');
      return;
    }
  
    this.pessoaService.adicionarPessoa(this.novaPessoa).subscribe(
      (pessoa) => {
        alert('Pessoa cadastrada com sucesso!');
        console.log('Pessoa adicionada com sucesso:', pessoa);
        this.novaPessoa = { id: 0, nome: '', cpf: '', telefone: '', loginGov: '', senhaGov: '' };
      },
      (error) => {
        console.error('Erro ao adicionar pessoa:', error);
        const mensagemErro = error.error?.message || 'Erro ao cadastrar pessoa. Tente novamente.';
        alert(mensagemErro);
      }
    );
  }
  
  
  irParaConsulta(): void {
    this.router.navigate(['/consulta-pessoas']);
  }
}
