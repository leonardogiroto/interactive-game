import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Content } from 'src/app/interfaces/content.interface';

@Component({
  selector: 'app-game-options',
  template: `
    <div class="option"
      *ngFor="let option of getOptions()"
      (click)="handleSelect.emit( option )" >
      {{ currentContent.options[option] }}
    </div>`,
  styleUrls: ['./game-options.component.scss']
})
export class GameOptionsComponent {

  @Input() readonly currentContent: Content;
  @Output() handleSelect = new EventEmitter();

  public getOptions(): Array<string> {
    if (this.currentContent.options) {
      return Object.keys(this.currentContent.options);
    }
    return [];
  }
}
