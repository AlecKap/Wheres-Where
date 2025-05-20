import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  playerGuess: string = '';

  submitGuess() {
    console.log('Player guessed:', this.playerGuess);
    // Add your guess validation logic here
    this.playerGuess = '';
  }

  skipFlag() {
    console.log('Flag skipped');
    // Add your skip logic here
  }
}
