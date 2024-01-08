import { Injectable } from '@angular/core';
import { Produit } from '../shared/models/produit';
import { Client } from '../shared/models/client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Categorie } from '../shared/models/categorie';
@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  constructor(private http: HttpClient) { }


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

}
