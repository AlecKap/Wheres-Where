import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private muted = false;

  private correct = new Howl({ src: ['assets/sounds/correct.mp3'] });
  private wrong = new Howl({ src: ['assets/sounds/wrong.mp3'] });
  private click = new Howl({ src: ['assets/sounds/click.mp3'] });
  private win = new Howl({ src: ['assets/sounds/win.mp3'] });
  private lose = new Howl({ src: ['assets/sounds/lose.mp3'] });
  private lobbyMusic = new Howl({
    src: ['assets/sounds/lobby.mp3'],
    loop: true,
    volume: 0
  });

  toggleMute(): void {
    this.muted = !this.muted;
    if (this.muted) {
      this.lobbyMusic.pause();
      this.win.stop();
      this.lose.stop();
    } else {
      this.playLobbyMusic(); // resume
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
    // if (!this.muted && !this.lobbyMusic.playing()) {
    //   this.lobbyMusic.play();
    // }
  }

  stopLobbyMusic() {
  if (this.lobbyMusic.playing()) {
    this.lobbyMusic.fade(0.3, 0, 500); // fade over 0.5 seconds
    setTimeout(() => this.lobbyMusic.stop(), 500);
  }
}

}
