import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cadastro-pessoas';

  isLoginPage: boolean = false;

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoginPage = event.url === '/login';
          console.log("URL atual:", event.url);
         // console.log("isLoginPage:", this.isLoginPage);
          this.cdRef.detectChanges(); // Garante a atualização da UI
        }, 0);
      }
    });
    
  }
}
