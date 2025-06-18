import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-container',
  templateUrl: './card-container.template.html',
  styleUrls: ['./card-container.styles.scss'],
  standalone: false,
})
export default class CardContainerComponent {
  @Input() img_url: string | undefined;
  @Input() name: string | undefined;
  @Input() main_type: string | undefined;
}
