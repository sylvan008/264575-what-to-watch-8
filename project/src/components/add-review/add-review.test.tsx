import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import {Route, Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import {State} from '../../types/state';
import {NameSpace} from '../../store/root-reducer';
import {createApi} from '../../services/api';
import {createMockFilm} from '../../utils/mocks/create-mock-film';
import {APIRoute, AuthorizationStatus, RouteParams} from '../../utils/const';
import {replaceRouteParams} from '../../utils/common';
import {createMockReview} from '../../utils/mocks/mock-review';
import AddReview from './add-review';

const mockFilm = createMockFilm();
const history = createMemoryHistory();
const onMockAuthorization = jest.fn();
const api = createApi(onMockAuthorization);
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, unknown, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.user]: {authorizationStatus: AuthorizationStatus.Auth},
  [NameSpace.film]: {film: mockFilm},
});

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <AddReview />
    </Router>
  </Provider>
);

describe('Component: AddReview', () => {
  const linkTextRegexp = /Add commentPost/i;
  const reviewPlaceHolderRegexp = /review text/i;
  const postButtonRegexp = /^post/i;

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(linkTextRegexp)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(reviewPlaceHolderRegexp)).toBeInTheDocument();
    expect(screen.getByText(postButtonRegexp)).toBeInTheDocument();
  });

  it('should input correctly', () => {
    const mockReview = createMockReview();
    const commentText = mockReview.comment;

    render(fakeApp);

    const commentInput = screen.getByPlaceholderText(reviewPlaceHolderRegexp);
    userEvent.type(commentInput, commentText);
    expect(commentInput).toHaveValue(commentText);
  });
});
