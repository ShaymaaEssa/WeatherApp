import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { IWeather } from '../../shared/Interfaces/iweather';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(lat:number, lng:number):Observable<IWeather>{
    if(lat!=0 && lng!=0){
      return this.httpClient.get<IWeather>(`${environment.baseURL}/current.json?key=${environment.apiKey}&q=${lat},${lng}`)

    }
    else{
      return this.httpClient.get<IWeather>(`${environment.baseURL}/current.json?key=${environment.apiKey}&q=Cairo`)

    }
  }

  searchCountryWeather(country:string):Observable<IWeather>{
        return this.httpClient.get<IWeather>(`${environment.baseURL}/current.json?key=${environment.apiKey}&q=${country}`);
  }
}
