import { Injectable } from '@angular/core';
import {
  DesirableDataInterface,
  StatusInterface,
  SpritesInterface,
  status_map_order,
} from '../interfaces/desirable-data.interface';

@Injectable({ providedIn: 'root' })
export default class DataStorager {
  constructor() {}
  private DataStored: Record<string, any> = {};

  //Main functions

  public getPokemonsCurrentData() {
    return this.DataStored;
  }

  async updateDataStorager(pokemonsData: Array<Record<string, any>>) {
    for (let info of pokemonsData) {
      this.DataStored[info['name']] = await this.getPokemonData(info);
    }
    return this.DataStored;
  }

  //SubFunctions

  private getStatus(data: Array<Record<string, any>>): StatusInterface {
    const status = {} as StatusInterface;
    for (let index in data) {
      status[status_map_order[index]] = data[index]['base_stat'];
    }
    return status;
  }

  private getTypes(data: Array<Record<string, any>>): Array<string> {
    const types = [] as Array<string>;
    for (let type of data) {
      types.push(type['type']['name']);
    }
    return types;
  }

  private getSprites(data: Record<string, any>): SpritesInterface {
    const sprites = {} as SpritesInterface;
    sprites['back_default'] = data['back_default'];
    sprites['front_default'] = data['front_default'];
    return sprites;
  }

  private getDesirableData(data: Record<string, any>): DesirableDataInterface {
    const desirable_data = {} as DesirableDataInterface;
    desirable_data['sprites'] = this.getSprites(data['sprites']);
    desirable_data['types'] = this.getTypes(data['types']);
    desirable_data['stats'] = this.getStatus(data['stats']);
    return desirable_data;
  }

  async getPokemonData(info: Record<string, string>) {
    const data = await (await fetch(info['url'])).json();
    return this.getDesirableData(data);
  }
}
