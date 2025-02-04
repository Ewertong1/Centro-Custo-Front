import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgenteService } from 'src/app/services/agente.service';

@Component({
  selector: 'app-cadastro-agente-modal',
  templateUrl: './cadastro-agente-modal.component.html',
  styleUrls: ['./cadastro-agente-modal.component.scss']
})
export class CadastroAgenteModalComponent {
  cadastroAgenteForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CadastroAgenteModalComponent>,
    private fb: FormBuilder,
    private agenteService: AgenteService
  ) {
    this.cadastroAgenteForm = this.fb.group({
      nome: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      tipoPessoa: [1, Validators.required],
      endereco: [''],
      uf: [''],
      inscricaoEstadual: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.cadastroAgenteForm.invalid) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    this.agenteService.criarAgente(this.cadastroAgenteForm.value).subscribe({
      next: (response) => {
        alert("Agente cadastrado com sucesso!");
        this.dialogRef.close(response);
      },
      error: (err) => {
        alert("Erro ao cadastrar agente!");
        console.error(err);
      }
    });
    
  }
}
