import { Injectable } from '@angular/core';
import DataStorager from './data-storager.injectable';

@Injectable()
export default class ApiHandler {
  constructor(private data_storager: DataStorager) {}

  async getPokemonList(offset: number = 0) {
    const response = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`)
    ).json();
    this.data_storager.updateDataStorager(response['results']);
    return response;
  }

  public getDataStored() {
    return this.data_storager.getPokemonsCurrentData();
  }
}
