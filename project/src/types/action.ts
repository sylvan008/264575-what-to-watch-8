import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './state';
import {
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setFilms,
  setGenre,
  setReviews
} from '../store/action';

export enum ActionType {
  SetGenre = 'app/set_genre',
  SetFilms = 'app/set_films',
  SetReviews = 'app/set_reviews',
  RequireAuthorization = 'user/require_authorization',
  RequireLogout = 'user/require_logout',
  RedirectToRoute = 'app/redirect',
}

export type Actions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof setFilms>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>
