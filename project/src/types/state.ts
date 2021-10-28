import {Film} from './film';
import {AuthorizationStatus, Genres} from '../utils/const';
import {Review} from './review';

export type State = {
  genre: Genres,
  films: Film[],
  reviews: Review[],
  authorizationStatus: AuthorizationStatus,
}
