import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState } from '../../shared/states/panier-state';
import { ClientState } from '../../shared/states/client-state';
import { AuthService } from '../../services/auth.service';
import { refresh } from 'aos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService],
})
export class HeaderComponent {
  fullname: string = '';
  constructor(private authService: AuthService) { }
  @Select(ClientState.getFullName) client$?: Observable<string>;
  @Select(PanierState.getNbProduitsPanier) nb$?: Observable<number>;

  logout() {
    this.authService.logout();
    // refresh page
    window.location.reload();
  }
}
