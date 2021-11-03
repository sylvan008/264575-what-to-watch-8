import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {AuthorizationStatus, Genres} from '../utils/const';

const initialState: State = {
  authorizationStatus: AuthorizationStatus.Unknown,
  genre: Genres.AllGenres,
  film: null,
  films: [],
  isDataLoaded: false,
  reviews: [],
  similarFilms: [],
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.SetGenre:
      return {...state, genre: action.payload};
    case ActionType.SetFilm:
      return {...state, film: action.payload};
    case ActionType.SetSimilarFilms:
      return {...state, similarFilms: action.payload};
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
