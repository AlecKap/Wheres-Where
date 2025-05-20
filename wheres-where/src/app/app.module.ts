import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ResultsComponent } from './results/results.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlagComponent } from './components/flag/flag.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    LeaderboardComponent,
    ResultsComponent,
    GameSettingsComponent,
    NavbarComponent,
    FlagComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
