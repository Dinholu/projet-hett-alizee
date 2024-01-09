import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PanierState } from '../../shared/states/panier-state';
import { ClientState } from '../../shared/states/client-state';
import { Observable } from 'rxjs';
import { Produit } from '../../shared/models/produit';
import { RemoveAllProduit, RemoveProduit } from '../../shared/actions/produits-actions';
import { Panier } from '../../shared/models/panier';
import { Router } from '@angular/router';
import { CatalogueService } from '../../services/catalogue.service';
import { Client } from 'src/app/shared/models/client';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  constructor(private store: Store, private router: Router, private catalogueService: CatalogueService) { }

  message: string = '';

  @Select(PanierState.getProduitsPanier) produitsPanier$?: Observable<Panier[]>;
  @Select(PanierState.getTotalePanier) total$?: Observable<number>;
  @Select(ClientState.getClient) client$?: Observable<Client>;

  delete(produit: Produit) {
    this.store.dispatch(new RemoveProduit(produit));
  }

  deleteAll() {
    this.store.dispatch(new RemoveAllProduit());
  }
  goBack() {
    this.router.navigate(['/produits']);
  }

  payAll() {
    let client: Client = new Client();
    this.client$?.subscribe((data) => {
      client = data;
    });
    let panier: Panier[] = [];
    this.produitsPanier$?.subscribe((data) => {
      panier = data;
    });
    this.catalogueService.payAll(client, panier).subscribe(
      (data) => {
        this.deleteAll();
        this.message = 'Paiement effectué avec succès';
        console.log(data)
        setTimeout(() => {
          this.message = '';
          this.router.navigate(['/commande']);
        }, 3000);
      },
      (error) => {
        console.log(error);
        this.message = 'Erreur de paiement';
        setTimeout(() => {
          this.message = '';
        }, 1000);

      }
    );
  }
  ngOnInit(): void { }
}


