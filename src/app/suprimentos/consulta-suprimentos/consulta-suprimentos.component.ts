import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuprimentosService } from 'src/app/services/suprimentos.service';

@Component({
  selector: 'app-consulta-suprimentos',
  templateUrl: '././consulta-suprimentos.component.html',
  styleUrls: ['././consulta-suprimentos.component.scss']
})
export class ConsultaSuprimentosComponent implements OnInit {
  filtroForm!: FormGroup;
  suprimentos: any[] = [];
  agentes: any[] = [];
  centrosCusto: any[] = [];
  displayedColumns: string[] = [
    'nomeSuprimento', 'nomeAgente', 'qtd', 'precoUnitario',
    'descricaoPlanoNivel1', 'descricaoPlanoNivel2', 
    'descricaoPlanoNivel3', 'descricaoPlanoNivel4'
  ];
  
  constructor(private fb: FormBuilder, private suprimentosService: SuprimentosService) {}

  ngOnInit() {
    this.filtroForm = this.fb.group({
      nome: [''],
      idAgente: [''],
      idCentroCusto: ['']
    });

    this.carregarDados();
  }

  carregarDados() {
    this.suprimentosService.listarAgentes().subscribe(data => this.agentes = data);
    this.suprimentosService.listarCentrosCusto().subscribe(data => this.centrosCusto = data);
  }

  consultarSuprimentos() {
    const filtros = this.filtroForm.value;
    this.suprimentosService.consultarSuprimentos(filtros).subscribe(
      data => {
        this.suprimentos = data;
      },
      error => {
        console.error('Erro ao consultar suprimentos:', error);
      }
    );
  }

  limparFiltros() {
    this.filtroForm.reset();
    this.suprimentos = [];
  }
}
