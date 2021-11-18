import {AuthData} from '../types/auth';
import {Film, FilmAdaptedToServer} from '../types/film';
import {ThunkActionResult} from '../types/action';
import {APIRoute, AppRoute, AuthorizationStatus, RouteParams} from '../utils/const';
import {
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setFavoriteFilms,
  setFilm,
  setFilms,
  setPromo,
  setReviews,
  setSimilarFilms
} from './action';
import {dropToken, saveToken, Token} from '../services/token';
import {adaptFilmToClient, adaptReviewToClient} from '../utils/api';
import {CommentPost, ReviewAdaptedToServer} from '../types/review';
import {replaceRouteParams} from '../utils/common';

/**
 * Запрос списка фильмов
 */
export const fetchFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmAdaptedToServer[]>(APIRoute.Films);
    const adaptedData = data.map((film) => adaptFilmToClient(film));
    dispatch(setFilms(adaptedData));
  };

/**
 * Проверка авторизации
 */
export const checkAuthAction = (): ThunkActionResult =>
  (dispatch, _getState, api): Promise<void> => (
    api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      })
  );

/**
 * Вход в аккаунт пользователя
 */
export const loginAction = ({email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };

/**
 * Выход из аккаунта пользователя
 */
export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

/**
 * Действие запрашивает с сервера конкретный фильм
 */
export const fetchFilm = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmAdaptedToServer>(replaceRouteParams(APIRoute.Film, RouteParams.ID, filmId));
    const adaptedData = adaptFilmToClient(data);
    dispatch(setFilm(adaptedData));
  };

/**
 * Действие запрашивает схожие фильмы с сервера
 */
export const fetchSimilarFilms = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(replaceRouteParams(APIRoute.SimilarFilms, RouteParams.ID, filmId));
    const adaptedData = data.map((film) => adaptFilmToClient(film));
    dispatch(setSimilarFilms(adaptedData));
  };

/**
 * Действие запрашивает комментарии к фильму с сервера
 */
export const fetchReviews = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ReviewAdaptedToServer[]>(replaceRouteParams(APIRoute.Comments, RouteParams.FILM_ID, filmId));
    const adaptedData = data.map((review) => adaptReviewToClient(review));
    dispatch(setReviews(adaptedData));
  };

/**
 * Действие запрашивает список фильмов "к просмотру"
 */
export const fetchFavoriteFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmAdaptedToServer[]>(APIRoute.Favorite);
    const adaptedFilms = data.map((film) => adaptFilmToClient(film));
    dispatch(setFavoriteFilms(adaptedFilms));
  };

/**
 * Действие отправляет комментарий на сервер
 */
export const submitReview = ({filmId, commentPost}: {commentPost: CommentPost, filmId: number}): ThunkActionResult =>
  async (dispatch, _getState, api) : Promise<void> => {
    const {data} = await api.post<ReviewAdaptedToServer[]>(
      replaceRouteParams(APIRoute.Comments, RouteParams.FILM_ID, filmId),
      commentPost,
    );
    const adaptedData = data.map((review) => adaptReviewToClient(review));
    dispatch(setReviews(adaptedData));
  };


/**
 * Действие запрашивает promo фильм с сервер
 */
export const fetchPromo = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<FilmAdaptedToServer>(APIRoute.Promo);
    const {backgroundImage, genre, name, id, released, posterImage} = adaptFilmToClient(data);

    dispatch(setPromo({genre, name, id, released, posterImage, backgroundImage}));
  };
