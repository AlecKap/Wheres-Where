import { Injectable } from '@angular/core';
import { CountryData } from '../models/country.interface';

@Injectable({
  providedIn: 'root'
})

export class CountryDataService {
  private countryData: CountryData = {
    africa: [ "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon",
              "Central African Republic", "Chad", "Comoros", "Democratic Republic of the Congo", "Republic of the Congo",
              "Côte d'Ivoire", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon",
              "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
              "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria",
              "Rwanda", "São Tomé and Príncipe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
              "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
    ],
    asia: [ "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China",
            "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan",
            "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal",
            "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore",
            "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey",
            "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
    ],
    europe: [ "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina",
              "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France",
              "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan",
              "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco",
              "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal",
              "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
              "Spain",  "Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"
    ],
    northAmerica: [ "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba", "Dominica",
                    "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico",
                    "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
                    "Trinidad and Tobago", "United States"
    ],
    southAmerica: [ "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru",
                    "Suriname", "Uruguay", "Venezuela"
    ],
    oceania: [ "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", "Palau",
              "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
    ]
  };

  private usedCountries: Set<string> = new Set();

  resetUsedCountries() {
    this.usedCountries.clear();
  }

  getRandomCountry(continent?: string): string {
    let availableCountries: string[];

    if (continent && this.countryData[continent]) {
      availableCountries = this.countryData[continent].filter(
        country => !this.usedCountries.has(country)
      );
    } else {
      availableCountries = Object.values(this.countryData)
        .flat()
        .filter(country => !this.usedCountries.has(country));
    }

    if (availableCountries.length === 0) {
      console.warn('All countries have been used in this round!');
      return '';
    }

    const randomIndex = Math.floor(Math.random() * availableCountries.length);
    const selectedCountry = availableCountries[randomIndex];
    
    this.usedCountries.add(selectedCountry);
    console.log(this.usedCountries);
    console.log('availableCountries:', availableCountries);
    return selectedCountry;
  }

  getCountryContinent(country: string): string {
    for (const [continent, countries] of Object.entries(this.countryData)) {
      if (countries.includes(country)) {
        switch(continent) {
          case 'northAmerica': return 'North America';
          case 'southAmerica': return 'South America';
          default: return continent.charAt(0).toUpperCase() + continent.slice(1);
        }
      }
    }
    return 'Unknown';
  }
}
