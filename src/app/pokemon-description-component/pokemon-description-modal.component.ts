import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pokemon-description-modal',
  styleUrls: [
    './pokemon-description-modal.style.scss',
    '../types-color.style.scss',
    '../globals.style.scss',
  ],
  templateUrl: './pokemon-description-modal.template.html',
  standalone: false,
})
export default class PokemonDescriptionModal {
  @Input() is_open?: boolean | null;
  @Input() pokemon_info!: Record<string, any>;
  @Input() pokemon_name?: string | null;

  @Output() modalHandler = new EventEmitter<boolean>();

  setOpen(is_open: boolean) {
    this.modalHandler.emit(is_open);
  }
}
