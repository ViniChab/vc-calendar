import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faSun, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import * as Moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _baseUrl = "https://api.weatherbit.io/v2.0/";
  private _key = "026f63beafa24a23a3d60f216af0e772";

  public weatherIcons = {
    sunny: faSun
  }


  constructor(private _http: HttpClient) { }

  public isCityValid(cityName: string): Observable<Object> {
    return this._http.get(`${this._baseUrl}current?city=${cityName}&key=${this._key}`)
  }

  public getWeather(date: Moment.Moment): IconDefinition {
    return this.weatherIcons.sunny;
  }
}
