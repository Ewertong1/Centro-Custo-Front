import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importe para ngModel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroPessoaComponent } from './components/cadastro-pessoa/cadastro-pessoa.component';
import { ConsultaPessoaComponent } from './components/consulta-pessoa/consulta-pessoa.component';

@NgModule({
    declarations: [
        AppComponent,
        CadastroPessoaComponent,
        ConsultaPessoaComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule // Import FormsModule para ngModel
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
