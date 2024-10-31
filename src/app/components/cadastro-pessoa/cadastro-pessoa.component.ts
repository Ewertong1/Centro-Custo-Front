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
    console.log('CPF inserido:', this.novaPessoa.cpf); // Verifica o valor capturado
    const cpfNumerico = this.novaPessoa.cpf.replace(/\D/g, '');
    console.log('CPF após formatação:', cpfNumerico);

    if (cpfNumerico.length !== 11) {
        alert('O CPF deve conter 11 dígitos.');
        return;
    }

  
    this.pessoaService.adicionarPessoa(this.novaPessoa).subscribe({
      next: (pessoa) => {
        alert('Pessoa cadastrada com sucesso!');
        console.log('Pessoa adicionada com sucesso:', pessoa);
        // Limpa o formulário após o cadastro com sucesso
        this.novaPessoa = { id: 0, nome: '', cpf: '', telefone: '', loginGov: '', senhaGov: '' };
      },
      error: (error) => {
        console.error('Erro ao adicionar pessoa:', error);
        const mensagemErro = error.error.message || 'Erro ao cadastrar pessoa. CPF duplicado.' ;
        alert(mensagemErro); // Exibe a mensagem de erro retornada pelo backend
      },
      complete: () => {
        console.log('Operação de cadastro de pessoa concluída.');
      }
    });
    
    
  }
  
  
  irParaConsulta(): void {
    this.router.navigate(['/consulta-pessoas']);
  }
}
