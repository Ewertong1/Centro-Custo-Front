import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuprimentosService } from 'src/app/services/suprimentos.service';

@Component({
  selector: 'app-cadastro-suprimentos',
  templateUrl: './cadastro-suprimentos.component.html',
  styleUrls: ['./cadastro-suprimentos.component.scss']
})
export class CadastroSuprimentosComponent implements OnInit {
  suprimentoForm!: FormGroup;
  unidadesMedida: any[] = [];
  agentes: any[] = [];
  tiposPagamento: any[] = [];
  centrosCusto: any[] = [];
  planosContaNivel1: any[] = [];
  planosContaNivel2: any[] = [];
  planosContaNivel3: any[] = [];
  planosContaNivel4: any[] = [];
  
  mostrarPlanoConta2 = false;
  mostrarPlanoConta3 = false;
  mostrarPlanoConta4 = false;

  constructor(private fb: FormBuilder, private suprimentosService: SuprimentosService) {}

  ngOnInit() {
    this.suprimentoForm = this.fb.group({
      nome: ['', Validators.required],
      tipoPagamento: ['', Validators.required],
      agente: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(1)]],
      precoUnitario: ['', Validators.required],
      centroCusto: ['', Validators.required],
      unidadeMedida: ['', Validators.required],
      planoContaNivel1: [''],
      planoContaNivel2: [''],
      planoContaNivel3: [''],
      planoContaNivel4: [''],
      dataInicio: ['', Validators.required],
      dataFim: ['']
    });
    

    this.carregarDados();
  }

  carregarDados() {
    this.suprimentosService.listarUnidades().subscribe(data => this.unidadesMedida = data);
    this.suprimentosService.listarAgentes().subscribe(data => this.agentes = data);
    this.suprimentosService.listarTiposPagamento().subscribe(data => {
      this.tiposPagamento = data; // Já vem formatado corretamente do backend
  });
  
    

    
    this.suprimentosService.listarCentrosCusto().subscribe(data => this.centrosCusto = data);
    this.suprimentosService.listarPlanosContaNivel1().subscribe(data => {
      this.planosContaNivel1 = data;
    });
  }

  carregarPlanoConta(nivel: number, codigoBase: string) {
    if (nivel === 2) {
      this.mostrarPlanoConta2 = true;
      this.suprimentosService.listarPlanosContaNivel2(codigoBase).subscribe(data => {
        this.planosContaNivel2 = data;
      });
    }

    if (nivel === 3) {
      this.mostrarPlanoConta3 = true;
      this.suprimentosService.listarPlanosContaNivel3(codigoBase).subscribe(data => {
        this.planosContaNivel3 = data;
      });
    }

    if (nivel === 4) {
      this.mostrarPlanoConta4 = true;
      this.suprimentosService.listarPlanosContaNivel4(codigoBase).subscribe(data => {
        this.planosContaNivel4 = data;
      });
    }
  }

  formatarPreco() {
    let valor = this.suprimentoForm.get('precoUnitario')?.value;
    valor = valor.replace(/\D/g, ''); // Remove tudo que não for número
    valor = (parseFloat(valor) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    this.suprimentoForm.patchValue({ precoUnitario: valor });
  }

  salvar() {
    if (this.suprimentoForm.valid) {
        let formValue = { ...this.suprimentoForm.value };

        // Criando o objeto do DTO com os nomes corretos
        const suprimentoDTO = {
          nome: formValue.nome,
          tipo: formValue.tipoPagamento,
          fornecedor: formValue.fornecedor || null,
          quantidade: formValue.quantidade,
          idagente: formValue.agente,
          precoUnitario: parseFloat(formValue.precoUnitario.toString().replace(',', '.')),
          idCentroCusto: formValue.centroCusto,
          unidadeMedidaId: formValue.unidadeMedida,
          dtInicio: formValue.dataInicio,
          dtFim: formValue.dataFim || null,
          centroCustoId: formValue.centroCusto,
          planoContaNivel1: formValue.planoContaNivel1 || null,
          planoContaNivel2: formValue.planoContaNivel2 || null,
          planoContaNivel3: formValue.planoContaNivel3 || null,
          planoContaNivel4: formValue.planoContaNivel4 || null,
          status: formValue.status || null
        };
        

        console.log('DTO Enviado:', suprimentoDTO);

        this.suprimentosService.salvar(suprimentoDTO).subscribe(response => {
            alert('Suprimento salvo com sucesso!');
            this.suprimentoForm.reset();
            
        }, error => {
            console.error('Erro ao salvar:', error);
        });
    } else {
        alert('Preencha todos os campos obrigatórios.');
    }
}

onPlanoContaChange(nivel: number, idPlanoConta: number) {
  // Atualiza o FormGroup com o ID do plano de contas selecionado
  this.suprimentoForm.patchValue({
    [`planoContaNivel${nivel}`]: idPlanoConta
  });

  // Obtém a lista de planos correspondente ao nível
  const planosNivelAtual = (this as any)[`planosContaNivel${nivel}`] as any[];

  if (!planosNivelAtual) {
    console.warn(`Lista de planos para nível ${nivel} não encontrada.`);
    return;
  }

  // Obtém o código do plano para carregar os próximos níveis
  const planoSelecionado = planosNivelAtual.find(p => p.idPlanoConta === idPlanoConta);

  if (planoSelecionado && nivel < 4) {
    this.carregarPlanoConta(nivel + 1, planoSelecionado.codigo);
  }
}


  irParaConsulta() {
    window.location.href = '/consulta-suprimentos';
  }
}
