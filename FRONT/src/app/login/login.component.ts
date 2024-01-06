import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ClientState } from '../shared/states/client-state';
import { CatalogueService } from '../services/catalogue.service';
import { Observable } from 'rxjs';
import { Produit } from '../shared/models/produit';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AddClient } from '../shared/actions/clients-actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string = '';
  login: string = '';
  password: string = '';
  @Select(ClientState.getFullName) client$?: Observable<string>;


  fullname: string = '';
  cnx: boolean = false;
  error: string = '';
  produit$: Observable<Produit[]>;
  constructor(private catalogueService: CatalogueService, private router: Router, private AuthService: AuthService, private store: Store) {
    this.produit$ = this.catalogueService.getProduits();
  }

  connexion() {
    console.log(this.name);
    console.log(this.login);

    this.AuthService.loginClient(this.login, this.password).subscribe(
      (data) => {
        this.cnx = true;
        this.store.dispatch(new AddClient(data));


        setTimeout(() => {
          this.router.navigate(['/produits']);
        }, 1000);
      },
      (error) => {
        console.log(error);
        this.error = 'Erreur de connexion utilisez login:emma et password:toto';

      }
    );
  }
  ngOnInit() { }
}
