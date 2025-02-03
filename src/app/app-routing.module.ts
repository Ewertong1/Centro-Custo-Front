import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MenuComponent } from './components/menu/menu.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { ConsultaUsuarioComponent } from './components/consulta-usuario/consulta-usuario.component';
import { CentroCustoComponent } from './centro-custo/cadastro-centro-custo/cadastro-centro-custo.component';
import { ConsultaCentroCustoComponent } from './centro-custo/consulta-centro-custo/consulta-centro-custo.component';
import { CadastroSuprimentosComponent } from './suprimentos/cadastro-suprimentos/cadastro-suprimentos.component';
import { ConsultaSuprimentosComponent } from './suprimentos/consulta-suprimentos/consulta-suprimentos.component';
import { RelatoriosComponent } from './relatorios/relatorios/relatorios.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent ,canActivate: [AuthGuard] },
  { path: 'consulta-usuario', component: ConsultaUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-centro-custo', component: CentroCustoComponent, canActivate: [AuthGuard]  }, 
  { path: 'consulta-centro-custo', component: ConsultaCentroCustoComponent, canActivate: [AuthGuard]  }, 
  { path: 'cadastro-suprimentos', component: CadastroSuprimentosComponent, canActivate: [AuthGuard]  }, 
  { path: 'consulta-suprimentos', component: ConsultaSuprimentosComponent, canActivate: [AuthGuard]  }, 
  { path: 'relatorios', component: RelatoriosComponent, canActivate: [AuthGuard]  }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
