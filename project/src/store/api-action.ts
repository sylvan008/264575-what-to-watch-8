import {AuthData} from '../types/auth';
import {Film} from '../types/film';
import {ThunkActionResult} from '../types/action';
import {APIRoute, AppRoute, AuthorizationStatus} from '../utils/const';
import {redirectToRoute, requireAuthorization, requireLogout, setFilms} from './action';
import {dropToken, saveToken, Token} from '../services/token';
import {adaptFilmToClient} from '../utils/api';

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
