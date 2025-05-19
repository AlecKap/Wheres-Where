import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "game-settings", component: GameSettingsComponent },
  { path: "game", component: GameComponent },
  { path: "leaderboard", component: LeaderboardComponent },
  { path: "results", component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }