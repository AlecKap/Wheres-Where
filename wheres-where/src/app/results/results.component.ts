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

  constructor(private router: Router) {}

  ngOnInit() {
    const resultsJson = localStorage.getItem('gameResults');
    if (resultsJson) {
      this.gameResults = JSON.parse(resultsJson);
    } else {
      this.router.navigate(['']);
    }
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
