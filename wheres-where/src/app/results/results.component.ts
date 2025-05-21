import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameResults } from '../models/game-results.interface';

@Component({
  selector: 'app-results',
  standalone: false,
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  gameResults: GameResults | null = null;
  objectKeys = Object.keys;
  showNameInput: boolean = false;
  playerName: string = '';
  nameSubmitted: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const resultsJson = localStorage.getItem('gameResults');
  if (resultsJson) {
    try {
      this.gameResults = JSON.parse(resultsJson);
      const percentage = this.gameResults?.totalScore?.percentage;
      const numOfQuestions = this.gameResults?.totalScore?.total;
      if (percentage && !isNaN(percentage) && percentage >= 70 && numOfQuestions && numOfQuestions >= 10) {
        this.showNameInput = true;
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
}
