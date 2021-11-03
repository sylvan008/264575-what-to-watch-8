import {AuthData} from '../types/auth';
import {Film} from '../types/film';
import {ThunkActionResult} from '../types/action';
import {APIRoute, AppRoute, AuthorizationStatus, RouteParams} from '../utils/const';
import {
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setFilm,
  setFilms,
  setReviews,
  setSimilarFilms,
} from './action';
import {dropToken, saveToken, Token} from '../services/token';
import {adaptFilmToClient} from '../utils/api';
import {Item} from '../types/item';
import {Review} from '../types/review';

/**
 * Запрос списка фильмов
 */
export const fetchFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
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
    const {data} = await api.get<Film>(APIRoute.Film.replace(RouteParams.ID, filmId.toString()));
    dispatch(setFilm(data));
  };

/**
 * Действие запрашивает схожие фильмы с сервера
 */
export const fetchSimilarFilms = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.SimilarFilms.replace(RouteParams.ID, filmId.toString()));
    dispatch(setSimilarFilms(data));
  };

/**
 * Действие запрашивает комментарии к фильму с сервера
 */
export const fetchComments = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Review[]>(APIRoute.Comments.replace(RouteParams.FILM_ID, filmId.toString()));
    dispatch(setReviews(data));
  };

/**
 * Действие отправляет комментарий на сервер
 */
export const submitReview = ({filmId, review}: {review: Review, filmId: number}): ThunkActionResult =>
  async (dispatch, _getState, api) : Promise<void> => {
    const {data} = await api.post<Review[]>(APIRoute.Comments.replace(RouteParams.FILM_ID, filmId.toString()), review);
    dispatch(setReviews(data));
  };
