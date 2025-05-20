import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryDataService } from '../services/country-data.service';
import { FlagComponent } from '../components/flag/flag.component';
import { SoundService } from '../services/sound.service';

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

  constructor(private countryDataService: CountryDataService,
  public soundService: SoundService) {}

  ngOnInit() {
    this.getNewCountry();
    console.log('the current country is', this.currentCountry);
  }

  getNewCountry() {
    this.currentCountry = this.countryDataService.getRandomCountry();
    this.errorMessage = '';
    this.successMessage = '';
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
      }, 1000);
    } else {
      this.soundService.playWrong();
      this.errorMessage = 'Sorry, that is incorrect.';
      setTimeout(() => {
        this.getNewCountry();
      }, 1500);
    }
    
    this.playerGuess = '';
  }

  skipFlag() {
    this.soundService.playWrong();
    this.getNewCountry();
    this.playerGuess = '';
    this.errorMessage = '';
    console.log('Skipped flag, new country:', this.currentCountry);
  }
}
