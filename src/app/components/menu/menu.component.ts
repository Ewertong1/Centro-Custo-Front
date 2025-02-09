import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isExpanded = true;  // O menu começa expandido apenas no desktop
  isMobile = false;   // Flag para indicar se está no mobile
  
  submenus: { [key: string]: boolean } = {
    controleAcesso: false,
    centroCusto: false,
    suprimentos: false
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkScreenSize(); // Verifica o tamanho da tela ao iniciar
  }

  // Listener para detectar mudanças no tamanho da tela
  @HostListener('window:resize', [])
  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768; // Se for menor que 768px, é mobile
    if (this.isMobile) {
      this.isExpanded = false; // Mantém o menu fechado no mobile
    }
  }

  toggleSidenav(): void {
    if (!this.isMobile) { // No mobile, o menu nunca expande
      this.isExpanded = !this.isExpanded;
    }
  }

  toggleSubMenu(menu: string): void {
    // Permite abrir os submenus normalmente no mobile e desktop
    this.submenus[menu] = !this.submenus[menu];
  }

  logout(): void {
    this.authService.logout();
  }
}
