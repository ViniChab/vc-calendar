import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as Moment from "moment";

import { Reminder } from "../../models/reminder.model";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  private readonly _apiUrl = "http://api.weatherbit.io/v2.0/";
  private readonly _key = "026f63beafa24a23a3d60f216af0e772";

  constructor(private _http: HttpClient) {}

  public isCityValid(cityName: string): Observable<any> {
    return this._http.get(
      `${this._apiUrl}current?city=${cityName}&key=${this._key}`
    );
  }

  public getHistoricalForecast(cityName: string, day: Moment.Moment): Observable<any> {
    const dayWithoutReference = Moment(day.format("YYYY-MM-DD"));
    const startDate = dayWithoutReference.format("YYYY-MM-DD");
    const endDate = dayWithoutReference.add(1, "day").format("YYYY-MM-DD");

    return this._http.get(
      `${this._apiUrl}history/daily?city=${cityName}&start_date=${startDate}&end_date=${endDate}&key=${this._key}`
    );
  }

  public getFutureForecast(cityName: string): Observable<any> {
    return this._http.get(
      `${this._apiUrl}forecast/daily?city=${cityName}&key=${this._key}`
    );
  }

  public getForecast(reminder: Reminder): Promise<Reminder> {
    return new Promise((resolve, reject) => {
      const today = Moment();
      reminder.day = Moment(reminder.day);

      reminder.day.diff(today, "day") < 0 ?
        this.getHistoricalForecast(reminder.city, reminder.day).subscribe( res => {
          this._setForecast(res, reminder);
          resolve(reminder);
        }) :
        this.getFutureForecast(reminder.city).subscribe( res => {
          this._setForecast(res, reminder);
          resolve(reminder);
        });
    });
  }

  private _setForecast(response: any, reminder: Reminder): void {
    if (response.data)
      response.data.forEach( forecast => {
        if (forecast.datetime === reminder.day.format("YYYY-MM-DD"))
          return reminder.forecast = forecast;
      });
  }
}
