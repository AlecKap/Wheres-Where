import { Component } from '@angular/core';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-audio-modal',
  standalone: false,
  templateUrl: './audio-modal.component.html',
  styleUrls: ['./audio-modal.component.css']
})
export class AudioModalComponent {
  effectsVolume: number = 50;
  musicVolume: number = 10;
  showModal: boolean = false;

  constructor(public soundService: SoundService) {
    this.effectsVolume = this.soundService.getEffectsVolume() * 100;
    this.musicVolume = this.soundService.getMusicVolume() * 100;
  }

  toggleModal() {
    this.showModal = !this.showModal;
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