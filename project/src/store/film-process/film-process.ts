import {Actions, ActionType} from '../../types/action';
import {Genres} from '../../utils/const';
import {FilmProcess} from '../../types/state';

const initialState: FilmProcess = {
  genre: Genres.AllGenres,
  film: null,
  reviews: [],
  similarFilms: [],
};

const filmProcess = (state = initialState, action: Actions): FilmProcess => {
  switch (action.type) {
    case ActionType.SetGenre:
      return {...state, genre: action.payload};
    case ActionType.SetFilm:
      return {...state, film: action.payload};
    case ActionType.SetSimilarFilms:
      return {...state, similarFilms: action.payload};
    case ActionType.SetReviews:
      return {...state, reviews: action.payload};
    default:
      return state;
  }
};

export {filmProcess};
