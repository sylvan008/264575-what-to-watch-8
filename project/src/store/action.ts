import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Film} from '../types/film';
import {AppRoute, AuthorizationStatus, Genres} from '../utils/const';
import {Review} from '../types/review';

/**
 * Действие сохраняет в состоянии выбранный жанр
 */
const setGenre = createAction(
  ActionType.SetGenre,
  (genre: Genres) => ({
    payload: genre,
  }),
);


/**
 * Действие сохраняет в состоянии фильмы
 */
const setFilms = createAction(
  ActionType.SetFilms,
  (films: Film[]) => ({
    payload: films,
  }),
);

/**
 * Действие сохраняет фильм в хранилище
 */
const setFilm = createAction(
  ActionType.SetFilm,
  (film: Film) => ({
    payload: film,
  }),
);

/**
 * Действие сохраняет похожие фильмы
 */
const setSimilarFilms = createAction(
  ActionType.SetSimilarFilms,
  (similarFilms: Film[]) => ({
    payload: similarFilms,
  }),
);

/**
 * Действие сохраняет в состоянии отзывы пользователей
 */
const setReviews = createAction(
  ActionType.SetReviews,
  (reviews: Review[]) => ({
    payload: reviews,
  }),
);

/**
 * Действие устанавливает статус авторизации пользователя, как авторизован
 */
const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authorizationStatus: AuthorizationStatus) => ({
    payload: authorizationStatus,
  }),
);

/**
 * Действие устанавливает статус авторизации пользователя, как не авторизован
 */
const requireLogout = createAction(ActionType.RequireLogout);

/**
 * Действие для оповещения redux о необходимости переадресовать пользователя
 */
const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export {
  setGenre,
  setFilms,
  setFilm,
  setReviews,
  setSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  requireLogout
};
