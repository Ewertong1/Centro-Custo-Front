import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroSuprimentosComponent } from './cadastro-suprimentos/cadastro-suprimentos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [CadastroSuprimentosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule, // Adicionado
    MatInputModule,     // Adicionado
    MatSelectModule,    // Adicionado
    MatButtonModule ,    // Adicionado
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ]
})
export class SuprimentosModule { }

