export class Commande {

  id: number;
  date: string;
  produit: string;
  img: string;
  quantite: number;
  prix: number;

  constructor() {
    this.id = 0;
    this.date = '';
    this.produit = '';
    this.img = '';
    this.quantite = 0;
    this.prix = 0;
  }
}
