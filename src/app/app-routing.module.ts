import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPessoaComponent } from './components/cadastro-pessoa/cadastro-pessoa.component';
import { ConsultaPessoaComponent } from './components/consulta-pessoa/consulta-pessoa.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MenuComponent } from './components/menu/menu.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { ConsultaUsuarioComponent } from './components/consulta-usuario/consulta-usuario.component';
import { DetalhesPessoaComponent } from './detalhes-pessoa/detalhes-pessoa.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-pessoas', component: CadastroPessoaComponent, canActivate: [AuthGuard] },
  { path: 'consulta-pessoas', component: ConsultaPessoaComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent ,canActivate: [AuthGuard] },
  { path: 'consulta-usuario', component: ConsultaUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'detalhes-pessoa/:id', component: DetalhesPessoaComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
