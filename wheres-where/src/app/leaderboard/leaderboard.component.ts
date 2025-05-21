import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-leaderboard',
  standalone: false,
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  scores: { name: string; score: number }[] = [];

  ngOnInit() {
    const storedScores = localStorage.getItem('leaderboard');
    this.scores = storedScores ? JSON.parse(storedScores) : [];
    this.scores.sort((a, b) => b.score - a.score); // highest first although already taken care of in game
  }

  getMedal(index: number): string | null {
  switch (index) {
    case 0: return '🥇';
    case 1: return '🥈';
    case 2: return '🥉';
    default: return null;
  }
}
}
