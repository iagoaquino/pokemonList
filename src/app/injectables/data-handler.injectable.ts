import { Injectable } from '@angular/core';
import DataStorager from './data-storager.injectable';
import FavoriteStorager from './favorite-storager.injectable';

@Injectable()
export default class DataHandler {
  constructor(
    private data_storager: DataStorager,
    private favorite_list_handler: FavoriteStorager
  ) {}

  async updateDateStored(types_filter: Array<string>): Promise<void> {
    this.data_storager.updateData(types_filter);
  }

  public getPokemonsData(initial_position: number, final_position: number) {
    return this.data_storager.getPokemonList(initial_position, final_position);
  }
  
  public getFavoriteList() {
    return this.favorite_list_handler.get_list();
  }

  public deleteFavorite(pokemon_name: string) {
    this.favorite_list_handler.delete_one(pokemon_name);
  }

  public addNewFavorite(pokemon_name: string) {
    this.favorite_list_handler.insert_new(pokemon_name);
  }
}
