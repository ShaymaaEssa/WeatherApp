import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { IWeather } from '../../shared/Interfaces/iweather';
import { mapWeatherResponse } from './weather.mapper';
import { IWeatherSpecs } from '../../shared/Interfaces/iweather-specs';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(lat:number, lng:number):Observable<IWeatherSpecs>{
    if(lat!=0 && lng!=0){
      return this.httpClient.get<IWeather>(`${environment.baseURL}/current.json?key=${environment.apiKey}&q=${lat},${lng}`)
        .pipe(
          map(mapWeatherResponse)
        )
    }
    else{
      return this.httpClient.get<IWeather>(`${environment.baseURL}/current.json?key=${environment.apiKey}&q=Cairo`)
      .pipe(
        map(mapWeatherResponse)
      )
    }
  }

  searchCountryWeather(country:string):Observable<IWeatherSpecs>{
        return this.httpClient.get<IWeather>(`${environment.baseURL}/current.json?key=${environment.apiKey}&q=${country}`)
        .pipe(
          map(mapWeatherResponse)
        )
  
  
      }
}
