import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import Footer from './footer';

const history = createMemoryHistory();

const fakeApp = (
  <Router history={history}>
    <Footer />
  </Router>
);

const footerRegexp = /What to watch Ltd/i;

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(footerRegexp)).toBeInTheDocument();
  });
});
