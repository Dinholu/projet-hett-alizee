import { Injectable } from '@angular/core';
import { Produit } from '../shared/models/produit';
import { Client } from '../shared/models/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private isLoggedIn = false;
  private jwtToken = '';

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  public setJwtToken(token: string) {
    this.jwtToken = token;
    this.isLoggedIn = true;
  }

  public getJwtToken(): string {
    return this.jwtToken;
  }

  signup(email: string, password: string): Observable<any> {
    // Exemple d'une requête HTTP POST pour l'inscription
    return this.http.post<Client>(environment.backendLoginClient, { email, password });
  }
  public loginClient(login: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<Client>(environment.backendLoginClient, data, httpOptions);
  }

  public logout() {
    this.isLoggedIn = false;
    this.jwtToken = '';
  }
}
