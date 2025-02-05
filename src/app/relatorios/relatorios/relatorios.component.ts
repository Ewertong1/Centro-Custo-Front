import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from 'src/app/services/relatorios.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  tiposRelatorio = ['Sintético', 'Analítico'];
  tipoSelecionado: string = 'Sintético';
  relatorioDados: any[] = [];
  displayedColumns: string[] = [];
  displayedColumnTitles: { [key: string]: string } = {}; 

  constructor(private relatoriosService: RelatoriosService) {}

  ngOnInit(): void {
    this.carregarRelatorio();
  }

  carregarRelatorio() {
    if (this.tipoSelecionado === 'Sintético') {
      this.relatoriosService.obterRelatorioSintetico().subscribe(data => {
        this.relatorioDados = data;
        this.displayedColumns = ['descricao', 'totalMovimentado'];
        this.displayedColumnTitles = { descricao: 'Descrição', totalMovimentado: 'Total Apurado' };
      });
    } else {
      this.relatoriosService.obterRelatorioAnalitico().subscribe(data => {
        this.relatorioDados = data;
        this.displayedColumns = ['descricaoNivel1', 'descricaoNivel2', 'descricaoNivel3', 'descricaoNivel4', 'totalMovimentado'];
        this.displayedColumnTitles = {
          descricaoNivel1: 'Nível 1',
          descricaoNivel2: 'Nível 2',
          descricaoNivel3: 'Nível 3',
          descricaoNivel4: 'Nível 4',
          totalMovimentado: 'Total Apurado'
        };
      });
    }
  }

  gerarPDF() {
    const doc = new jsPDF();
    const colunas = this.displayedColumns.map(col => this.displayedColumnTitles[col]);

    const dadosTabela = this.relatorioDados.map(item => 
      this.displayedColumns.map(col => col === 'totalMovimentado' 
        ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item[col]) 
        : item[col])
    );

    doc.text('Relatório de Centro de Custo', 10, 10);
    autoTable(doc, {
      head: [colunas],
      body: dadosTabela,
      startY: 20
    });

    doc.save('RelatorioCentroCusto.pdf');
  }
}
