import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { AngularFireDatabase } from 'angularfire2/database';
import { Content } from './interfaces/content.interface';
import { UtilService } from './services/util.service';

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
  private _currentChapter: string = 'introduction';
  private _currentKey: string = 'start_01';

  constructor(
    private _db: AngularFireDatabase,
    private _utilService: UtilService
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

    this.currentContent = this._items[ this._currentKey ];
    this._goToNextSection( this.currentContent );
    new Howl({
      src: ['../../../assets/audio/forest.mp3'],
      loop: true
    }).play();
    setTimeout(() => this.showBirds = true, 8000);
  }

  public handleInput(): void {
    this.currentContent.show_input = false;
    localStorage.setItem(
      this.currentContent.storage_tag,
      this._utilService.capitalize( this.inputValue )
    );
    this.currentContent = this._items[ this.currentContent.next_content ];
    this._goToNextSection( this.currentContent );
  }

  public handleSelect(selection: string): void {
    this.currentContent.present_select = false;
    this.currentContent = this._items[ selection ];
    this._currentKey = selection;
    this._goToNextSection( this.currentContent );
  }

  public setUser(user: firebase.User): void {
    this._loadSave( user.uid );
    this.user = user;
    this.showUserinfo = true;

    setTimeout(() => {
      this.showUserinfo = false;
    }, 3000);
  }

  public async saveGame(): Promise<void> {
    try {
      if (!this.gameStarted || this._currentKey === 'start_01') {
        this._setNotification('You need to have progress before saving!');
        return;
      }

      const updateObj = { };
      updateObj[ this.user.uid ] = this._currentChapter + '.' + this._currentKey;
      await this._db.object('/saves/').update(updateObj);
      this._setNotification('Game saved successfully!');

    } catch (error) {
      console.error(error);
      this._setNotification('There was an error saving... Please try again!');
    }
  }

  private async _loadIntroduction(): Promise<void> {
    try {
      const response = await this._db.list('/introduction').query.once('value');
      this._items = response.val();
    } catch (error) {
      console.error(error);
    }
  }

  private async _loadSave(userId: string): Promise<void> {
    try {
      const response = await this._db.list(
        '/saves/' + userId
      ).query.once('value');

      const savedKey = response.val();
      if (savedKey) {
        const key = savedKey.split('.')[1];

        if (key && key.trim() !== '' && key !== 'undefined') {
          this._currentKey = key;
        }
      }
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
            this._currentKey = content.next_content;
            this.currentContent = this._items[ content.next_content ];
            this._goToNextSection( this.currentContent );
          }, content.next_delay ? content.next_delay : 0);
        }
      }
    }).play();
  }

  private _setNotification(text: string) {
    this.notification = text;
    setTimeout(() => this.notification = null, 3500);
  }

}
