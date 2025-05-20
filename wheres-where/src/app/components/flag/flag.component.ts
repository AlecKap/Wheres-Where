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
  @Input() set country(value: string) {
    if (value) {
      this.currentCountry = value;
      this.loadFlag(value);
    }
  }
  currentCountry: string = '';
  flagUrl: string | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private flagService: FlagService,
  ) {}

  ngOnInit(): void {
    if (this.currentCountry) {
      this.loadFlag(this.currentCountry);
    }
  }

  private async loadFlag(country: string): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      
      const response = await this.flagService.getCountryFlag(country);
      if (response && response.length > 0) {
        this.flagUrl = response[0].flags.png;
      }
    } catch (err) {
      this.error = 'Error loading flag. Please try again.';
      console.error('Error loading flag:', err);
    } finally {
      this.isLoading = false;
    }
  }
}
