import { Component, inject, OnInit } from '@angular/core';
import { WeatherapiService } from '../../core/services/weatherapi.service';
import { IWeather } from '../../shared/Interfaces/iweather';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounce, debounceTime, Subject } from 'rxjs';
import { json } from 'node:stream/consumers';
import { IWeatherSpecs } from '../../shared/Interfaces/iweather-specs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private readonly weatherService = inject(WeatherapiService);
  weatherInfo : IWeatherSpecs = {} as IWeatherSpecs;

  capitals: string[] = ['Dubai', 'Tokyo', 'Ottawa', 'Paris'];
  countriesWeather: IWeatherSpecs[] = [];

  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  private searchSubject = new Subject<string>; //de bouncing effect

  ngOnInit(): void {
    this.getCurrentLocation();
    this.getTrendingCountriesWeather();

    this.searchSubject.pipe(
      debounceTime(1000)
    ).subscribe(searchText => this.searchCountryWeather(searchText))
    
  }

  getCurrentWeather(lat:number, lng:number){
    this.ngxSpinnerService.show('loading-1');
    this.weatherService.getCurrentWeather(lat, lng).subscribe({

      next:(res)=>{
        console.log(res);
        this.weatherInfo = res;
        this.ngxSpinnerService.hide('loading-1');
      }, 
      error:(err)=>{
        this.ngxSpinnerService.hide('loading-1');
        console.log( `Get Current Weather Error: ${err.message}`)
      }
    });
  }

  getCurrentLocation(){
    this.ngxSpinnerService.show('loading-1');
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`lat = ${lat}, lng = ${lng}`);
          this.getCurrentWeather(lat, lng);
          this.ngxSpinnerService.hide('loading-1');
        }, 
        (error)=>{
          this.ngxSpinnerService.hide('loading-1');
          alert(`Your browser doesn't support get location automatically, we will display weather in cairo, Egypt by default or you should use another browser!`);
          console.log(`Current Location error: ${error}`);
          console.log(error);
          this.getCurrentWeather(0, 0); //get weather for cairo city by default
        }
      )
    }
    else {
      console.log("Geo Location is not supported in this browser!");
    }
  }

  onCountryInputSearch(country:string){
    this.searchSubject.next(country);
  }
  searchCountryWeather(country:string){
    this.ngxSpinnerService.show('loading-1');

    const cache = localStorage.getItem(`weather-${country}`);
    if(cache){
      const cachedData = JSON.parse(cache);
      const now = new Date().getTime();
      if(now - cachedData.timestamp < (5*60*1000)){
        this.weatherInfo = cachedData.weatherData;
        this.ngxSpinnerService.hide('loading-1');

        console.log("weather from cached data !")
        return;
      }
    }

    this.weatherService.searchCountryWeather(country).subscribe({
      next:(res)=>{
        this.weatherInfo = res;
        localStorage.setItem(`weather-${country}`, JSON.stringify({
          timestamp: new Date().getTime(),
          weatherData: res
        }))
        this.ngxSpinnerService.hide('loading-1');
        console.log("weather from Live API !")
      },
      error:(err)=>{
        this.ngxSpinnerService.hide('loading-1');
        alert(`Get Search Weather Error: ${err.message}`);
        console.log(`Get Search Weather Error: ${err.message}`);
      }
    })



  }

  getTrendingCountriesWeather(){
    this.capitals.forEach((capital)=>{
      this.getCapitalWeather(capital);
    })
  }

  getCapitalWeather(capital:string){
    this.weatherService.searchCountryWeather(capital).subscribe({
      next:(res)=>{
        this.countriesWeather.push(res);
      }, 
      error:(err)=>{
        alert(`There is an error in getting the trending country weather, error: ${err}`)
        console.log(`Trending Country Weather ${capital} error: ${err}`);
      }
    })
  }

}
