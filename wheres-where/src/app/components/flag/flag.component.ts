import { Component, Input, OnInit } from '@angular/core';
import { FlagService } from '../../services/flag.service';
import { CountryDataService } from '../../services/country-data.service';

@Component({
  selector: 'app-flag',
  standalone: false,
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.css'
})

export class FlagComponent implements OnInit {
  @Input() continent?: string;
  currentCountry: string = '';
  flagUrl: string | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private flagService: FlagService,
    private countryDataService: CountryDataService
  ) {}

  ngOnInit(): void {
    this.loadNewFlag();
  }

  async loadNewFlag(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      this.currentCountry = this.countryDataService.getRandomCountry(this.continent);
      
      const response = await this.flagService.getCountryFlag(this.currentCountry);
      if (response && response.length > 0) {
        this.flagUrl = response[0].flags.png;
        this.isLoading = false;
      }
    } catch (err) {
      this.error = 'Error loading flag. Please try again.';
      console.error('Error loading flag:', err);
    } finally {
      this.isLoading = false;
    }
  }
}
