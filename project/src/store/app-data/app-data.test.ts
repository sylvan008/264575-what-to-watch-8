import {AppData} from '../../types/state';
import {UNKNOWN_ACTION} from '../../utils/const';
import {appData} from './app-data';
import {createMockFilm} from '../../utils/mocks/create-mock-film';
import {ActionType} from '../../types/action';

describe('Reducer: appData', () => {
  let initialState: AppData;

  beforeAll(() => {
    initialState = {
      films: [],
      isDataLoaded: false,
      promo: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(appData(void null, {type: UNKNOWN_ACTION}))
      .toEqual(initialState);
  });

  it('should update app data', () => {
    const films = [createMockFilm(), createMockFilm(), createMockFilm()];
    const filmsAction = {
      type: ActionType.SetFilms,
      payload: films,
    };

    expect(appData(initialState, filmsAction))
      .toEqual({
        ...initialState,
        films,
        isDataLoaded: false,
      });
  });
});
