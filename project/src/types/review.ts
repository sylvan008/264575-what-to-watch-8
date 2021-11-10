import {Item} from './item';
import {FilmRating} from '../utils/const';

type User = Item & {
  name: string,
}

export type CommentPost = {
  rating: number,
  comment: string,
}

export type Review = Item & CommentPost & {
  user: User,
  date: Date,
}

export type NormalizedRating = keyof typeof FilmRating;
