import {Item} from './item';

type User = Item & {
  name: string,
}

export type Review = Item & {
  user: User,
  rating: number,
  comment: string,
  date: Date
}
