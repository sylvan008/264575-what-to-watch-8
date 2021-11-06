import {Item} from './item';

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
