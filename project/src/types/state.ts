import {Film} from './film';
import {AuthorizationStatus, Genres} from '../utils/const';
import {Review} from './review';

export type AppData = {
  films: Film[],
  isDataLoaded: boolean,
}

export type FilmProcess = {
  genre: Genres,
  film: Film | null,
  reviews: Review[],
  similarFilms: Film[],
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
}
