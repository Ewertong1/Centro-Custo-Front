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
  anexos: { file: File, descricao: string }[] = []; // Lista temporária de anexos
  descricaoDocumento: string = ''; // Para descrever os documentos

  constructor(private pessoaService: PessoaService, private router: Router) {}

  ngOnInit(): void {}

  adicionarPessoa(): void {
    console.log('CPF inserido:', this.novaPessoa.cpf);
    const cpfNumerico = this.novaPessoa.cpf.replace(/\D/g, '');
    console.log('CPF após formatação:', cpfNumerico);

    if (cpfNumerico.length !== 11) {
        alert('O CPF deve conter 11 dígitos.');
        return;
    }

    // Extrai apenas os arquivos dos anexos
    const arquivos = this.anexos.map(anexo => anexo.file);

    // Passa a pessoa e os arquivos para o backend
    this.pessoaService.adicionarPessoaComAnexos(this.novaPessoa, arquivos).subscribe({
        next: (pessoa) => {
            alert('Pessoa cadastrada com sucesso!');
            console.log('Pessoa adicionada com sucesso:', pessoa);
            // Limpa o formulário e os anexos após o cadastro com sucesso
            this.novaPessoa = { id: 0, nome: '', cpf: '', telefone: '', loginGov: '', senhaGov: '' };
            this.anexos = [];
        },
        error: (error) => {
            console.error('Erro ao adicionar pessoa:', error);
            const mensagemErro = error.error.message || 'Erro ao cadastrar pessoa. CPF duplicado.';
            alert(mensagemErro);
        },
        complete: () => {
            console.log('Operação de cadastro de pessoa concluída.');
        }
    });
}


  adicionarDocumento(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        alert('Apenas arquivos PDF são permitidos.');
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        alert('O arquivo excede o limite de 100MB.');
        return;
      }
      this.anexos.push({ file, descricao: this.descricaoDocumento });
      this.descricaoDocumento = ''; // Limpa a descrição após adicionar
      input.value = ''; // Limpa o input
    }
  }

  visualizarAnexo(index: number): void {
    const file = this.anexos[index].file;
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  }

  removerAnexo(index: number): void {
    this.anexos.splice(index, 1); // Remove o anexo da lista
  }

  irParaConsulta(): void {
    this.router.navigate(['/consulta-pessoas']);
  }
}
