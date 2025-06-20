import { Component } from '@angular/core';
import FavoriteEventInterface from '../interfaces/favorite-handler.interface';
import ApiHandler from '../injectables/data-handler.injectable';

@Component({
  selector: 'pokemon-list-component',
  templateUrl: './pokemon-list.template.html',
  styleUrls: [
    './pokemon-list.style.scss',
    '../types-color.style.scss',
    '../globals.style.scss',
  ],
  standalone: false,
})
export default class PokemonListComponent {
  constructor(private api_handler: ApiHandler) {}

  public next_url!: string | null;
  public prev_url!: string | null;
  public pokemon_list = [] as Array<Record<string, any>>;
  public pokemon_data: Record<string, any> = {};
  public favorite_list: Array<string> = [];
  public favorite_pokemon_data: Record<string, any> = {};
  public show_only_favorite: boolean = false;

  async ngOnInit() {
    this.getPokemonList(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`);
  }

  async getPokemonList(url: string) {
    const data_requested = await this.api_handler.getPokemonData(url);
    this.pokemon_list = data_requested['results'];
    this.next_url = data_requested['next'];
    this.prev_url = data_requested['previous'];
    this.pokemon_data = this.api_handler.getDataStored();
    this.favorite_list = this.api_handler.getFavoriteList();
  }

  async favoritehandler(event: Event | FavoriteEventInterface) {
    const event_sended = event as FavoriteEventInterface;
    if (event_sended.type === 'insertion') {
      this.api_handler.addNewFavorite(event_sended.name);
      this.favorite_pokemon_data[event_sended.name] = event_sended.pokemon_data;
    } else {
      this.api_handler.deleteFavorite(event_sended.name);
    }
    this.favorite_list = this.api_handler.getFavoriteList();
  }

  SwapShowOnlyFavorite() {
    this.show_only_favorite = this.show_only_favorite ? false : true;
  }

  async navigationHandler(type: 'prev' | 'next') {
    if (type === 'next') {
      this.getPokemonList(this.next_url as string);
    } else {
      this.getPokemonList(this.prev_url as string);
    }
  }
}
