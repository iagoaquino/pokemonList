import { Component } from '@angular/core';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

import cardContainerModule from '../poke-card-component/card-container.module';
import ApiHandler from '../injectables/data-handler.injectable';
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
  providers: [ApiHandler],
})
export default class HomePage {
  constructor(private api_handler: ApiHandler) {}

  public next_url!: string | null;
  public prev_url!: string | null;
  public pokemon_list = [] as Array<Record<string, any>>;
  public pokemon_data: Record<string, any> = {};

  async ngOnInit() {
    this.getPokemonList(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`);
  }

  async getPokemonList(url: string) {
    const data_requested = await this.api_handler.getPokemonData(url);
    this.pokemon_list = data_requested['results'];
    this.next_url = data_requested['next'];
    this.prev_url = data_requested['previous'];
    this.pokemon_data = this.api_handler.getDataStored();
    console.log(data_requested);
    console.log(this.prev_url);
  }

  async navigationHandler(type: 'prev' | 'next') {
    if (type === 'next') {
      this.getPokemonList(this.next_url as string);
    } else {
      this.getPokemonList(this.prev_url as string);
    }
  }
}
