import {Film} from './film';
import {AuthorizationStatus, Genres} from '../utils/const';
import {Review} from './review';
import {RootState} from '../store/root-reducer';
import {Promo} from './promo';

export type AppData = {
  films: Film[],
  isDataLoaded: boolean,
  promo: Promo | null,
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

export type State = RootState;
