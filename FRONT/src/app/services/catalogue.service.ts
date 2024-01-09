import { Injectable } from '@angular/core';
import { Produit } from '../shared/models/produit';
import { Client } from '../shared/models/client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Categorie } from '../shared/models/categorie';
import { Panier } from '../shared/models/panier';
import { Select } from '@ngxs/store';
import { ClientState } from '../shared/states/client-state';
import { PanierState } from '../shared/states/panier-state';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  constructor(private http: HttpClient) { }

  @Select(ClientState.getClient) client$?: Observable<Client>;
  @Select(PanierState.getProduitsPanier) produitsPanier$?: Observable<Panier[]>;

  public getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.backendCatalogue);
  }

  getSearchProduits(term: string, categorie: string): Observable<Produit[]> {
    let params = new HttpParams();
    params = params.set('term', term).set('category', categorie);

    const url = `${environment.backendCatalogue}/filtrer`;
    return this.http.get<Produit[]>(url, { params: params });
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(environment.backendCatalogue + '/categories');
  }

  payAll(client: Client, panier: Panier[]): Observable<any> {
    // let params = new HttpParams();
    console.log("payAll")
    console.log(client)
    console.log(panier)
    return this.http.post(environment.backendCatalogue + '/pay', { client: client, panier: panier });
    // params = params.set('client', JSON.stringify(client)).set('panier', JSON.stringify(panier));

    // const url = `${environment.backendCatalogue}/pay`;
    // return this.http.get<Client>(url, { params: params });
  }
}

