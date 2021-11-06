import {ActionType} from '../types/action';
import {Film} from '../types/film';
import {AppRoute, AuthorizationStatus, Genres} from '../utils/const';
import {Review} from '../types/review';

/**
 * Действие сохраняет в состоянии выбранный жанр
 */
function setGenre(genre: Genres) {
  return ({
    type: ActionType.SetGenre,
    payload: genre,
  } as const);
}

/**
 * Действие сохраняет в состоянии фильмы
 */
function setFilms(films: Film[]) {
  return ({
    type: ActionType.SetFilms,
    payload: films,
  } as const);
}

/**
 * Действие сохраняет фильм в хранилище
 */
function setFilm(film: Film) {
  return ({
    type: ActionType.SetFilm,
    payload: film,
  } as const);
}

/**
 * Действие сохраняет похожие фильмы
 */
function setSimilarFilms(films: Film[]) {
  return ({
    type: ActionType.SetSimilarFilms,
    payload: films,
  } as const);
}

/**
 * Действие сохраняет в состоянии отзывы пользователей
 */
function setReviews(reviews: Review[]) {
  return ({
    type: ActionType.SetReviews,
    payload: reviews,
  } as const);
}

/**
 * Действие устанавливает статус авторизации пользователя, как авторизован
 */
function requireAuthorization(authorizationStatus: AuthorizationStatus) {
  return ({
    type: ActionType.RequireAuthorization,
    payload: authorizationStatus,
  } as const);
}

/**
 * Действие устанавливает статус авторизации пользователя, как не авторизован
 */
function requireLogout() {
  return ({
    type: ActionType.RequireLogout,
    payload: AuthorizationStatus.NoAuth,
  } as const);
}

/**
 * Действие для оповещения redux о необходимости переадресовать пользователя
 */
function redirectToRoute(url: AppRoute) {
  return ({
    type: ActionType.RedirectToRoute,
    payload: url,
  } as const);
}

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
