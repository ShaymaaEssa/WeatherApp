import { IWeather } from "../../shared/Interfaces/iweather";
import { IWeatherSpecs } from "../../shared/Interfaces/iweather-specs";

export function mapWeatherResponse(response: IWeather):IWeatherSpecs{
    return {
        localtime: response.location.localtime, // For displaying the date

        name: response.location.name,
        country: response.location.country,

        temp_c: response.current.temp_c,
        condition: {
        text: response.current.condition.text,
        icon: response.current.condition.icon
        },
        wind_kph: response.current.wind_kph,
        humidity: response.current.humidity,
        cloud: response.current.cloud,
        vis_km: response.current.vis_km,
    };
}