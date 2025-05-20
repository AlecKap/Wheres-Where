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
    const storedScores = localStorage.getItem('flagGameLeaderboard');
    this.scores = storedScores ? JSON.parse(storedScores) : [];
    this.scores.sort((a, b) => b.score - a.score); // highest score first
  }
}
