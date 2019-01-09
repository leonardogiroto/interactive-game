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
        {{ hasSave ? 'Continue' : 'Start' }}
      </button><br><br>
      <button
        *ngIf="hasSave"
        (click)="confirmReset()"
        [disabled]="!canStartGame" >
        Start Over
      </button>
    </div>`,
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent {

  @Input() readonly canStartGame: boolean = false;
  @Input() readonly hasSave: boolean = false;
  @Output() startGame = new EventEmitter();
  @Output() resetSave = new EventEmitter();

  public confirmReset(): void {
    const resolution = confirm('Are you sure you want to reset the save and start over?');
    if (resolution) {
      this.resetSave.emit();
    }
  }

}
