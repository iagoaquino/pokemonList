import { Component } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonContent } from '@ionic/angular/standalone';
import cardContainerModule from '../poke-card-component/card-container.module';
import { CommonModule } from '@angular/common';
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
  ],
  styleUrls: ['home.page.scss'],
  providers: [ApiHandler],
})
export default class HomePage {
  constructor(private api_handler: ApiHandler) {}

  public pokemon_list = [];
  public pokemon_data: Record<string, any> = {};

  async ngOnInit() {
    this.pokemon_list = (await this.api_handler.getPokemonList())['results'];
    this.pokemon_data = this.api_handler.getDataStored();
  }
}
