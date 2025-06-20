import { NgModule } from '@angular/core';
import PokemonListComponent from './pokemon-list.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import cardContainerModule from '../poke-card-component/card-container.module';

@NgModule({
  imports: [IonicModule, CommonModule, cardContainerModule],
  declarations: [PokemonListComponent],
  exports: [PokemonListComponent],
})
export default class PokemonListModule {}
