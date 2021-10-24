import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {Genres} from '../utils/const';

const initialState = {
  genre: Genres.AllGenres,
  films: [],
};

export function reducer(state: State = initialState, action: Actions) {
  switch (action.type) {
    case ActionType.SetGenre:
      return {...state, genre: action.payload};
    case ActionType.SetFilms:
      return {...state, films: action.payload};
    default:
      return state;
  }
}
