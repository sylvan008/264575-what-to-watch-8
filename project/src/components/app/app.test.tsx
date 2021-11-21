import {Router} from 'react-router-dom';
import {Action} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {NameSpace} from '../../store/root-reducer';
import {APIRoute, AppRoute, AuthorizationStatus, Genres, RouteParams} from '../../utils/const';
import {createMockFilm} from '../../utils/mocks/create-mock-film';
import {replaceRouteParams} from '../../utils/common';
import {State} from '../../types/state';
import App from './app';

const mockFilm = createMockFilm();
const middlewares = [thunk];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, unknown, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.user]: {authorizationStatus: AuthorizationStatus.NoAuth},
  [NameSpace.film]: {
    genre: Genres.AllGenres,
    film: mockFilm,
    reviews: [],
    similarFilms: [],
  },
  [NameSpace.data]: {
    isDataLoaded: true,
    films: [],
    promo: mockFilm,
  },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application routing', () => {
  it(`should render "Main" page when user navigate to "${AppRoute.Main}"`, () => {
    const mainPageRegexp = /wtw/i;
    const catalogRegexp = /catalog/i;

    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(mainPageRegexp)).toBeInTheDocument();
    expect(screen.getByText(catalogRegexp)).toBeInTheDocument();
  });

  it(`should render "SignIn" when user navigate "${AppRoute.Login}"`, () => {
    const emailLabelRegexp = /email address/i;
    const passwordLabelRegexp = /password/i;
    const headRegexp = /sign in/i;

    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getAllByText(headRegexp)).toHaveLength(2);
    expect(screen.getByLabelText(emailLabelRegexp)).toBeInTheDocument();
    expect(screen.getByLabelText(passwordLabelRegexp)).toBeInTheDocument();
  });

  it(`should render "MoviePage" when user navigate ${AppRoute.Film}`, () => {
    const nameRegexp = new RegExp(mockFilm.name, 'i');

    history.push(replaceRouteParams(APIRoute.Film, RouteParams.ID, mockFilm.id));
    render(fakeApp);

    expect(screen.getByText(nameRegexp)).toBeInTheDocument();
  });
});
