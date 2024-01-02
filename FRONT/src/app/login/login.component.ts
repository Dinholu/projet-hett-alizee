import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { Observable } from 'rxjs';
import { Produit } from '../shared/models/produit';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string = '';
  login: string = '';
  password: string = '';


  nom: string = '';
  prenom: string = '';
  cnx: boolean = false;
  error: string = '';
  produit$: Observable<Produit[]>;
  constructor(private catalogueService: CatalogueService, private router: Router, private AuthService: AuthService) {
    this.produit$ = this.catalogueService.getProduits();
  }

  connexion() {
    console.log(this.name);
    console.log(this.login);

    this.AuthService.loginClient(this.login, this.password).subscribe(
      (data) => {
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.cnx = true;

        setTimeout(() => {
          this.router.navigate(['/produits']);
        }, 2000);
      },
      (error) => {
        console.log(error);
        this.error = 'Erreur de connexion utilisez login:emma et password:toto';

      }
    );
  }
  ngOnInit() { }
}
