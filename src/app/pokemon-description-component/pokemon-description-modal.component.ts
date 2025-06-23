import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DesirableDataInterface } from '../interfaces/desirable-data.interface';
@Component({
  selector: 'pokemon-description-modal',
  styleUrls: [
    './pokemon-description-modal.style.scss',
    '../types-color.style.scss',
    '../globals.style.scss',
  ],
  templateUrl: './pokemon-description-modal.template.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export default class PokemonDescriptionModal {
  @Input() is_open?: boolean | null;
  @Input() pokemon_info!: DesirableDataInterface;
  @Input() pokemon_name?: string | null;

  @Output() modalHandler = new EventEmitter<boolean>();

  private stat_relation: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defence: 'Defence',
    special_atack: 'Special Atack',
    special_defence: 'Special Defence',
    speed: 'Speed',
  };

  get get_stat_relation() {
    return this.stat_relation;
  }
  setOpen(is_open: boolean) {
    this.modalHandler.emit(is_open);
  }
}
