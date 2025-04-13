import { Component, inject, OnInit } from '@angular/core';
import { WeatherapiService } from '../../core/services/weatherapi.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private readonly weatherService = inject(WeatherapiService);

  ngOnInit(): void {
    this.getCurrentWeather();
  }

  getCurrentWeather(){
    this.weatherService.getCurrentWeather().subscribe({

      next:(res)=>{
        console.log(res.data);
      }, 
      error:(err)=>{
        console.log(err.message)
      }
    });
  }

}
