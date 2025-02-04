import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: '././menu.component.html',
  styleUrls: ['././menu.component.scss']
})
export class MenuComponent {
  isExpanded = true;
  
  // Definição correta com índice de string para evitar erro de tipagem
  submenus: { [key: string]: boolean } = {
    controleAcesso: false,
    centroCusto: false,
    suprimentos: false
  };

  constructor(private authService: AuthService) {}

  toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    if (this.isExpanded) {
      sidebar.classList.remove('collapsed');
    } else {
      sidebar.classList.add('collapsed');
    }
  }
  
  

  toggleSubMenu(menu: string) {
    this.submenus[menu] = !this.submenus[menu];
  }

  logout(): void {
    this.authService.logout();
  }
}
