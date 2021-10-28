import {Film} from './film';
import {AuthorizationStatus, Genres} from '../utils/const';

export type State = {
  genre: Genres,
  films: Film[],
  authorizationStatus: AuthorizationStatus,
}
