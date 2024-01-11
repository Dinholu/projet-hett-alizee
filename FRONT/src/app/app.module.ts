import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Layout/header/header.component';
import { FooterComponent } from './components/Layout/footer/footer.component';
import { PanierComponent } from './components/panier/panier.component';
import { ProduitsComponent } from './components/produits/produits.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { FilterPipe } from './filter.pipe';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from './shared/states/panier-state';
import { ClientState } from './shared/states/client-state';
import { ApiHttpInterceptor } from './http-interceptor';
import { CatalogueService } from './services/catalogue.service';
import { LoginComponent } from './components/login/login.component';
import { AccueilComponent } from './components/Layout/accueil/accueil.component';
import { EnregistrerComponent } from './components/enregistrer/enregistrer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommandeComponent } from './components/commande/commande.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PanierComponent,
    ProduitsComponent,
    LoginComponent,
    AccueilComponent,
    EnregistrerComponent,
    CommandeComponent,

  ],
  imports: [
    NgxsModule.forRoot([PanierState, ClientState]),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
    CatalogueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
