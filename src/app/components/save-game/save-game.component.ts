import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-save-game',
  template: `
    <div class="save-game"
      (mouseenter)="showUserinfo = true"
      (mouseleave)="showUserinfo = false"
    >
      <p *ngIf="showUserinfo" >
        Hello, {{ user.displayName }}!
      </p>
      <img class="save"
        [ngClass]="{ 'mg-top': !showUserinfo }"
        (click)="saveGame.emit()"
        src="./assets/img/floppy.svg"
      />
      <ng-container *ngIf="showUserinfo" >
        <p class="save-hint" >
          click here to save progress
        </p>
        <img class="arrow"
          src="./assets/img/arrow.svg"
        />
      </ng-container>
    </div>`,
  styleUrls: ['./save-game.component.scss']
})
export class SaveGameComponent {

  @Input() readonly user: firebase.User;
  @Input() showUserinfo: boolean = false;
  @Output() saveGame = new EventEmitter();

}
