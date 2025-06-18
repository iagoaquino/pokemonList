import { Injectable } from '@angular/core';
import DataStorager from './data-storager.injectable';

@Injectable()
export default class ApiHandler {
  constructor(private data_storager: DataStorager) {}

  async getPokemonData(url: string | null) {
    const response = await (await fetch(url as string)).json();
    await this.data_storager.updateDataStorager(response['results']);
    return response;
  }

  public getDataStored() {
    return this.data_storager.getPokemonsCurrentData();
  }
}
