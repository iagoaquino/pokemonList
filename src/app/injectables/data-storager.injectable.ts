import { Injectable } from '@angular/core';
import {
  DesirableDataInterface,
  StatusInterface,
  SpritesInterface,
  status_map_order,
  DataKeeperInterface,
  GetPokemonsDataInterface,
} from '../interfaces/desirable-data.interface';

@Injectable({ providedIn: 'root' })
export default class DataStorager {
  constructor() {}

  private data_keeper = {} as DataKeeperInterface;
  //Main functions

  public async updateData(types_filter: Array<string>) {
    const data = JSON.parse(
      localStorage.getItem('data_stored') || '{}'
    ) as DataKeeperInterface;
    if (data) {
      this.saveReusedData(data, types_filter);
    } else {
      this.saveNewData(types_filter);
    }
  }

  public getPokemonList(
    initial_position: number,
    final_position: number
  ): GetPokemonsDataInterface {
    const name_list = this.data_keeper.name_list.slice(
      initial_position,
      final_position
    );
    const pokemons_data = {} as Record<string, DesirableDataInterface>;
    for (let name of name_list) {
      pokemons_data[name] = this.data_keeper.data_stored[name];
    }
    return { name_list: name_list, pokemons_data: pokemons_data };
  }

  //SubFunctions
  private saveReusedData(
    data: DataKeeperInterface,
    types_filter: Array<string>
  ) {
    this.updateDataKeeper(data.name_list, data.data_stored, types_filter);
  }

  private async saveNewData(types_filter: Array<string>): Promise<void> {
    const pokemon_list = await (
      await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    ).json();
    const pokemons_data = {} as Record<string, DesirableDataInterface>;
    const name_list = [] as Array<string>;
    for (let info of pokemon_list['results']) {
      pokemons_data[info['name']] = await this.getPokemonData(info);
      name_list.push(info['name']);
    }
    this.updateDataKeeper(name_list, pokemons_data, types_filter);
    localStorage.setItem(
      'data_stored',
      JSON.stringify({
        data_stored: pokemons_data,
        name_list: pokemon_list,
        last_collected_date: new Date(),
      })
    );
  }

  private updateDataKeeper(
    name_list: Array<string>,
    pokemons_data: Record<string, DesirableDataInterface>,
    types_filter: Array<string>
  ): void {
    const pokemons_list_pos_filter = [] as Array<string>;
    const pokemons_data_pos_filter = {} as Record<
      string,
      DesirableDataInterface
    >;
    for (let name of name_list) {
      for (let type of pokemons_data[name].types) {
        if (types_filter.includes(type)) {
          pokemons_list_pos_filter.push(name);
          pokemons_data_pos_filter[name] = pokemons_data[name];
          break;
        }
      }
    }
    this.data_keeper = {
      data_stored: pokemons_data_pos_filter,
      name_list: pokemons_list_pos_filter,
      last_collected_date: new Date(),
    };
  }

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

  private async getPokemonData(info: Record<string, string>) {
    const data = await (await fetch(info['url'])).json();
    return this.getDesirableData(data);
  }
}
