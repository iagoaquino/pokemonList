import { Component, Input, SimpleChange } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import FavoriteEventInterface from '../interfaces/favorite-handler.interface';
import DataHandler from '../injectables/data-handler.injectable';
import CardContainerComponent from '../poke-card-component/card-container.component';

@Component({
  selector: 'pokemon-list-component',
  templateUrl: './pokemon-list.template.html',
  styleUrls: [
    './pokemon-list.style.scss',
    '../types-color.style.scss',
    '../globals.style.scss',
  ],
  imports: [IonicModule, CardContainerComponent, CommonModule],
})
export default class PokemonListComponent {
  constructor(private data_handler: DataHandler) {}

  @Input() filter_list: Array<string> = [];

  private initial_position: number = 0;
  private final_position: number = 12;
  private incrementer: number = 12;
  private pokemon_list = [] as Array<string>;
  private pokemon_data: Record<string, any> = {};
  private favorite_list: Array<string> = [];
  private favorite_pokemon_data: Record<string, any> = {};
  private show_only_favorite: boolean = false;

  get get_show_only_favorite() {
    return this.show_only_favorite;
  }

  get get_favorite_list() {
    return this.favorite_list;
  }

  get get_pokemon_data() {
    return this.pokemon_data;
  }

  get get_pokemon_list() {
    return this.pokemon_list;
  }

  get get_initial_position() {
    return this.initial_position;
  }

  get get_final_position() {
    return this.final_position;
  }

  get get_favorite_pokemon_data() {
    return this.favorite_pokemon_data;
  }

  async ngOnInit() {
    await this.data_handler.updateDateStored(this.filter_list);
    this.getPokemonList();
  }

  async ngOnChanges(change: SimpleChange) {
    await this.data_handler.updateDateStored(this.filter_list);
    this.getPokemonList();
  }

  async getPokemonList() {
    const data_requested = this.data_handler.getPokemonsData(
      this.initial_position,
      this.final_position
    );

    this.pokemon_list = data_requested['name_list'];
    this.pokemon_data = data_requested['pokemons_data'];
  }

  async favoritehandler(event: Event | FavoriteEventInterface) {
    const event_sended = event as FavoriteEventInterface;
    if (event_sended.type === 'insertion') {
      this.data_handler.addNewFavorite(event_sended.name);
      this.favorite_pokemon_data[event_sended.name] = event_sended.pokemon_data;
    } else {
      this.data_handler.deleteFavorite(event_sended.name);
    }
    this.favorite_list = this.data_handler.getFavoriteList();
  }

  SwapShowOnlyFavorite() {
    this.show_only_favorite = this.show_only_favorite ? false : true;
  }

  async navigationHandler(type: 'prev' | 'next') {
    this.initial_position =
      type === 'next'
        ? this.initial_position + this.incrementer
        : this.initial_position - this.incrementer;
    this.final_position =
      type === 'next'
        ? this.final_position + this.incrementer
        : this.final_position - this.incrementer;
    this.getPokemonList();
  }
}
