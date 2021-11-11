import {userProcess} from './user-process';
import {AuthorizationStatus, UNKNOWN_ACTION} from '../../utils/const';
import {UserProcess} from '../../types/state';
import {ActionType} from '../../types/action';

describe('Reducer: userProcess', () => {
  let initialState: UserProcess;

  beforeAll(() => {
    initialState = {authorizationStatus: AuthorizationStatus.Unknown};
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess(void null, {type: UNKNOWN_ACTION}))
      .toEqual(initialState);
  });

  it('should update authorization status to "AUTH"', () => {
    const requireAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: AuthorizationStatus.Auth,
    };

    expect(userProcess(initialState, requireAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update authorization status to "NO_AUTH"', () => {
    const requireLogoutAction = {type: ActionType.RequireLogout};

    expect(userProcess(initialState, requireLogoutAction))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
