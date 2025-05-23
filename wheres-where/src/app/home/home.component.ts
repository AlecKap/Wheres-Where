import { Component } from '@angular/core';
import { SoundService } from '../services/sound.service';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 constructor(public soundService: SoundService) {}

ngOnInit() {
  // this.soundService.stopLobbyMusic();
  this.soundService.playWin(); // or .playLose()
}

}

