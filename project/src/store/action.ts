import {ActionType, SetFilmsAction, SetGenreAction} from '../types/action';
import {Film} from '../types/film';

function setGenre(genre: string): SetGenreAction {
  return {
    type: ActionType.SetGenre,
    payload: genre,
  };
}

function setFilms(films: Film[]): SetFilmsAction {
  return {
    type: ActionType.SetFilms,
    payload: films,
  };
}

export {
  setGenre,
  setFilms
};
