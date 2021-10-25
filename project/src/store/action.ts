import {ActionType, SetFilmsAction, SetGenreAction} from '../types/action';
import {Film} from '../types/film';
import {Genres} from '../utils/const';

function setGenre(genre: Genres): SetGenreAction {
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
