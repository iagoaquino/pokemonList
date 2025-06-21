import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonTitle,
  IonHeader,
} from '@ionic/angular/standalone';
import PokemonListModule from '../pokemon-list-component/pokemon-list.module';
import cardContainerModule from '../poke-card-component/card-container.module';
import ApiHandler from '../injectables/data-handler.injectable';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  imports: [
    cardContainerModule,
    CommonModule,
    PokemonListModule,
    IonCol,
    IonGrid,
    IonRow,
    IonHeader,
    IonTitle,
  ],
  styleUrls: ['home.page.scss', '../globals.style.scss'],
  providers: [ApiHandler],
})
export default class HomePage {}
