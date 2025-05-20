import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) { }

  isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }

  isResultsPage(): boolean {
    return this.router.url === '/results';
  }

  isLeaderboardPage(): boolean { 
    return this.router.url === '/leaderboard';
  }
}
