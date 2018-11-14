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

  public handleInput(): void {
    this.currentContent.show_input = false;
    localStorage.setItem(
      this.currentContent.storage_tag,
      this._capitalize( this.inputValue )
    );
    this.currentContent = this._items[ this.currentContent.next_content ];
    this._goToNextSection( this.currentContent );
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
    new Howl({
      src: ['../../../assets/audio' + content.audio_path],
      volume: 0.5,
      onend: () => {
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
