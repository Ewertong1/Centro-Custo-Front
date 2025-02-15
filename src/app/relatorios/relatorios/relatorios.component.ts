import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from 'src/app/services/relatorios.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SuprimentosService } from 'src/app/services/suprimentos.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  tiposRelatorio = ['Sintético', 'Analítico'];
  centrosCusto: any[] = [];
  tipoSelecionado: string | null = null;
  relatorioDados: any[] = [];
  centroCustoSelecionado: any;
  resultadoFinal: number = 0;
  displayedColumns: string[] = [];
  displayedColumnTitles: { [key: string]: string } = {}; 
  

  constructor(private relatoriosService: RelatoriosService, private suprimentosService: SuprimentosService) {}

  ngOnInit(): void {
    //this.carregarRelatorio();
    this.carregarDados();
  }
  
//preciso que adicione como o footer o valor total de movimentado junto com o total

carregarRelatorio() {
  if (!this.centroCustoSelecionado) {
    alert('Selecione um Centro de Custo antes de carregar o relatório.');
    return;
  }

  if (this.tipoSelecionado === 'Sintético') {
    this.relatoriosService.obterRelatorioSintetico(this.centroCustoSelecionado).subscribe(data => {
      this.relatorioDados = data;
     // this.calcularResultado();
      this.displayedColumns = ['descricao', 'totalMovimentado'];
      this.displayedColumnTitles = { descricao: 'Plano de Conta', totalMovimentado: 'Total Apurado' };
    });
  } else {
    this.relatoriosService.obterRelatorioAnalitico(this.centroCustoSelecionado).subscribe(data => {
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


calcularResultado() {
  let receita = 0;
  let custos = 0;
  let despesas = 0;

  this.relatorioDados.forEach(item => {
    if (item.descricao.includes('RECEITA')) receita += item.totalMovimentado;
    if (item.descricao.includes('CUSTOS')) custos += item.totalMovimentado;
    if (item.descricao.includes('DESPESAS')) despesas += item.totalMovimentado;
  });

  this.resultadoFinal = receita - custos - despesas;
}

  carregarDados() {
    this.suprimentosService.listarCentrosCusto().subscribe(data => this.centrosCusto = data);
  }
  
  getTotalMovimentado(): number {
    if (!this.relatorioDados || this.relatorioDados.length === 0) {
      return 0;
    }
    return this.relatorioDados.reduce((acc, item) => acc + (item.totalMovimentado || 0), 0);
  }
  
  
  gerarPDF() {
    const doc = new jsPDF();

    // Adicionando o logo
    const logoPath = '../../../assets/img/LOGOA2PNG.png';
    const img = new Image();
    img.src = logoPath;

    img.onload = () => {
        // Criando o fundo azul estendido
        doc.setFillColor(0, 153, 255); // Cor azul semelhante ao Excel
        doc.rect(10, 10, 190, 30, 'F'); // Retângulo azul para o cabeçalho

        // Inserindo o logo maior, alinhado à esquerda
        const logoWidth = 35;
        const logoHeight = 28;
        doc.addImage(img, 'PNG', 12, 11, logoWidth, logoHeight); // Logo maior (largura: 35, altura: 28)

        // Adicionando o título centralizado no espaço restante ao lado do logo
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);

        const title = 'RELATÓRIO GERENCIAL';
        const textWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;

        // Calcula a posição para centralizar no espaço restante ao lado do logo
        const availableWidth = 190 - logoWidth - 10; // Largura total - largura da logo - espaçamento
        const textX = 12 + logoWidth + (availableWidth - textWidth) / 2;

        doc.text(title, textX, 28);

        // Informações do Centro de Custo - estendendo a largura para acompanhar o cabeçalho
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        const centro = this.centrosCusto.find(c => c.idctocusto === this.centroCustoSelecionado);

        const formatarData = (data: string) => {
            return new Date(data).toLocaleDateString('pt-BR');
        };

        // Ajustando as informações para alinhar com a largura total
        const leftMargin = 10;
        doc.text(`Centro de Custo: ${centro?.nome || ''}`, leftMargin, 50);
        doc.text(`Período: ${formatarData(centro?.dataInicio)} a ${formatarData(centro?.dataPrevistaEntrega)}`, leftMargin, 60);
        doc.text(`Eng. Responsável: ${centro?.responsavel}`, leftMargin, 70);

        // Adicionando o campo "Tipo de Relatório" com margem abaixo
        doc.text(`Tipo de Relatório: ${this.tipoSelecionado}`, leftMargin, 80);

        // Adicionando espaço entre o tipo de relatório e a tabela
        let tabelaInicioY = 90;

        // Criando cabeçalho da tabela com largura total
        const colunas = this.displayedColumns.map(col => this.displayedColumnTitles[col]);
        const dadosTabela = this.relatorioDados.map(item =>
            this.displayedColumns.map(col =>
                col === 'totalMovimentado'
                    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item[col])
                    : item[col]
            )
        );

        autoTable(doc, {
            startY: tabelaInicioY,
            margin: { left: 10, right: 10 }, // Ajustando para ocupar a largura total
            tableWidth: 'auto',
            head: [colunas],
            body: dadosTabela,
            styles: { fontSize: 10, cellPadding: 4 },
            didParseCell: function (data) {
                const rawData = data.row.raw as string[];
                // Destacar linha de resultado
                if (rawData[0] === 'RESULTADO') {
                    data.cell.styles.fontStyle = 'bold';
                    data.cell.styles.fillColor = [144, 238, 144]; // Verde claro para destaque
                }
                // Destacar cabeçalho com cor azul
                if (data.section === 'head') {
                    data.cell.styles.fillColor = [0, 153, 255]; // Azul
                    data.cell.styles.textColor = [255, 255, 255]; // Texto branco
                }
            }
        });

        // Salvando o PDF
        doc.save('RelatorioCentroCusto.pdf');
    };
}







  
  
}
