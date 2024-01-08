import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState } from '../../shared/states/panier-state';
import { ClientState } from '../../shared/states/client-state';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService],
})
export class HeaderComponent implements OnInit {
  fullname: string = '';
  currentRoute: string = '';
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  @Select(ClientState.getFullName) client$?: Observable<string>;
  @Select(PanierState.getNbProduitsPanier) nb$?: Observable<number>;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderTitle();
      }
    });
  }
  private updateHeaderTitle() {
    const currentRoute = this.router.url;

    switch (currentRoute) {
      case '/signup':
        this.currentRoute = 'Inscription';
        break;
      case '/login':
        this.currentRoute = 'Connexion';
        break;
      case '/produits':
        this.currentRoute = 'Catalogue';
        break;
      case '/panier':
        this.currentRoute = 'Panier';
        break;
      default:
        this.currentRoute = 'Accueil';
    }
  }


  logout() {
    this.authService.logout();
    // refresh page
    window.location.reload();
  }
}
