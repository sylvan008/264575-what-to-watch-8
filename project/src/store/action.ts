import {ActionType} from '../types/action';
import {Film} from '../types/film';
import {AuthorizationStatus, Genres} from '../utils/const';
import {Review} from '../types/review';

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

function setReviews(reviews: Review[]) {
  return ({
    type: ActionType.SetReviews,
    payload: reviews,
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
  setReviews,
  requireAuthorization,
  requireLogout
};
