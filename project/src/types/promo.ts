import {Film} from './film';

export type Promo = Pick<Film,
  | 'genre'
  | 'id'
  | 'isFavorite'
  | 'name'
  | 'released'
  | 'posterImage'
  | 'backgroundImage'
  >;
