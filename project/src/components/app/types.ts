import {Film} from '../../types/film';

export type Promo = {
  name: string,
  genre: string,
  release: number,
}

export type PropsType = {
  promo: Promo,
  films: Film[],
}
