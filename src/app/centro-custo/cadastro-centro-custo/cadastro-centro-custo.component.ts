import { Component } from '@angular/core';
import { CentroCustoService } from 'src/app/services/centro-custo.service';
import { CentroCusto } from '../../models/centro-custo.model';



@Component({
  selector: 'app-centro-custo',
  templateUrl: '../cadastro-centro-custo/cadastro-centro-custo.component.html',
  styleUrls: ['../cadastro-centro-custo/cadastro-centro-custo.component.scss']
})
export class CentroCustoComponent {
  centroCusto: CentroCusto = {
    crea:'',
    dataEntrega:'',
    nome: '',
    localizacao: '',
    responsavel: '',
    creaResponsavel: '',
    valorTotal: 0,
    valorEmExecucao: 0,
    dataInicio: '',
    dataPrevistaEntrega: '',
    status: 'planejado',
    codigo : ''
  };
  
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private centroCustoService: CentroCustoService) {}

  salvar() {
    this.centroCustoService.salvarCentroCusto(this.centroCusto).subscribe({
      next: (response) => {
        console.log('Centro de Custo salvo com sucesso:', response);
        alert('Centro de Custo salvo com sucesso!');
        this.mensagemSucesso = 'Centro de Custo cadastrado com sucesso!';
        this.limparFormulario();
      },
      error: (err) => {
        console.error('Erro ao salvar centro de custo:', err);
        this.mensagemErro = 'Erro ao cadastrar Centro de Custo. Verifique os dados!';
      }
    });
  }

  limparFormulario() {
    this.centroCusto = {
      crea:'',
      dataEntrega:'',
      nome: '',
      localizacao: '',
      responsavel: '',
      creaResponsavel: '',
      valorTotal: 0,
      valorEmExecucao: 0,
      dataInicio: '',
      dataPrevistaEntrega: '',
      status: 'planejado',
      codigo : ''
    };
  }
}
export { CentroCusto };

