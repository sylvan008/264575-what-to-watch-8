import {ActionType} from '../types/action';
import {Film} from '../types/film';
import {Genres} from '../utils/const';

function setGenre(genre: Genres) {
  return ({
    type: ActionType.SetGenre,
    payload: genre,
  } as const);
}

function setFilms(films: Film[]) {
  return ({
    type: ActionType.SetFilms,
    payload: films,
  } as const);
}

export {
  setGenre,
  setFilms
};
