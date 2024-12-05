import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importe para ngModel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroPessoaComponent } from './components/cadastro-pessoa/cadastro-pessoa.component';
import { ConsultaPessoaComponent } from './components/consulta-pessoa/consulta-pessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ConsultaUsuarioComponent } from './components/consulta-usuario/consulta-usuario.component';
import { MenuComponent } from './components/menu/menu.component';
import { DetalhesPessoaComponent } from './detalhes-pessoa/detalhes-pessoa.component';


@NgModule({
    declarations: [
        AppComponent,
        CadastroPessoaComponent,
        ConsultaPessoaComponent,
        ConsultaUsuarioComponent,
        DetalhesPessoaComponent,
        MenuComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
