import { Client } from "../models/client";

export class AddClient {
  static readonly type = '[Client] Add';
  constructor(public payload: Client) { }
}
