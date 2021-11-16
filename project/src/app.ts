import {Film} from './types/film';
import {AuthorizationStatus, Genres, STEP_CARDS_VIEW} from './utils/const';

/**
 * Фильтрует список фильмов на основе выбранного жанра
 */
export function filterFilms(films: Film[], activeGenre: Genres): Film[] {
  if (activeGenre === Genres.AllGenres) {
    return films;
  }
  return films.filter((film) => film.genre === activeGenre);
}

/**
 * Вычисляет количество карточек фильмов для отрисовки в списке
 */
export function getNextFilmsCount(filmListLength: number, currentCount = 0, step = STEP_CARDS_VIEW): number {
  return Math.min(filmListLength, currentCount + STEP_CARDS_VIEW);
}

/**
 * Проверяет, был ли запрос на авторизацию
 */
export function isCheckedAuth(authorizationStatus: AuthorizationStatus): boolean {
  return authorizationStatus === AuthorizationStatus.Unknown;
}


export const promo = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  release: 2014,
};
