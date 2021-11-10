import {FilmRating} from './const';
import {NormalizedRating} from '../types/review';

const HOUR = 60;

/**
 * Делает время продолжительности фильма, удобочитаемым для людей
 */
function humanizeRuntime(duration: number): string {
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;
  return `${hours}h ${minutes}m`;
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

export {
  classNames,
  humanizeRuntime,
  humanizedRating
};
