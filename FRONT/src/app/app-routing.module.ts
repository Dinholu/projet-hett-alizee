import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { Produit } from './shared/models/produit';
import { EnregistrerComponent } from './enregistrer/enregistrer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProduitsComponent } from './produits/produits.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: EnregistrerComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'panier', component: PanierComponent, canActivate: [AuthGuard] },
  { path: 'produits', component: ProduitsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
