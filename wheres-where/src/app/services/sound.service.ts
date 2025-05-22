import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private muted = false;

  private correct = new Howl({ src: ['assets/sounds/correct.mp3'] });
  private wrong = new Howl({ src: ['assets/sounds/wrong.mp3'] });
  private click = new Howl({ src: ['assets/sounds/click.mp3'] });
  private win = new Howl({ src: ['assets/sounds/win.mp3'] });


  toggleMute(): void {
    this.muted = !this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }
  
  playCorrect() {
    if (!this.muted) this.correct.play();
  }

  playWrong() {
    if (!this.muted) this.wrong.play();
  }

  playClick() {
    if (!this.muted) this.click.play();
  }

  playWin() {
  if (!this.muted) this.win.play();
}

  stopWin() {
  this.win.stop();
}
}
