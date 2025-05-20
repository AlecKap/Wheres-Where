import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryDataService } from '../services/country-data.service';
import { FlagComponent } from '../components/flag/flag.component';
import { SoundService } from '../services/sound.service';
import { GameSettings } from '../models/game-settings.interface';
import { Router } from '@angular/router';

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
    console.log('the current country is', this.currentCountry);
    console.log('the game settings are', this.gameSettings);
  }

  getNewCountry() {
    const continent = this.gameSettings?.selectedContinent || undefined;
    this.currentCountry = this.countryDataService.getRandomCountry(continent);
    this.errorMessage = '';
    this.successMessage = '';

    if (this.questionsRemaining === 0) {
      this.router.navigate(['/results']);
    }
    this.questionsRemaining--;
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

    if (this.checkAnswer(cleanedGuess)) {
      this.soundService.playCorrect();
      this.successMessage = 'Correct!';
      setTimeout(() => {
        this.getNewCountry();
        this.successMessage = '';
      }, 600);
    } else {
      this.soundService.playWrong();
      this.errorMessage = 'Incorrect.';
      setTimeout(() => {
        this.getNewCountry();
      }, 600);
    }
    
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
