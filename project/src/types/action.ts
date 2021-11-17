import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './state';
import {Action} from '@reduxjs/toolkit';

export enum ActionType {
  SetGenre = 'app/set_genre',
  SetFilms = 'app/set_films',
  SetFilm = 'app/set_film',
  SetPromo = 'app/set_promo',
  SetIsDataLoaded= 'app/set_is_data_loaded',
  SetReviews = 'app/set_reviews',
  SetSimilarFilms = 'app/set_similar_films',
  RequireAuthorization = 'user/require_authorization',
  RequireLogout = 'user/require_logout',
  RedirectToRoute = 'app/redirect',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>
