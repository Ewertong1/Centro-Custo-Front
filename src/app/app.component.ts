import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cadastro-pessoas';
  showMenu = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          setTimeout(() => this.checkRoute(), 0);
      }
  });// Verifica a rota inicial ao carregar

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute();
      }
    });
  }

  private checkRoute() {
    setTimeout(() => {
       this.showMenu = this.router.url !== '/login';
    }, 0); 
 }
 
}

