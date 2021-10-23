import {Film} from '../../types/film';
import {Review} from '../../types/review';

export type Promo = {
  name: string,
  genre: string,
  release: number,
}

export type PropsType = {
  promo: Promo,
  films: Film[],
  reviews: Review[],
}
