import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {createMockFilm} from '../../utils/mocks/create-mock-film';
import FilmsList from './films-list';

const history = createMemoryHistory();

const filmsListMock = [createMockFilm(), createMockFilm(), createMockFilm()];
const filmsNameRegExp = new RegExp(filmsListMock.map((film) => film.name).join('|'));

const fakeApp = (
  <Router history={history}>
    <FilmsList films={filmsListMock} />
  </Router>
);

describe('Component: FilmsList', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getAllByText(filmsNameRegExp)).toHaveLength(filmsListMock.length);
  });
});
