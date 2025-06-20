import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import CardContainerComponent from './card-container.component';
import { PokemonDescriptionModalModule } from '../pokemon-description-component/pokemon-description-modal.module';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [IonicModule, PokemonDescriptionModalModule, CommonModule],
  exports: [CardContainerComponent],
  declarations: [CardContainerComponent],
})
export default class cardContainerModule {}
