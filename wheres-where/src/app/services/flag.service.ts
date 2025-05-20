import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlagResponse } from '../models/country.interface';

@Injectable({
  providedIn: 'root'
})

export class FlagService {
  private baseUrl = 'https://restcountries.com/v3.1/name';

  constructor(private http: HttpClient) { }
  
  async getCountryFlag(countryName: string) {
    let data = await this.http.get<FlagResponse[]>(`${this.baseUrl}/${countryName}?fields=flags`).toPromise();
    console.log(data);
    return data;
  }
}
