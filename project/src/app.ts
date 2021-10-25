import {Film} from './types/film';
import {Genres} from './utils/const';

export function filterFilms(films: Film[], activeGenre: Genres): Film[] {
  if (activeGenre === Genres.AllGenres) {
    return films;
  }
  return films.filter((film) => film.genre === activeGenre);
}
