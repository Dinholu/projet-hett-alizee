import { Injectable } from '@angular/core';
import { Client } from '../shared/models/client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Panier } from '../shared/models/panier';
import { Select } from '@ngxs/store';
import { ClientState } from '../shared/states/client-state';
import { PanierState } from '../shared/states/panier-state';
import { Commande } from '../shared/models/commande';

@Injectable({
  providedIn: 'root'
})

export class CommandeService {
  constructor(private http: HttpClient) { }

  @Select(ClientState.getClient) client$?: Observable<Client>;
  @Select(PanierState.getProduitsPanier) produitsPanier$?: Observable<Panier[]>;

  public postCommande(client: Client, panier: Panier[]): Observable<any> {
    return this.http.post(environment.backend + '/catalogue/pay', { client: client, panier: panier });
  }

  public getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(environment.backend + '/catalogue/commandes');
  }
}
