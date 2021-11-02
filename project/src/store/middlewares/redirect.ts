import {Middleware} from '@reduxjs/toolkit';
import {reducer} from '../reducer';
import {ActionType} from '../../types/action';
import {browserHistory} from '../../services/browser-history';

type Reducer = ReturnType<typeof reducer>;

/**
 * Middleware изменяет browserHistory для совершения перенаправления на переданный url
 */
export const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action) => {
  if (action.type === ActionType.RedirectToRoute) {
    browserHistory.push(action.payload);
  }
  return next(action);
};