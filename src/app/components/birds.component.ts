import { Component } from '@angular/core';

@Component({
  selector: 'app-birds',
  template: `
  <div class="birds">
    <div class="bird-container bird-container--one">
      <div class="bird bird--one"></div>
    </div>
    <div class="bird-container bird-container--two">
      <div class="bird bird--two"></div>
    </div>
    <div class="bird-container bird-container--three">
      <div class="bird bird--three"></div>
    </div>
    <div class="bird-container bird-container--four">
      <div class="bird bird--four"></div>
    </div>
  </div>`,
  styleUrls: ['./birds.component.scss']
})
export class BirdsComponent { }
