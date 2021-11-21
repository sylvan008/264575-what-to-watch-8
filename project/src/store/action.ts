import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Film} from '../types/film';
import {AppRoute, AuthorizationStatus, Genres} from '../utils/const';
import {Review} from '../types/review';
import {Promo} from '../types/promo';

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

/**
 * Действие сохраняет в состоянии промо фильм
 */
const setPromo = createAction(
  ActionType.SetPromo,
  (promo: Promo) => ({
    payload: promo,
  }),
);

const setIsDataLoaded = createAction(ActionType.SetIsDataLoaded);

/**
 * Действие сохраняет список фильмов "К просмотру"
 */
const setFavoriteFilms = createAction(
  ActionType.SetFavoriteFilms,
  (favoriteFilms: Film[]) => ({
    payload: favoriteFilms,
  }),
);

export {
  setGenre,
  setFavoriteFilms,
  setFilms,
  setFilm,
  setIsDataLoaded,
  setReviews,
  setPromo,
  setSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  requireLogout
};
