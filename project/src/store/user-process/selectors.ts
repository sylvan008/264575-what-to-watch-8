import {NameSpace} from '../root-reducer';
import {AuthorizationStatus} from '../../utils/const';
import {State} from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
export const getIsUserAuthorized = (state: State): boolean => state[NameSpace.user].authorizationStatus === AuthorizationStatus.Auth;
