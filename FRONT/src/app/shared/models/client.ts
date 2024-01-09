export class Client {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  codepostal: string;
  ville: string;
  email: string;
  sexe: string;
  login: string;
  password: string;
  telephone: string;

  constructor() {
    this.id = 0;
    this.nom = '';
    this.prenom = '';
    this.adresse = '';
    this.codepostal = '';
    this.ville = '';
    this.email = '';
    this.sexe = '';
    this.login = '';
    this.password = '';
    this.telephone = '';

  }
}
