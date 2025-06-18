import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'card-container',
  templateUrl: './card-container.template.html',
  styleUrls: ['./card-container.styles.scss', '../types-color.style.scss'],
  standalone: false,
})
export default class CardContainerComponent {
  @Input() img_url: string | undefined;
  @Input() name: string | undefined;
  @Input() main_type: string | undefined;
  @Input() pokemon_info: Record<string, any> | undefined;
  @Input() is_open?: boolean | null = false;

  modalHandler(event: boolean | Event) {
    this.is_open = event as boolean;
  }
}
