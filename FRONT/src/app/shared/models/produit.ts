import { Categorie } from './categorie';

export class Produit {
  nom: string;
  img: string;
  description: string;
  prix: number;
  categorie: string;


  constructor() {
    this.nom = '';
    this.img = '';
    this.description = '';
    this.prix = 0;
    this.categorie = '';
  }
}
