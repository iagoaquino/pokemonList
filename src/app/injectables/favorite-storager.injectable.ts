import { Injectable } from '@angular/core';

@Injectable()
export default class FavoriteStorager {
  constructor() {}
  private favorite_list: Array<string> = [];

  public insert_new(pokemon_name: string) {
    if (!this.is_favorite(pokemon_name)) {
      this.favorite_list.push(pokemon_name);
    } else {
      throw new Error('Pokemon already is a favorite');
    }
  }

  public is_favorite(pokemon_name: string) {
    for (let element of this.favorite_list) {
      if (pokemon_name === element) {
        return true;
      }
    }
    return false;
  }
  public delete_one(pokemon_name: string) {
    if (this.is_favorite(pokemon_name)) {
      this.favorite_list = this.favorite_list.filter(
        (element) => element !== pokemon_name
      );
    } else {
      throw new Error("Pokemon wasn't a favorite");
    }
  }

  public get_list() {
    return this.favorite_list;
  }
}
