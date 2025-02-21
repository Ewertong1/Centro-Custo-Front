import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CadastroAgenteModalComponent } from 'src/app/components/cadastro-agente-modal/cadastro-agente-modal.component';
import { SuprimentosService } from 'src/app/services/suprimentos.service';
import { ActivatedRoute } from '@angular/router';
import { CentroCustoService } from 'src/app/services/centro-custo.service';
import normalize from 'normalize-text';


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
  suprimentoId: number | null = null;
  
  mostrarPlanoConta2 = false;
  mostrarPlanoConta3 = false;
  mostrarPlanoConta4 = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private centroCustoService: CentroCustoService, private suprimentosService: SuprimentosService,private dialog: MatDialog) {}

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
      dataFim: [''],
      custoAdmin: [false]
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id_suprimento');
      if (id) {
        this.suprimentoId = +id;
        this.carregarSuprimento(this.suprimentoId);
      }
    });

    this.carregarDados();

    this.route.paramMap.subscribe(params => {
      const idCentroCusto = params.get('idCentroCusto');
      if (idCentroCusto) {
        this.preencherCentroCusto(idCentroCusto);
      }
    });
  }
  preencherCentroCusto(id: string) {
    this.centroCustoService.buscarPorId(Number(id)).subscribe(centro => {
      this.suprimentoForm.patchValue({
        centroCusto: centro.idctocusto // Preenche automaticamente
      });
    });
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

  abrirModalCadastroAgente(): void {
    const dialogRef = this.dialog.open(CadastroAgenteModalComponent, {
      width: '500px',
      disableClose: true
    });
  
    // Aguarda o fechamento do modal antes de recarregar a lista de agentes
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Apenas recarrega se o usuário realmente cadastrou um novo agente
        this.suprimentosService.listarAgentes().subscribe(data => {
          this.agentes = data;
        });
      }
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
          //precoUnitario: parseFloat(formValue.precoUnitario.toString().replace(',', '.')),
          precoUnitario: parseFloat(formValue.precoUnitario.toString().replace(/\./g, '').replace(',', '.')),

          idCentroCusto: formValue.centroCusto,
          unidadeMedidaId: formValue.unidadeMedida,
          dtInicio: formValue.dataInicio,
          dtFim: formValue.dataFim || null,
          centroCustoId: formValue.centroCusto,
          planoContaNivel1: formValue.planoContaNivel1 || null,
          planoContaNivel2: formValue.planoContaNivel2 || null,
          planoContaNivel3: formValue.planoContaNivel3 || null,
          planoContaNivel4: formValue.planoContaNivel4 || null,
          status: formValue.status || null,
          custoAdmin: formValue.custoAdmin ? 1 : 0
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

  carregarSuprimento(id: number) {
    // Primeiro, carregar os tipos de pagamento
   
    this.suprimentosService.listarTiposPagamento().subscribe(data => {
      this.tiposPagamento = data; // Agora já temos os tipos de pagamento carregados
      console.log('Valores disponíveis no dropdown:', this.tiposPagamento.map(tp => tp.descricao));
  
      // Depois que os tipos de pagamento foram carregados, buscar os dados do suprimento
      this.suprimentosService.buscarPorId(id).subscribe(suprimento => {
        console.log('Dados do suprimento recebido:', suprimento);
        console.log('Valor de tipoPagamento recebido:', suprimento.tipo);
  
        // Normalizar os valores removendo espaços e convertendo para minúsculas
        const tipoSuprimento = normalize(suprimento.tipo.trim().toLowerCase());
        const tipoFormatado = this.tiposPagamento.find(tp =>
          normalize(tp.descricao.trim().toLowerCase()) === tipoSuprimento
        )?.descricao;
  
        
  
        // Atualizar o formulário com os dados do suprimento
        this.suprimentoForm.patchValue({
          idSuprimento: suprimento.idSuprimento, 
          nome: suprimento.nome,
          quantidade: suprimento.quantidade,
          precoUnitario: suprimento.precoUnitario,
          tipoPagamento: tipoFormatado || suprimento.tipo, // Se não encontrar, usa o original
          agente: suprimento.idagente,
          centroCusto: suprimento.centroCusto.idctocusto,
          unidadeMedida: suprimento.idUnidadeMedida?.idUnidademedida,
          dataInicio: suprimento.dtinicio,
        });
        console.log('Tipo de Pagamento após ajuste:', this.suprimentoForm);
        console.log("Lista de Centros de Custo:", this.centrosCusto);

      });
    });
  }


  
}