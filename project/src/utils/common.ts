import {APIRoute, AppRoute, FilmRating} from './const';
import {NormalizedRating} from '../types/review';
import {RouteParamsValues} from '../types/url-params';

const HOUR = 60;
const MINUTE = 60;

const HOUR_SECONDS = 3600;

/**
 * Делает время продолжительности фильма, удобочитаемым для людей
 */
function humanizeRuntime(duration: number): string {
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;
  return `${hours}h ${minutes}m`;
}


/**
 *  Делает оставшееся время фильма, удобочитаемым для людей
 */
function humanizeVideoTimeLeft(time = 0): string {
  if  (!time) {
    return '0:00:00';
  }
  const durationMinutes = time % HOUR_SECONDS;
  const durationSeconds = durationMinutes % MINUTE;

  let hours = Math.floor(time / HOUR_SECONDS),
    minutes = Math.floor(durationMinutes / MINUTE),
    seconds = Math.ceil(durationSeconds);

  if (seconds === MINUTE) {
    seconds = 0;
    minutes = minutes + 1;
  }
  if (minutes === HOUR) {
    minutes = 0;
    hours = hours + 1;
  }
  const mm = `${minutes < 10 ? '0' : ''}${minutes}`;
  const ss = `${seconds < 10 ? '0' : ''}${seconds}`;

  return hours === 0
    ? `-${mm}:${ss}`
    : `-${hours}:${mm}:${ss}`;
}

/**
 * Формирует текстовое представление оценки
 */
function humanizedRating(rating: number): string {
  const normalizeRating: NormalizedRating = Math.trunc(rating) as NormalizedRating;
  return FilmRating[normalizeRating];
}

/**
 * Объединяет названия CSS классов в одну строку
 */
function classNames(className: string, ...rest: string[]): string {
  if (rest.length) {
    return [className, ...rest].join(' ').trim();
  }
  return className;
}

/**
 * Заменяет в пути параметры на переданное значение
 */
function replaceRouteParams(route: APIRoute | AppRoute, param: RouteParamsValues, replace: string | number): string {
  if (typeof replace  === 'number') {
    replace = replace.toString();
  }
  return route.replace(param, replace);
}

export {
  classNames,
  humanizeRuntime,
  humanizeVideoTimeLeft,
  humanizedRating,
  replaceRouteParams
};
