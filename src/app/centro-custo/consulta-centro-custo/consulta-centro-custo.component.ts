import { Component, OnInit } from '@angular/core';
import { CentroCustoService } from 'src/app/services/centro-custo.service';

@Component({
  selector: 'app-consulta-centro-custo',
  templateUrl: './consulta-centro-custo.component.html',
  styleUrls: ['././consulta-centro-custo.component.scss']
})
export class ConsultaCentroCustoComponent implements OnInit {
  listaCentrosCusto: any[] = [];
  centrosCusto: any[] = [];
  displayedColumns: string[] = ['nome', 'localizacao', 'status'];

  filtros = {
    nome: '',
    localizacao: '',
    status: '',
    codigo:''
  };
  mostrarTabela = false;

  constructor(private centroCustoService: CentroCustoService) {}

  ngOnInit() {
    this.carregarNomesCentrosCusto();
  }

  carregarNomesCentrosCusto() {
    this.centroCustoService.listarTodos().subscribe(
      (response) => {
        this.listaCentrosCusto = response;
      },
      (error) => {
        console.error('Erro ao carregar os nomes dos centros de custo:', error);
      }
    );
  }

  buscar() {
    this.centroCustoService.filtrarCentroCusto(this.filtros).subscribe(
      (response) => {
        this.centrosCusto = response;
        this.mostrarTabela = this.centrosCusto.length > 0; // Só exibe a tabela se houver itens
      },
      (error) => {
        console.error('Erro ao buscar centros de custo:', error);
      }
    );
  }
}
