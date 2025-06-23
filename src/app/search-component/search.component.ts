import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'search-component',
  templateUrl: './search.template.html',
  imports: [IonicModule, CommonModule],
  styleUrls: [
    './search.style.scss',
    '../types-color.style.scss',
    '../globals.style.scss',
  ],
})
export default class SearchComponent {
  @Output() types_sender = new EventEmitter<Array<string>>();

  private possible_types: Array<string> = [
    'fire',
    'water',
    'grass',
    'bug',
    'poison',
    'flying',
    'steel',
    'normal',
    'fairy',
    'ground',
    'fighting',
    'psychic',
    'rock',
    'electric',
    'ghost',
    'dragon',
    'ice',
    'dark',
  ];
  private selected_types: Array<string> = Array.from(this.possible_types);

  get first_half_types() {
    return this.possible_types.slice(0, this.possible_types.length / 2);
  }

  get second_half_types() {
    return this.possible_types.slice(
      this.possible_types.length / 2,
      this.possible_types.length
    );
  }

  get get_selected_types() {
    return this.selected_types;
  }

  checkboxHandler(type: string) {
    if (this.selected_types.includes(type)) {
      this.selected_types = this.selected_types.filter(
        (selected_type) => selected_type !== type
      );
    } else {
      this.selected_types.push(type);
    }
  }
  sendTypes() {
    this.types_sender.emit(this.selected_types);
  }
}
