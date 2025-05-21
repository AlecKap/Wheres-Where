import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryDataService } from '../services/country-data.service';
import { FlagComponent } from '../components/flag/flag.component';
import { SoundService } from '../services/sound.service';
import { GameSettings } from '../models/game-settings.interface';
import { Router } from '@angular/router';
import { GameResults, Score } from '../models/game-results.interface';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  @ViewChild(FlagComponent) flagComponent!: FlagComponent;
  playerGuess: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  currentCountry: string = '';
  gameSettings: GameSettings | null = null;
  questionsRemaining: number = 0;
  skipsRemaining: number = 3;
  private gameResults: GameResults = {
    totalScore: { correct: 0, total: 0, percentage: 0 },
    continentScores: {},
    countryScores: {}
  };

  constructor(private countryDataService: CountryDataService, private router: Router, public soundService: SoundService) {
    const settingsJson = localStorage.getItem('gameSettings');
    if (settingsJson) {
      this.gameSettings = JSON.parse(settingsJson);
      this.questionsRemaining = this.gameSettings?.numberOfQuestions ?? 0;
    }
  }

  ngOnInit() {
    if (!this.gameSettings) {
      this.router.navigate(['/game-settings']);
      return;
    }
    this.getNewCountry();
  }

  getNewCountry() {
    const continent = this.gameSettings?.selectedContinent || undefined;
    this.currentCountry = this.countryDataService.getRandomCountry(continent);
    this.errorMessage = '';
    this.successMessage = '';

    if (this.questionsRemaining === 0) {
      localStorage.setItem('gameResults', JSON.stringify(this.gameResults));
      this.router.navigate(['/results']);
    }
    this.questionsRemaining--;
    console.log('country:', this.currentCountry);
  }

  checkAnswer(guess: string): boolean {
    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedAnswer = this.currentCountry.toLowerCase().trim();
    return normalizedGuess === normalizedAnswer;
  }

  submitGuess() {
    let cleanedGuess = this.playerGuess.trim().toLowerCase();
    if (cleanedGuess === '') {
      this.errorMessage = 'Please enter a country name';
      return;
    }

    const actualContinent = this.countryDataService.getCountryContinent(this.currentCountry);
    const selectedContinent = this.gameSettings?.selectedContinent || 'All Continents';

    // consider breaking this out to a helper method after mvp
    if (selectedContinent === 'All Continents') {
      if (!this.gameResults.continentScores[actualContinent]) {
        this.gameResults.continentScores[actualContinent] = {
          correct: 0,
          total: 0,
          percentage: 0
        };
      }
    } else {
      if (!this.gameResults.continentScores[selectedContinent]) {
        this.gameResults.continentScores[selectedContinent] = {
          correct: 0,
          total: 0,
          percentage: 0
        };
      }
    }

    // consider breaking this out to a helper method after mvp
    if (this.checkAnswer(cleanedGuess)) {
      this.soundService.playCorrect();
      this.successMessage = 'Correct!';
      this.gameResults.totalScore.correct++;

      if (selectedContinent === 'All Continents') {
        this.gameResults.continentScores[actualContinent].correct++;
      } else {
        this.gameResults.continentScores[selectedContinent].correct++;
      }

      setTimeout(() => {
        this.getNewCountry();
      }, 600);
    } else {
      this.soundService.playWrong();
      this.errorMessage = 'Incorrect.';
      setTimeout(() => {
        this.getNewCountry();
      }, 600);
    }
    
    this.gameResults.totalScore.total++;
    this.gameResults.totalScore.percentage = 
      (this.gameResults.totalScore.correct / this.gameResults.totalScore.total) * 100;
    
    if (selectedContinent === 'All Continents') {
      this.gameResults.continentScores[actualContinent].total++;
      this.gameResults.continentScores[actualContinent].percentage = 
        (this.gameResults.continentScores[actualContinent].correct / 
        this.gameResults.continentScores[actualContinent].total) * 100;
    } else {
      this.gameResults.continentScores[selectedContinent].total++;
      this.gameResults.continentScores[selectedContinent].percentage = 
        (this.gameResults.continentScores[selectedContinent].correct / 
        this.gameResults.continentScores[selectedContinent].total) * 100;
    }

    localStorage.setItem('gameResults', JSON.stringify(this.gameResults));
    this.playerGuess = '';
  }

  skipFlag() {
    this.soundService.playWrong();
    if (this.skipsRemaining <= 0) {
      this.errorMessage = 'No skips remaining';
      return;
    }
    this.skipsRemaining--;
    this.questionsRemaining++
    this.getNewCountry();
    this.playerGuess = '';
    this.errorMessage = '';
  }
}
