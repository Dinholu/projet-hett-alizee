import { Injectable } from '@angular/core';
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
  private client: Client = new Client();

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

  public signup(client: Client): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.backend + '/utilisateur/signup', client, httpOptions);
  }
  public loginClient(login: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<Client>(environment.backend + '/utilisateur/login', data, httpOptions);
  }

  public logout() {
    this.isLoggedIn = false;
    this.jwtToken = '';
  }

  public setClient(client: Client): void {
    this.client = client;
  }
  public getClient(): Client {
    return this.client;
  }

  public getFullName(): string {
    return this.client.prenom + ' ' + this.client.nom;
  }
}
