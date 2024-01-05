export class Produit {
  nom: string;
  img: string;
  description: string;
  prix: number;
  categorie_id: number;


  constructor() {
    this.nom = '';
    this.img = '';
    this.description = '';
    this.prix = 0;
    this.categorie_id = 0;
  }
}
