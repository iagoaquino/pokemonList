import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import ApiHandler from '../injectables/data-handler.injectable';
import PokemonListComponent from '../pokemon-list-component/pokemon-list.component';
import SearchComponent from '../search-component/search.component';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  imports: [CommonModule, PokemonListComponent, SearchComponent, IonicModule],
  styleUrls: ['home.page.scss', '../globals.style.scss'],
  providers: [ApiHandler],
  standalone: true,
})
export default class HomePage {
  private types_filter: Array<string> = [
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
  @Output() handle_update = new EventEmitter<boolean>();

  handleFilterChange(event: Event | Array<string>) {
    this.types_filter = event as Array<string>;
  }

  get get_types_filter(): Array<string> {
    return this.types_filter;
  }
}
