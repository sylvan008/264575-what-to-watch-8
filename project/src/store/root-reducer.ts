import {combineReducers} from 'redux';
import {appData} from './app-data/app-data';
import {filmProcess} from './film-process/film-process';
import {userProcess} from './user-process/user-process';

export enum NameSpace {
  data = 'DATA',
  film = 'FILM',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: appData,
  [NameSpace.film]: filmProcess,
  [NameSpace.user]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
