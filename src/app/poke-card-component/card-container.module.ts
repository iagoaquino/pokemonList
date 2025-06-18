import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import CardContainerComponent from './card-container.component';
import { PokemonDescriptionModalModule } from '../pokemon-description-component/pokemon-description-modal.module';

@NgModule({
  imports: [IonicModule, PokemonDescriptionModalModule],
  exports: [CardContainerComponent],
  declarations: [CardContainerComponent],
})
export default class cardContainerModule {}
