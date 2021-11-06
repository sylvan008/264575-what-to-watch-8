import {Film} from './film';
import {AuthorizationStatus, Genres} from '../utils/const';
import {Review} from './review';

export type State = {
  authorizationStatus: AuthorizationStatus,
  genre: Genres,
  film: Film | null,
  films: Film[],
  isDataLoaded: boolean,
  reviews: Review[],
  similarFilms: Film[],
}
