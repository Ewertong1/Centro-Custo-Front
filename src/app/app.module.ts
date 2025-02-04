import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importe para ngModel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ConsultaUsuarioComponent } from './components/consulta-usuario/consulta-usuario.component';
import { MenuComponent } from './components/menu/menu.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { CentroCustoComponent } from './centro-custo/cadastro-centro-custo/cadastro-centro-custo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskModule } from 'ngx-mask';
import { ConsultaCentroCustoComponent } from './centro-custo/consulta-centro-custo/consulta-centro-custo.component';
import { MatTableModule } from '@angular/material/table';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SuprimentosModule } from './suprimentos/suprimentos.module';
import { ConsultaSuprimentosComponent } from './suprimentos/consulta-suprimentos/consulta-suprimentos.component';
import { RelatoriosComponent } from './relatorios/relatorios/relatorios.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CadastroAgenteModalComponent } from './components/cadastro-agente-modal/cadastro-agente-modal.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
    declarations: [
        AppComponent,
        ConsultaUsuarioComponent,
        MenuComponent,
        LoginComponent,CentroCustoComponent,ConsultaCentroCustoComponent,ConsultaSuprimentosComponent ,RelatoriosComponent,CadastroAgenteModalComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        SuprimentosModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgxMaskModule.forRoot(),
        ReactiveFormsModule,
        CommonModule,
        MatDividerModule,
        MatCardModule,
        MatTableModule,
        MatDatepickerModule,  // 💡 Necessário para o Datepicker
        MatNativeDateModule,  // 💡 Necessário para funcionamento do Datepicker
        MatInputModule,       // 💡 Necessário para os inputs
        MatFormFieldModule,    // 💡 Necessário para os form-fields
    MatSelectModule,      // 💡 Necessário se estiver usando mat-select,

    MatGridListModule,
   
    MatDialogModule


    ],
    providers: [provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        provideAnimationsAsync()]
})
export class AppModule { }
