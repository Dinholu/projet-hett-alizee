import { Produit } from './produit';

export class Panier {
  produit: Produit;
  quantite: number;

  constructor(produit: Produit, quantite: number = 1) {
    this.produit = produit;
    this.quantite = quantite;
  }
}
