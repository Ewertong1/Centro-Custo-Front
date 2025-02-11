import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isExpanded!: boolean;
  isMobile!: boolean;

  submenus: { [key: string]: boolean } = {
    controleAcesso: false,
    centroCusto: false,
    suprimentos: false
  };

  constructor(private authService: AuthService) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    this.isExpanded = !this.isMobile; // No mobile, inicia fechado. No desktop, inicia aberto.
  }

  toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
  
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    if (this.isExpanded) {
      sidebar.classList.remove('collapsed');
    } else {
      sidebar.classList.add('collapsed');
    }
  }
  

  toggleSubMenu(menu: string): void {
    this.submenus[menu] = !this.submenus[menu];
  }

  logout(): void {
    this.authService.logout();
  }
}
