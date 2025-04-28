export interface IWeatherSpecs {
    localtime: string
    
    name: string
    country: string



    temp_c: number
    condition: Condition
    wind_kph: number
    humidity: number
    cloud: number
    vis_km: number
}

export interface Condition {
    text: string
    icon: string
  }
