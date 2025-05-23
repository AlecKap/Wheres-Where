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
  templateUrl: './mc-game.component.html',
  styleUrl: './mc-game.component.css'
})
export class McGameComponent implements OnInit {
  @ViewChild(FlagComponent) flagComponent!: FlagComponent;
  playerGuess: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  currentCountry: string = '';
  currentOptions: string[] = [];
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
    this.countryDataService.resetUsedCountries();
    this.getNewCountry();
  }

  getNewCountry() {
    const continent = this.gameSettings?.selectedContinent || undefined;
    const correctCountry = this.countryDataService.getRandomCountry(continent);

    if (!correctCountry) {
      localStorage.setItem('gameResults', JSON.stringify(this.gameResults));
      this.router.navigate(['/results']);
      return;
    }

    this.currentCountry = correctCountry;

    const wrongChoices = new Set<string>();
    while (wrongChoices.size < 3) {
      const candidate = this.countryDataService.getRandomCountryUnfiltered(continent);
      if (candidate && candidate !== correctCountry) {
        wrongChoices.add(candidate);
      }
    }

    this.currentOptions = this.shuffleArray([correctCountry, ...Array.from(wrongChoices)]);

    this.errorMessage = '';
    this.successMessage = '';

    if (this.questionsRemaining === 0) {
      localStorage.setItem('gameResults', JSON.stringify(this.gameResults));
      this.router.navigate(['/results']);
      return;
    }

    this.questionsRemaining--;
    console.log('country:', this.currentCountry);
    console.log('options:', this.currentOptions);
  }

  shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  checkAnswer(guess: string): boolean {
      return this.playerGuess === this.currentCountry;

  }

  submitGuess() {
  if (!this.playerGuess) {
    this.errorMessage = 'Please select an answer';
    return;
  }

  const actualContinent = this.countryDataService.getCountryContinent(this.currentCountry);
  const selectedContinent = this.gameSettings?.selectedContinent || 'All Continents';

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

  if (this.checkAnswer(this.playerGuess)) {
    this.soundService.playCorrect();
    //this.soundService.correctConfetti();
    this.successMessage = 'Correct!';
    this.gameResults.totalScore.correct++;

    if (selectedContinent === 'All Continents') {
      this.gameResults.continentScores[actualContinent].correct++;
    } else {
      this.gameResults.continentScores[selectedContinent].correct++;
    }
  } else {
    this.soundService.playWrong();
    this.errorMessage = 'Incorrect.';
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

  setTimeout(() => {
    this.getNewCountry();
  }, 1000);
}


  skipFlag() {
    this.soundService.playWrong();
    if (this.skipsRemaining <= 0) {
      this.errorMessage = 'No skips remaining';
      return;
    }
    this.skipsRemaining--;
    this.questionsRemaining++;
    this.getNewCountry();
    this.playerGuess = '';
    this.errorMessage = '';
  }
}
