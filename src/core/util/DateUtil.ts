import moment from 'moment';
import 'moment/locale/ko';

const DEFAULT_FORMAT = 'YYYY-MM-DD';

export function getToday(format: string = DEFAULT_FORMAT) {
  return moment().format(format);
};

export function getDate(date: string) {
  return moment(date);
};

export function getMinuteToDate(minute: number, format: string = DEFAULT_FORMAT) {
  return moment.utc().startOf('day').add(minute, 'minutes').format(format);
}