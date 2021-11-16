import {FilmProcess} from '../../types/state';
import {Genres, UNKNOWN_ACTION} from '../../utils/const';
import {filmProcess} from './film-process';
import {ActionType} from '../../types/action';
import {createMockFilm} from '../../utils/mocks/create-mock-film';
import {createMockReview} from '../../utils/mocks/mock-review';

describe('Reducer: filmProcess', () => {
  let initialState: FilmProcess;

  beforeAll(() => {
    initialState = {
      genre: Genres.AllGenres,
      film: null,
      similarFilms: [],
      reviews: [],
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmProcess(void null, {type: UNKNOWN_ACTION}))
      .toEqual(initialState);
  });

  it('should update genre', () => {
    const genreAction = {
      type: ActionType.SetGenre,
      payload: Genres.Crime,
    };

    expect(filmProcess(initialState, genreAction))
      .toEqual({
        ...initialState,
        genre: Genres.Crime,
      });
  });

  it('should update film', () => {
    const film = createMockFilm();
    const genreAction = {
      type: ActionType.SetFilm,
      payload: film,
    };

    expect(filmProcess(initialState, genreAction))
      .toEqual({
        ...initialState,
        film,
      });
  });

  it('should update similarFilms', () => {
    const similarFilms = [createMockFilm(), createMockFilm(), createMockFilm()];
    const genreAction = {
      type: ActionType.SetSimilarFilms,
      payload: similarFilms,
    };

    expect(filmProcess(initialState, genreAction))
      .toEqual({
        ...initialState,
        similarFilms,
      });
  });

  it('should update reviews', () => {
    const reviews = [createMockReview(), createMockReview(), createMockReview()];
    const reviewsAction = {
      type: ActionType.SetReviews,
      payload: reviews,
    };

    expect(filmProcess(initialState, reviewsAction))
      .toEqual({
        ...initialState,
        reviews,
      });
  });
});
