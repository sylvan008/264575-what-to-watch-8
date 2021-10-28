import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, Genres} from '../utils/const';
import {filmsMock} from '../mocks/film';

const initialState: State = {
  genre: Genres.AllGenres,
  films: filmsMock,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.SetGenre:
      return {...state, genre: action.payload};
    case ActionType.SetFilms:
      return {...state, films: action.payload};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
}
