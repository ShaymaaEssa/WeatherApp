import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather():Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/current.json?key=${environment.apiKey}&q=Cairo`)
  }
}
