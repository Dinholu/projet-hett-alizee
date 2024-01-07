import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './components/panier/panier.component';
import { Produit } from './shared/models/produit';
import { EnregistrerComponent } from './components/enregistrer/enregistrer.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: EnregistrerComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'panier', component: PanierComponent, canActivate: [AuthGuard] },
  { path: 'produits', component: ProduitsComponent, canActivate: [AuthGuard] },
  { path: 'test', component: ProduitsComponent },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
