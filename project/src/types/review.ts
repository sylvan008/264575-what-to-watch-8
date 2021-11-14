import {Item} from './item';
import {FilmRating} from '../utils/const';

type User = Item & {
  name: string,
}

export type CommentPost = {
  rating: number,
  comment: string,
}

export type ReviewAdaptedToServer = Item & CommentPost & {
  user: User,
  date: string,
}

export type Review = Omit<ReviewAdaptedToServer, 'date'> & {
  date: Date,
}

export type NormalizedRating = keyof typeof FilmRating;
