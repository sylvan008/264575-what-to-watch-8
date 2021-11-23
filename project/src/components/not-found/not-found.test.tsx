import {getByRole, render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Route, Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NotFound from './not-found';

const MAIN_PAGE = 'Main page';

const MAIN_PAGE_PATH = '/';
const NOT_FOUND_PAGE_PATH = '/404';

const history = createMemoryHistory();
const fakeApp = (
  <Router history={history}>
    <Route exact path={MAIN_PAGE_PATH}>
      <p>Main page</p>
    </Route>
    <Route exact path={NOT_FOUND_PAGE_PATH}>
      <NotFound />
    </Route>
  </Router>
);

const notFoundRegexp = /404 Not Found/i;
const mainPageRegexp = new RegExp(MAIN_PAGE, 'i');

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    render(fakeApp);

    history.push(NOT_FOUND_PAGE_PATH);

    expect(screen.getByText(notFoundRegexp)).toBeInTheDocument();
  });

  it('should link to main page', () => {
    render(fakeApp);

    history.push(NOT_FOUND_PAGE_PATH);

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(mainPageRegexp)).toBeInTheDocument();
  });
});
