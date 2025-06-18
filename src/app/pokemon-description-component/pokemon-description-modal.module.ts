import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import PokemonDescriptionModal from './pokemon-description-modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  exports: [PokemonDescriptionModal],
  declarations: [PokemonDescriptionModal],
})
export class PokemonDescriptionModalModule {}
