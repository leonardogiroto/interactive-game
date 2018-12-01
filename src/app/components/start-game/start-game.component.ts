import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-start-game',
  template: `
    <div class="start-game" >
      <h1>Awesome Game Title</h1>
      <h2>
        Turn up the volume.<br>
        Best experienced with headphones and fullscreen.
      </h2>
      <button
        (click)="startGame.emit()"
        [disabled]="!canStartGame" >
        Start
      </button>
    </div>`,
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent {

  @Input() readonly canStartGame: boolean = false;
  @Output() startGame = new EventEmitter();

}
