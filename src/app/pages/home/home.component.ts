import { Component, inject, OnInit } from '@angular/core';
import { WeatherapiService } from '../../core/services/weatherapi.service';
import { IWeather } from '../../shared/Interfaces/iweather';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private readonly weatherService = inject(WeatherapiService);
  weatherInfo : IWeather = {} as IWeather;

  ngOnInit(): void {
    this.getCurrentLocation();
    
  }

  getCurrentWeather(lat:number, lng:number){
    this.weatherService.getCurrentWeather(lat, lng).subscribe({

      next:(res)=>{
        console.log(res);
        this.weatherInfo = res;
      }, 
      error:(err)=>{
        console.log( `Get Current Weather Error: ${err.message}`)
      }
    });
  }

  getCurrentLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`lat = ${lat}, lng = ${lng}`);
          this.getCurrentWeather(lat, lng);
        }, 
        (error)=>{
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
    this.weatherService.searchCountryWeather(country).subscribe({
      next:(res)=>{
        this.weatherInfo = res;
      },
      error:(err)=>{
        console.log(`Get Search Weather Error: ${err.message}`);
      }
    })
  }

}
