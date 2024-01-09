import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./enregistrer.component.css']
})

export class EnregistrerComponent implements OnInit {

  inscriptionForm: FormGroup = new FormGroup({});
  error: string = '';
  success: string = '';
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private store: Store) {
    this.inscriptionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
      adresse: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
      codepostal: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
      ville: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
      sexe: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,20}$/)]],
      confirmPassword: ['', Validators.required]
    });
  }

  signup() {
    if (this.inscriptionForm.valid) {
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
          console.log('Données reçues : ', data);
          this.error = '';
          this.success = 'Inscription réussie, vous allez etre redirigé vers notre catalogue dans 3 secondes';
          this.store.dispatch(new AddClient(data));

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
  validateField(field: string) {
    const control = this.inscriptionForm.get(field);
    if (control) {
      control.markAsTouched();
    }
  }

  ngOnInit() {

  }

}
