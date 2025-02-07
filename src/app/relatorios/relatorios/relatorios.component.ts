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
  
  getTotalMovimentado(): number {
    if (!this.relatorioDados || this.relatorioDados.length === 0) {
      return 0;
    }
    return this.relatorioDados.reduce((acc, item) => acc + (item.totalMovimentado || 0), 0);
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
  
      // Calcula o total dos valores movimentados
      const totalMovimentado = this.relatorioDados.reduce((sum, item) => sum + (item.totalMovimentado || 0), 0);
  
      // Criando os dados da tabela
      const dadosTabela = this.relatorioDados.map(item =>
        this.displayedColumns.map(col =>
          col === 'totalMovimentado'
            ? { content: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item[col]), styles: { halign: 'right' } }
            : item[col]
        )
      );
  
      // Adiciona a linha de total no final da tabela
      dadosTabela.push([
        { content: 'Total', styles: { fontStyle: 'bold' } }, 
        ...Array(this.displayedColumns.length - 2).fill(''), // Preenche colunas intermediárias vazias
        { content: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMovimentado), styles: { halign: 'right', fontStyle: 'bold' } }
      ]);
  
      autoTable(doc, {
        head: [colunas.map(col => ({ content: col, styles: { halign: col === 'Total Apurado' ? 'right' : 'left' } }))],
        body: dadosTabela,
        startY: 40,
        styles: { cellPadding: 3, fontSize: 10 },
        columnStyles: { 
          [this.displayedColumns.indexOf('totalMovimentado')]: { halign: 'right' } // Alinha a última coluna (Total Apurado) à direita
        }
      });
  
      doc.save('RelatorioCentroCusto.pdf');
    };
  }
  
  
}
