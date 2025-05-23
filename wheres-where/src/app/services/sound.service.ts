import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private muted = false;
  private effectsVolume = 0.5;
  private musicVolume = 0.1;
  

  private correct = new Howl({ 
    src: ['assets/sounds/correct.mp3'],
    volume: this.effectsVolume 
  });
  private wrong = new Howl({ 
    src: ['assets/sounds/wrong.mp3'],
    volume: this.effectsVolume 
  });
  private click = new Howl({ 
    src: ['assets/sounds/click.mp3'],
    volume: this.effectsVolume 
  });
  private win = new Howl({ 
    src: ['assets/sounds/win.mp3'],
    volume: this.effectsVolume 
  });
  private lose = new Howl({ 
    src: ['assets/sounds/lose.mp3'],
    volume: this.effectsVolume 
  });
  private skip = new Howl({ 
    src: ['assets/sounds/skip.mp3'],
    volume: this.effectsVolume 
  });
  private lobbyMusic = new Howl({
    src: ['assets/sounds/lobby.mp3'],
    loop: true,
    volume: this.musicVolume
  });

  setEffectsVolume(value: number): void {
    this.effectsVolume = Math.max(0, Math.min(1, value));
    this.correct.volume(this.effectsVolume);
    this.wrong.volume(this.effectsVolume);
    this.click.volume(this.effectsVolume);
    this.win.volume(this.effectsVolume);
    this.lose.volume(this.effectsVolume);
    this.skip.volume(this.effectsVolume);
  }

  setMusicVolume(value: number): void {
    this.musicVolume = Math.max(0, Math.min(1, value));
    this.lobbyMusic.volume(this.musicVolume);
  }

  getEffectsVolume(): number {
    return this.effectsVolume;
  }

  getMusicVolume(): number {
    return this.musicVolume;
  }

  toggleMute(): void {
    this.muted = !this.muted;
    if (this.muted) {
      this.lobbyMusic.pause();
      this.win.stop();
      this.lose.stop();
    } else {
      this.playLobbyMusic();
    }
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

  playSkip() {
    if (!this.muted) this.skip.play();
  }

  playClick() {
    if (!this.muted) this.click.play();
  }

  playWin() {
    if (!this.muted) this.win.play();
  }

  stopWin() {
    this.win.fade(1.0, 0, 500);
    setTimeout(() => this.win.stop(), 500);
  }

  playLose() {
    if (!this.muted) this.lose.play();
  }
  stopLose() {
    this.lose.stop();
  }

  playLobbyMusic() {
    if (!this.muted && !this.lobbyMusic.playing()) {
      this.lobbyMusic.play();
    }
  }

  stopLobbyMusic() {
    if (this.lobbyMusic.playing()) {
      this.lobbyMusic.fade(0.3, 0, 500); // fade over 0.5 seconds
      setTimeout(() => this.lobbyMusic.stop(), 500);
    }
  }
}
