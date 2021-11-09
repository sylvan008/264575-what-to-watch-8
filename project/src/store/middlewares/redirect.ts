import {Middleware} from '@reduxjs/toolkit';
import {rootReducer} from '../root-reducer';
import {ActionType} from '../../types/action';
import {browserHistory} from '../../services/browser-history';

type Reducer = ReturnType<typeof rootReducer>;

/**
 * Middleware изменяет browserHistory для совершения перенаправления на переданный url
 */
export const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action) => {
  if (action.type === ActionType.RedirectToRoute) {
    browserHistory.push(action.payload);
  }
  return next(action);
};
