import {Film} from './film';

export type Promo = Pick<Film,
  | 'genre'
  | 'id'
  | 'name'
  | 'released'
  | 'posterImage'
  | 'backgroundImage'
  >;
