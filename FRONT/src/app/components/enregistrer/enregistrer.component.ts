import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngxs/store';
import { AddClient } from '../../shared/actions/clients-actions';
import { Router } from '@angular/router';
import {
  FormGroup, FormBuilder, Validators
} from '@angular/forms';
import { Client } from '../../shared/models/client';

@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.component.html',
})


export class EnregistrerComponent implements OnInit {
  message = ['']
  inscriptionForm: FormGroup = new FormGroup({});
  error: string = '';
  success: string = '';
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private store: Store) {
    this.inscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      codepostal: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      sexe: ['', Validators.required],
      telephone: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    });
  }

  signup() {
    this.error = '';
    if (this.inscriptionForm.value.password !== this.inscriptionForm.value.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
    } else if (this.inscriptionForm.valid) {
      const client: Client = new Client();
      client.nom = this.inscriptionForm.value.nom;
      client.prenom = this.inscriptionForm.value.prenom;
      client.adresse = this.inscriptionForm.value.adresse;
      client.codepostal = this.inscriptionForm.value.codepostal;
      client.ville = this.inscriptionForm.value.ville;
      client.email = this.inscriptionForm.value.email;
      client.sexe = this.inscriptionForm.value.sexe;
      client.login = this.inscriptionForm.value.login;
      client.password = this.inscriptionForm.value.password;
      client.telephone = this.inscriptionForm.value.telephone;

      this.authService.signup(client).subscribe(
        (data) => {
          console.log('Inscription reussie : ', data);
          this.error = '';
          this.store.dispatch(new AddClient(data));
          this.success = 'Inscription réussie, vous allez etre redirigé vers notre catalogue dans 3 secondes';

          setTimeout(() => {
            this.router.navigate(['/produits']);
          }, 1000);
        },
        (error) => {
          console.log('Erreur reçue : ', error.error);
          this.error = error.error;
        }
      );
    } else {
      this.error = 'Veuillez remplir correctement tous les champs du formulaire';
    }
  }

  ngOnInit() {

  }

}
