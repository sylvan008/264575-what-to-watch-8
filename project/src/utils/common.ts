import {AuthorizationStatus, FilmRating} from './const';

const HOUR = 60;

type NormalizedRating = keyof typeof FilmRating;

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

/**
 * Проверяет статус авторизации пользователя.
 * Возвращает true, если пользователь авторизован.
 */
function checkIsAuthorization(authorizationStatus: AuthorizationStatus): boolean {
  return authorizationStatus === AuthorizationStatus.Auth;
}

export {
  classNames,
  checkIsAuthorization,
  humanizeRuntime,
  humanizedRating
};
