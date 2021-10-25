import {Film} from './film';
import {Genres} from '../utils/const';

export type State = {
  genre: Genres,
  films: Film[],
}
