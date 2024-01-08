import { Component, OnInit, ElementRef, ViewChild, Output } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, startWith } from 'rxjs/operators';
import { CatalogueService } from '../../services/catalogue.service';
import { Produit } from '../../shared/models/produit';
import { AddProduit } from '../../shared/actions/produits-actions';
import { Store } from '@ngxs/store';
import { Categorie } from 'src/app/shared/models/categorie';
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
  @ViewChild('rechercheInput', { static: true }) rechercheInput!: ElementRef;
  @ViewChild('categorieInput', { static: true }) categorieInput!: ElementRef;
  @Output() searchEvent = new BehaviorSubject<{ term: string, category: string }>({ term: '', category: '' });

  constructor(private catalogueService: CatalogueService, private store: Store) {
    this.categories$ = this.catalogueService.getCategories();
    this.produits$ = this.catalogueService.getProduits();
  }
  ngOnInit(): void {
    this.produits$ = this.searchEvent.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(({ term, category }) => {
        if (term === '' && category === '') {
          return this.catalogueService.getProduits();
        }
        return this.catalogueService.getSearchProduits(term, category);
      }),
      catchError(() => of([] as Produit[])),
      startWith([] as Produit[])
    );

    this.searchEvent.next({ term: '', category: '' });
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

