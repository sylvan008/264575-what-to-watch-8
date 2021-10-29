import {Item} from './item';

export type AuthData = {
  email: string,
  password: string,
}

export type AuthInfo = Item & {
  email: string,
  name: string,
  avatarUrl: string,
  token: string,
}
