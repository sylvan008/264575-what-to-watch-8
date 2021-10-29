import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, Genres} from '../utils/const';

const initialState: State = {
  genre: Genres.AllGenres,
  films: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.SetGenre:
      return {...state, genre: action.payload};
    case ActionType.SetFilms:
      return {...state, films: action.payload};
    case ActionType.SetReviews:
      return {...state, reviews: action.payload};
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
}
