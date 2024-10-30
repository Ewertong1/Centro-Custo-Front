import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPessoaComponent } from './components/cadastro-pessoa/cadastro-pessoa.component';
import { ConsultaPessoaComponent } from './components/consulta-pessoa/consulta-pessoa.component';

const routes: Routes = [
  { path: 'cadastro-pessoas', component: CadastroPessoaComponent },
  { path: 'consulta-pessoas', component: ConsultaPessoaComponent },
  { path: '', redirectTo: '/cadastro-pessoas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
