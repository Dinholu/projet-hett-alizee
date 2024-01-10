import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { Commande } from 'src/app/shared/models/commande';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
})
export class CommandeComponent implements OnInit {
  loading = true;
  commande$: Observable<Commande[]> = new Observable<Commande[]>(); // Initialisation

  constructor(private commandeService: CommandeService, private router: Router) { }

  ngOnInit(): void {
    this.commande$ = this.commandeService.getCommandes().pipe(
      finalize(() => {
        this.loading = false; // Mettez isLoading à false une fois les commandes chargées
      })
    );
  }

  goBack() {
    this.router.navigate(['/produits']);
  }
}
