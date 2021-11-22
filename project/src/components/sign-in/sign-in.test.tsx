import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {createMemoryHistory} from 'history';
import {State} from '../../types/state';
import {NameSpace} from '../../store/root-reducer';
import {AuthorizationStatus, Genres} from '../../utils/const';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {TestId} from '../../utils/mocks/testing-const';
import SignIn from './sign-in';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, unknown, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.user]: {authorizationStatus: AuthorizationStatus.NoAuth},
});

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <SignIn />
    </Router>
  </Provider>
);

describe('Component: SignIn', () => {
  const emailPlaceholderRegexp = /email address/i;
  const passwordPlaceholderRegexp = /password/i;

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByPlaceholderText(emailPlaceholderRegexp)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordPlaceholderRegexp)).toBeInTheDocument();
    expect(screen.getByTestId(TestId.SignIn)).toBeInTheDocument();
  });

  it('should input correct', () => {
    const emailFake = 'fake@mail.ru';
    const passwordFake = 'secret111';

    render(fakeApp);

    const emailInput = screen.getByPlaceholderText(emailPlaceholderRegexp);
    userEvent.type(emailInput, emailFake);
    expect(emailInput).toHaveValue(emailFake);

    const passwordInput = screen.getByPlaceholderText(passwordPlaceholderRegexp);
    userEvent.type(passwordInput, passwordFake);
    expect(passwordInput).toHaveValue(passwordFake);
  });
});
