import { Injectable } from '@angular/core';
import { Selector, Action, State, StateContext } from '@ngxs/store';
import { ClientStateModel } from './client.state.model';
import { Client } from '../models/client';
import { AddClient } from '../actions/clients-actions';

@State<ClientStateModel>({
  name: 'client',
  defaults: {
    Client: new Client()
  }
})
@Injectable()
export class ClientState {
  @Selector()
  static getClient(state: ClientStateModel) {
    return state.Client;
  }
  @Selector()
  static getFullName(state: ClientStateModel) {
    return state.Client.nom + ' ' + state.Client.prenom;
  }

  @Action(AddClient)
  add({ getState, patchState }: StateContext<ClientStateModel>, { payload }: AddClient) {
    const state = getState();
    patchState({
      Client: payload
    });
  }
}

