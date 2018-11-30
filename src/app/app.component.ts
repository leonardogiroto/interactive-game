import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { AngularFireDatabase } from 'angularfire2/database';
import { Content } from './interfaces/content.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  public windAudio: Howl;
  public canStartGame: boolean = false;
  public gameStarted: boolean = false;
  public currentContent: Content;
  public inputValue: string;
  public showBirds: boolean = false;
  public audioPlaying: boolean = false;
  public user: firebase.User;
  public notification: string;
  public showUserinfo: boolean = false;

  private _items: Array<Content>;

  constructor(
    private _db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this._loadIntroduction();
  }

  ngAfterViewInit() {
    this.windAudio = new Howl({
      src: ['../../../assets/audio/wind.wav'],
      loop: true,
      volume: 0.25
    });
    this.windAudio.play();
  }

  public startGame(): void {
    this.gameStarted = true;
    this.windAudio.pause();

    this.currentContent = this._items['start_01'];
    this._goToNextSection( this.currentContent );
    new Howl({
      src: ['../../../assets/audio/forest.mp3'],
      loop: true
    }).play();
    setTimeout(() => this.showBirds = true, 8000);
  }

  public getContentText(): string {
    if (!this.currentContent) { return ''; }

    if (this.currentContent.has_tags) {
      this.currentContent.text =
        this.currentContent.text.replace(
          /([\[(])(.+?)([\])])/g, this._replaceTag
        );
    }

    return this.currentContent.text;
  }

  public getOptions(): Array<string> {
    if (this.currentContent.options) {
      return Object.keys(this.currentContent.options);
    }
    return [];
  }

  public handleInput(): void {
    this.currentContent.show_input = false;
    localStorage.setItem(
      this.currentContent.storage_tag,
      this._capitalize( this.inputValue )
    );
    this.currentContent = this._items[ this.currentContent.next_content ];
    this._goToNextSection( this.currentContent );
  }

  public handleSelect(selection: string): void {
    this.currentContent.present_select = false;
    this.currentContent = this._items[ selection ];
    this._goToNextSection( this.currentContent );
  }

  public setUser(user: firebase.User): void {
    this.user = user;
    this.showUserinfo = true;

    setTimeout(() => {
      this.showUserinfo = false;
    }, 3000);
  }

  public saveGame(): void {

  }

  private async _loadIntroduction(): Promise<void> {
    try {
      const response = await this._db.list('/introduction').query.once('value');
      this._items = response.val();
      this.canStartGame = true;
    } catch (error) {
      console.error(error);
    }
  }

  private _goToNextSection(content: Content): void {
    this.audioPlaying = true;
    new Howl({
      src: ['../../../assets/audio' + content.audio_path],
      volume: 0.5,
      onend: () => {
        this.audioPlaying = false;
        this.showBirds = false;

        if (content.present_input) {
          content.show_input = true;
        } else if (content.next_content) {
          setTimeout(() => {
            this.currentContent = this._items[ content.next_content ];
            this._goToNextSection( this.currentContent );
          }, content.next_delay ? content.next_delay : 0);
        }
      }
    }).play();
  }

  private _replaceTag(match, bracket1, tag: string): string {
    return localStorage.getItem(tag);
  }

  private _capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
