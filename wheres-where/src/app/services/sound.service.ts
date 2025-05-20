import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private correct = new Howl({ src: ['assets/sounds/correct.mp3'] });
  private wrong = new Howl({ src: ['assets/sounds/wrong.mp3'] });
  private click = new Howl({ src: ['assets/sounds/click.mp3'] });

  playCorrect() {
    this.correct.play();
  }

  playWrong() {
    this.wrong.play();
  }

  playClick() {
    this.click.play();
  }
}
