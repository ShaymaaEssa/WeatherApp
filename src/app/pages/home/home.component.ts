import { Component, inject, OnInit } from '@angular/core';
import { WeatherapiService } from '../../core/services/weatherapi.service';
import { IWeather } from '../../shared/Interfaces/iweather';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private readonly weatherService = inject(WeatherapiService);
  weatherInfo : IWeather = {} as IWeather;

  capitals: string[] = ['Dubai', 'Tokyo', 'Ottawa', 'Paris'];
  countriesWeather: IWeather[] = [];

  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.getCurrentLocation();
    this.getTrendingCountriesWeather();
    
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

  searchCountryWeather(country:string){
    this.ngxSpinnerService.show('loading-1');
    this.weatherService.searchCountryWeather(country).subscribe({
      next:(res)=>{
        this.weatherInfo = res;
        // this.ngxSpinnerService.hide('loading-1');
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
