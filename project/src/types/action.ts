import {setFilms, setGenre} from '../store/action';

export enum ActionType {
  SetGenre = 'app/set_genre',
  SetFilms = 'app/set_films',
}

export type Actions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof setFilms>;
