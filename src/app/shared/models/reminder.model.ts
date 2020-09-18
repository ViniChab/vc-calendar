import * as Moment from "moment";

export interface Reminder {
  id: number;
  city: string;
  day: Moment.Moment;
  label: string;
  time: Moment.Moment;
  forecast: any;
}
