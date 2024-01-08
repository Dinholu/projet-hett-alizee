import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PanierState } from '../../shared/states/panier-state';
import { Observable } from 'rxjs';
import { Produit } from '../../shared/models/produit';
import { RemoveAllProduit, RemoveProduit } from '../../shared/actions/produits-actions';
import { Panier } from '../../shared/models/panier';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  constructor(private store: Store, private router: Router) { }
  @Select(PanierState.getProduitsPanier) produitsPanier$?: Observable<Panier[]>;
  @Select(PanierState.getTotalePanier) total$?: Observable<number>;
  delete(produit: Produit) {
    this.store.dispatch(new RemoveProduit(produit));
  }

  deleteAll() {
    this.store.dispatch(new RemoveAllProduit());
  }
  goBack() {
    this.router.navigate(['/produits']);
  }
  ngOnInit(): void { }
}
