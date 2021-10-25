import {State} from '../types/state';
import {Actions, ActionType} from '../types/action';
import {Genres} from '../utils/const';
import {filmsMock} from '../mocks/film';

const initialState = {
  genre: Genres.AllGenres,
  films: filmsMock,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.SetGenre:
      return {...state, genre: action.payload};
    case ActionType.SetFilms:
      return {...state, films: action.payload};
    default:
      return state;
  }
}
