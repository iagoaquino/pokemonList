import { Component } from '@angular/core';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import FavoriteEventInterface from '../interfaces/favorite-handler.interface';

import cardContainerModule from '../poke-card-component/card-container.module';
import ApiHandler from '../injectables/data-handler.injectable';
import FavoriteStorager from '../injectables/favorite-storager.injectable';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  imports: [
    IonCol,
    IonGrid,
    IonRow,
    cardContainerModule,
    CommonModule,
    IonContent,
    IonButton,
  ],
  styleUrls: ['home.page.scss'],
  providers: [ApiHandler, FavoriteStorager],
})
export default class HomePage {
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
