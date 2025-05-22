import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameResults } from '../models/game-results.interface';
import { SoundService } from '../services/sound.service';
import { startConfettiRain, stopConfettiRain } from '../utils/confetti-launcher';



@Component({
  selector: 'app-results',
  standalone: false,
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit, OnDestroy {
  gameResults: GameResults | null = null;
  objectKeys = Object.keys;
  showNameInput: boolean = false;
  playerName: string = '';
  nameSubmitted: boolean = false;

  constructor(private router: Router, public soundService: SoundService) {}

  ngOnInit() {
    const resultsJson = localStorage.getItem('gameResults');
  if (resultsJson) {
    try {
      this.gameResults = JSON.parse(resultsJson);
      const percentage = this.gameResults?.totalScore?.percentage;
      const numOfQuestions = this.gameResults?.totalScore?.total;
      if (percentage && !isNaN(percentage) && percentage >= 70 && numOfQuestions && numOfQuestions >= 10) {
        startConfettiRain("win");
        this.showNameInput = true;
        this.soundService.playWin();
       /* document.addEventListener('click', stopConfettiRain, { once: true });*/

      } else if(percentage && !isNaN(percentage) && percentage > 70) {
        this.soundService.playWin();
        startConfettiRain("win");
      } else {
        this.soundService.playLose();
        startConfettiRain("lose");
  
        }
    } catch (error) {
      console.error('Error parsing game results:', error);
      this.router.navigate(['']);
    }
  } else {
    this.router.navigate(['']);
  }
}

  submitScore() {
    if (!this.playerName.trim() || !this.gameResults) return;

    const storedScores = localStorage.getItem('leaderboard');
    let scores = storedScores ? JSON.parse(storedScores) : [];
    
    scores.push({
      name: this.playerName.trim(),
      score: Math.round(this.gameResults.totalScore.percentage)
    });

    scores.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score);
    scores = scores.slice(0, 10);

    localStorage.setItem('leaderboard', JSON.stringify(scores));
    
    this.nameSubmitted = true;
    this.showNameInput = false;
  }

  playAgain() {
    localStorage.removeItem('gameResults');
    this.router.navigate(['/game-settings']);
  }

  hasCountryScores(): boolean {
   if (!this.gameResults || !this.gameResults.countryScores) {
        return false;
    }
    return Object.keys(this.gameResults.countryScores).length > 0;
  }

  sortedCountryScores(): string[] {
    if (!this.gameResults?.continentScores) return [];
    return Object.keys(this.gameResults.continentScores).sort((a, b) => 
    this.gameResults!.continentScores[b].percentage - 
    this.gameResults!.continentScores[a].percentage
  );
  }
  ngOnDestroy(): void {
  stopConfettiRain();
  this.soundService.stopWin();
  this.soundService.stopLose();
}
}
