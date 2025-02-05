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
    
    // Caminho da imagem no projeto
    const logoPath = '../../../assets/img/LOGOA2PNG.png';

    // Criando a imagem no topo
    const img = new Image();
    img.src = logoPath;

    img.onload = () => {
      doc.addImage(img, 'PNG', 10, 10, 40, 20); // (imagem, tipo, x, y, largura, altura)
      doc.setFontSize(16);
      doc.text('Relatório de Centro de Custo', 60, 20); // Adicionando título ao lado do logo

      // Criando a tabela
      const colunas = this.displayedColumns.map(col => this.displayedColumnTitles[col]);

      const dadosTabela = this.relatorioDados.map(item =>
        this.displayedColumns.map(col => col === 'totalMovimentado' 
          ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item[col]) 
          : item[col])
      );

      autoTable(doc, {
        head: [colunas],
        body: dadosTabela,
        startY: 40
      });

      doc.save('RelatorioCentroCusto.pdf');
    };
  }
}
