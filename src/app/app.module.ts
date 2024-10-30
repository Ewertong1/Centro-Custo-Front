import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importe aqui

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroPessoaComponent } from './components/cadastro-pessoa/cadastro-pessoa.component';
import { ConsultaPessoaComponent } from './components/consulta-pessoa/consulta-pessoa.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({ declarations: [
        AppComponent,
        CadastroPessoaComponent,
        ConsultaPessoaComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule, // Adicione aqui
        NgxMaskModule.forRoot()], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
