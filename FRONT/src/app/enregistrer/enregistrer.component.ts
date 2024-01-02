import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-enregistrer',
  templateUrl: './enregistrer.component.html',
  styleUrls: ['./enregistrer.component.css']
})
export class EnregistrerComponent {
  formData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService) { }

  signup() {
    // Vérification si les mots de passe correspondent
    if (this.formData.password !== this.formData.confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }

    // Appel à la méthode d'inscription du service d'authentification avec les données fournies
    this.authService.signup(this.formData.email, this.formData.password)
      .subscribe(
        () => {
          console.log("Inscription réussie !");
          // Redirection ou action appropriée après l'inscription
        },
        error => {
          console.error("Erreur lors de l'inscription :", error);
        }
      );
  }

}
