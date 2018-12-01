import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { SunComponent } from './components/sun.component';
import { BirdsComponent } from './components/birds.component';
import { AuthComponent } from './components/auth/auth.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NotificationComponent } from './components/notification/notification.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { SaveGameComponent } from './components/save-game/save-game.component';
import { UtilService } from './services/util.service';
import { GameOptionsComponent } from './components/_game-options/game-options.component';
import { GameTextComponent } from './components/_game-text/game-text.component';

@NgModule({
  declarations: [
    AppComponent,
    StartGameComponent,
    SaveGameComponent,
    AuthComponent,
    NotificationComponent,
    GameTextComponent,
    GameOptionsComponent,
    SunComponent,
    BirdsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
