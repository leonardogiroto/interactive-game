import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Content } from 'src/app/interfaces/content.interface';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-game-text',
  template: `
    <p [innerHtml]="getContentText()" ></p>`
})
export class GameTextComponent {

  @Input() readonly currentContent: Content;

  constructor(
    private _utilService: UtilService
  ) { }

  public getContentText(): string {
    if (!this.currentContent) { return ''; }

    if (this.currentContent.has_tags) {
      this.currentContent.text = this._utilService.replaceTag(
        this.currentContent.text
      );
    }

    return this.currentContent.text;
  }
}
