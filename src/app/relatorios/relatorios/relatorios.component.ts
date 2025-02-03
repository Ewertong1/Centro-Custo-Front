import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from 'src/app/services/relatorios.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['././relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  tiposRelatorio = ['Sintético', 'Analítico'];
  tipoSelecionado: string = 'Sintético';
  relatorioDados: any[] = [];
  displayedColumns: string[] = [];

  constructor(private relatoriosService: RelatoriosService) {}

  ngOnInit(): void {
    this.carregarRelatorio();
  }

  carregarRelatorio() {
    if (this.tipoSelecionado === 'Sintético') {
      this.relatoriosService.obterRelatorioSintetico().subscribe(data => {
        this.relatorioDados = data;
        this.displayedColumns = ['descricao', 'totalMovimentado'];
      });
    } else {
      this.relatoriosService.obterRelatorioAnalitico().subscribe(data => {
        this.relatorioDados = data;
        this.displayedColumns = ['descricaoNivel1', 'descricaoNivel2', 'descricaoNivel3', 'descricaoNivel4', 'totalMovimentado'];
      });
    }
  }

  gerarPDF() {
    const doc = new jsPDF();
    const colunas = this.displayedColumns.map(col => col.toUpperCase());

    const dadosTabela = this.relatorioDados.map(item => 
      this.displayedColumns.map(col => item[col])
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
