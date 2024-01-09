import { Component, OnInit, ElementRef, ViewChild, Output } from '@angular/core';
import { Observable, of, BehaviorSubject, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, startWith, endWith } from 'rxjs/operators';
import { CatalogueService } from '../../services/catalogue.service';
import { Produit } from '../../shared/models/produit';
import { AddProduit } from '../../shared/actions/produits-actions';
import { Store } from '@ngxs/store';
import { Categorie } from 'src/app/shared/models/categorie';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
  providers: [CatalogueService],
})

export class ProduitsComponent implements OnInit {
  produits$: Observable<Produit[]>;
  categories$: Observable<Categorie[]>;
  message = '';
  erreur = '';
  loading = true;
  visibleIndexes: number[] = [];
  @ViewChild('rechercheInput', { static: true }) rechercheInput!: ElementRef;
  @ViewChild('categorieInput', { static: true }) categorieInput!: ElementRef;
  @Output() searchEvent = new BehaviorSubject<{ term: string, category: string }>({ term: '', category: '' });

  constructor(private catalogueService: CatalogueService, private store: Store) {
    this.categories$ = this.catalogueService.getCategories();
    this.produits$ = this.searchEvent.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(({ term, category }) => {
        return this.getProduits(term, category);

      }),
      tap({
        next: () => {
          this.loading = false; // Mettre à jour loading une fois que le chargement est terminé
        },
        error: () => {
          this.loading = false; // Gérer le cas d'erreur également
        }
      }),
      startWith([] as Produit[])
    );
  }

  ngOnInit(): void {
    this.getProduits('', '');
  }

  getProduits(term: string, category: string): Observable<Produit[]> {
    this.loading = true;
    return this.catalogueService.getSearchProduits(term, category).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des produits', error);
        this.erreur = 'Il n\'y a pas de produits correspondant à votre recherche';
        this.loading = false;
        setTimeout(() => {
          this.erreur = '';
        }, 4000);
        return EMPTY;
      }),
      finalize(() => {
        this.loading = false;
        console.log('loading', this.loading);
      })
    );
  }


  onSearchInputChange(searchTerm: string): void {
    const category = this.categorieInput.nativeElement.value;
    this.searchEvent.next({ term: searchTerm, category: category });
  }

  onCategoryInputChange(category: string): void {
    const searchTerm = this.rechercheInput.nativeElement.value;
    this.searchEvent.next({ term: searchTerm, category: category });
  }

  addProduit(produit: Produit) {
    this.store.dispatch(new AddProduit(produit));
    this.message = produit.nom + ' ajouté au panier !';
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }
}
