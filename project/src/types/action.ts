import {requireAuthorization, requireLogout, setFilms, setGenre, setReviews} from '../store/action';

export enum ActionType {
  SetGenre = 'app/set_genre',
  SetFilms = 'app/set_films',
  SetReviews = 'app/set_reviews',
  RequireAuthorization = 'user/require_authorization',
  RequireLogout = 'user/require_logout',
}

export type Actions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof setFilms>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>;
