import {NameSpace} from '../root-reducer';
import {AuthorizationStatus} from '../../utils/const';
import {State} from '../../types/state';
import {Film} from '../../types/film';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
export const getIsUserAuthorized = (state: State): boolean => state[NameSpace.user].authorizationStatus === AuthorizationStatus.Auth;
export const getFavoriteFilms = (state: State): Film[] => state[NameSpace.user].favoriteFilms;
