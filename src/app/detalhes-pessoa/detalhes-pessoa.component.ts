import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-detalhes-pessoa',
  templateUrl: './detalhes-pessoa.component.html',
  styleUrls: ['./detalhes-pessoa.component.scss']
})
export class DetalhesPessoaComponent implements OnInit {
  pessoaSelecionada: any;
  arquivos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    const idPessoa = this.route.snapshot.paramMap.get('id');
    if (idPessoa) {
      this.pessoaService.buscarPessoaPorId(+idPessoa).subscribe((pessoa) => {
        this.pessoaSelecionada = pessoa;
      });

      this.pessoaService.buscarArquivosPorPessoa(+idPessoa).subscribe((arquivos) => {
        this.arquivos = arquivos;
      });
    }
  }

  visualizarArquivo(arquivo: any): void {
    const byteArray = Uint8Array.from(atob(arquivo.arquivoBase64), (c) => c.charCodeAt(0));
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  baixarArquivo(arquivo: any): void {
    const byteArray = Uint8Array.from(atob(arquivo.arquivoBase64), (c) => c.charCodeAt(0));
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = arquivo.descricao;
    a.click();
  }

  voltar(): void {
    this.router.navigate(['/consulta-pessoas']);
  }
}
