import {ActionType} from '../types/action';
import {Film} from '../types/film';
import {AuthorizationStatus, Genres} from '../utils/const';

function setGenre(genre: Genres) {
  return ({
    type: ActionType.SetGenre,
    payload: genre,
  } as const);
}

function setFilms(films: Film[]) {
  return ({
    type: ActionType.SetFilms,
    payload: films,
  } as const);
}

function requireAuthorization(authorizationStatus: AuthorizationStatus) {
  return ({
    type: ActionType.RequireAuthorization,
    payload: authorizationStatus,
  } as const);
}

function requireLogout() {
  return ({
    type: ActionType.RequireLogout,
    payload: AuthorizationStatus.NoAuth,
  } as const);
}

export {
  setGenre,
  setFilms,
  requireAuthorization,
  requireLogout
};
