import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { Panier } from '../models/panier';
import { AddProduit, RemoveAllProduit, RemoveProduit } from '../actions/produits-actions';
import { PanierStateModel } from './panier.state.model';
@State<PanierStateModel>({
  name: 'panier',
  defaults: {
    produitsPanier: []
  }
})
@Injectable()
export class PanierState {
  @Selector()
  static getProduitsPanier(state: PanierStateModel) {
    return state.produitsPanier;
  }
  @Selector()
  static getNbProduitsPanier(state: PanierStateModel) {
    return state.produitsPanier.length;
  }
  @Selector()
  static getTotalePanier(state: PanierStateModel) {
    return state.produitsPanier.reduce((acc, item) => acc + item.produit.prix * item.quantite, 0);
  }
  @Action(AddProduit)
  add({ getState, patchState }: StateContext<PanierStateModel>, { payload }: AddProduit) {
    const state = getState();
    const existingItemIndex = state.produitsPanier.findIndex(item => item.produit.nom === payload.nom);

    if (existingItemIndex !== -1) {
      const updatedProduitsPanier = [...state.produitsPanier];
      updatedProduitsPanier[existingItemIndex].quantite += 1;
      patchState({
        produitsPanier: updatedProduitsPanier,
      });
    } else {
      const newPanierItem = new Panier(payload);
      patchState({
        produitsPanier: [...state.produitsPanier, newPanierItem],
      });
    }
  }
  @Action(RemoveProduit)
  remove({ getState, patchState }: StateContext<PanierStateModel>, { payload }: RemoveProduit) {
    const state = getState();
    const updatedPanier = state.produitsPanier.map(item => {
      if (item.produit.nom === payload.nom) {
        item.quantite = Math.max(0, item.quantite - 1);
      }
      return item;
    }).filter(item => item.quantite > 0);

    patchState({
      produitsPanier: updatedPanier,
    });
  }
  @Action(RemoveAllProduit)
  removeAll({ patchState }: StateContext<PanierStateModel>) {
    patchState({
      produitsPanier: []
    });
  }
}
