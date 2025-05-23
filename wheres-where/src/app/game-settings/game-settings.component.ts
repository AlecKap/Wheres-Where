import { Component } from '@angular/core';
import { SoundService } from '../services/sound.service';
import { Router } from '@angular/router';
import { CountryDataService } from '../services/country-data.service';
import { GameSettings } from '../models/game-settings.interface';

@Component({
  selector: 'app-game-settings',
  standalone: false,
  templateUrl: './game-settings.component.html',
  styleUrl: './game-settings.component.css'
})
export class GameSettingsComponent {
  questionOptions: number[] = [5, 10, 15, 20];
  continents: string[] = ['All Continents', 'Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
  selectedQuestions: number = 5;
  selectedContinent: string = 'All Continents';
  effectsVolume: number = 50;
  musicVolume: number = 10;


  constructor(
    private router: Router,
    private countryDataService: CountryDataService,
    public soundService: SoundService
  ) {
    this.effectsVolume = this.soundService.getEffectsVolume() * 100;
    this.musicVolume = this.soundService.getMusicVolume() * 100;
  }
  
  startGame(route: string = '/game') {
    const continentMap: { [key: string]: string } = {
      'Africa': 'africa',
      'Asia': 'asia',
      'Europe': 'europe',
      'North America': 'northAmerica',
      'South America': 'southAmerica',
      'Oceania': 'oceania'
    };
    
    const gameSettings: GameSettings = {
      numberOfQuestions: this.selectedQuestions,
      selectedContinent: this.selectedContinent === 'All Continents' 
      ? null 
      : continentMap[this.selectedContinent]
    };

    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
    this.router.navigate([route]);
  }

  selectContinent(continent: string) {
    this.selectedContinent = continent;
  }

  updateEffectsVolume(event: Event): void {
    const slider = event.target as HTMLInputElement;
    this.effectsVolume = parseInt(slider.value);
    this.soundService.setEffectsVolume(this.effectsVolume / 100);
  }

  updateMusicVolume(event: Event): void {
    const slider = event.target as HTMLInputElement;
    this.musicVolume = parseInt(slider.value);
    this.soundService.setMusicVolume(this.musicVolume / 100);
  }
}

