import { Component, EventEmitter, Input, Output } from '@angular/core';
import FavoriteEventInterface from '../interfaces/favorite-handler.interface';
@Component({
  selector: 'card-container',
  templateUrl: './card-container.template.html',
  styleUrls: ['./card-container.styles.scss', '../types-color.style.scss'],
  standalone: false,
})
export default class CardContainerComponent {
  @Input() favorite_list!: Array<string>;
  @Input() img_url: string | undefined;
  @Input() name!: string;
  @Input() main_type: string | undefined;
  @Input() pokemon_info: Record<string, any> | undefined;
  @Input() is_open?: boolean | null = false;

  @Output() favoriteHandler = new EventEmitter<FavoriteEventInterface>();

  modalHandler(event: boolean | Event) {
    this.is_open = event as boolean;
  }

  insertFavorite(pokemon_name: string) {
    this.favoriteHandler.emit({
      name: pokemon_name,
      type: 'insertion',
      pokemon_data: this.pokemon_info as Record<string, any>,
    });
  }

  removeFavorite(pokemon_name: string) {
    this.favoriteHandler.emit({
      name: pokemon_name,
      type: 'remotion',
      pokemon_data: undefined,
    });
  }
}
