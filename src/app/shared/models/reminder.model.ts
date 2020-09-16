import * as Moment from "moment";

export interface Reminder {
  city: string;
  day: Moment.Moment;
  label: string;
	time: string;
	forecast?: string;
}
