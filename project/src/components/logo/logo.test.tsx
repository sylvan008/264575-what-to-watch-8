import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {Route, Router} from 'react-router-dom';
import {AppRoute} from '../../utils/const';
import Logo from './logo';

const MAIN_PAGE = 'Main page';
const MAIN_PAGE_URL = '/';
const START_PAGE_URL = '/fake';

const history = createMemoryHistory();

const fakeApp = (
  <Router history={history}>
    <Route exact path={MAIN_PAGE_URL}>
      <>
        <p>{MAIN_PAGE}</p>
      </>
    </Route>
    <Route>
      <Logo />
    </Route>
  </Router>
);

const logoRegexp = /^W|T|W$/i;
const fakeMainPageRegexp = new RegExp(MAIN_PAGE, 'i');

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getAllByText(logoRegexp)).toHaveLength(3);
  });

  it('should link to main page', () => {
    render(fakeApp);
    history.push(START_PAGE_URL);

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(fakeMainPageRegexp)).toBeInTheDocument();
  });
});
