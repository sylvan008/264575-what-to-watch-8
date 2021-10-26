import {Film} from './types/film';
import {Genres, STEP_CARDS_VIEW} from './utils/const';

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
