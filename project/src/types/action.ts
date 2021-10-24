import {Film} from './film';

export enum ActionType {
  SetGenre = 'app/set_genre',
  SetFilms = 'app/set_films',
}

export type SetGenreAction = {
  type: ActionType.SetGenre,
  payload: string,
}

export type SetFilmsAction = {
  type: ActionType.SetFilms,
  payload: Film[],
}

export type Actions = SetGenreAction
  | SetFilmsAction;
