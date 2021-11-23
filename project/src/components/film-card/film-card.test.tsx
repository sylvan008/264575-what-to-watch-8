import {render, screen} from '@testing-library/react';
import {createMockFilm} from '../../utils/mocks/create-mock-film';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {TestId} from '../../utils/mocks/testing-const';
import FilmCard from './film-card';
import userEvent from '@testing-library/user-event';
import {PREVIEW_TIMEOUT} from '../../utils/const';

const history = createMemoryHistory();
const filmMock = createMockFilm();
const onUpdateCard = jest.fn();
const browserHistory = {push: jest.fn()};
const fakeCardVideoElement = jest.mock(
  '../video-player/video-player',
  () => <video src="#" data-testid={TestId.VideoPlayer}/>
);

const fakeUp = (filmComponent: JSX.Element) => (
  <Router history={history}>
    {filmComponent}
  </Router>
);

const filmNameRegexp = new RegExp(filmMock.name.toLowerCase(), 'i');

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    render(fakeUp(<FilmCard film={filmMock} updateActiveCard={onUpdateCard} />));

    // проверяет наличе ссылки с именем фильма
    expect(screen.getByText(filmNameRegexp)).toBeInTheDocument();
    // проверяет наличие изображения
    expect(screen.getByAltText(filmNameRegexp)).toBeInTheDocument();
  });

  it('should render video element', () => {
    render(fakeUp(<FilmCard film={filmMock} updateActiveCard={onUpdateCard} playPreview={true} />));

    expect(screen.getByTestId(TestId.VideoPlayer)).toBeInTheDocument();
  });

  it('should callback on mouse hover', async () => {
    render(fakeUp(<FilmCard film={filmMock} updateActiveCard={onUpdateCard} playPreview={true} />));

    const filmCard = screen.getByText(filmNameRegexp);
    userEvent.hover(filmCard);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, PREVIEW_TIMEOUT);
    });

    expect(onUpdateCard).toBeCalled();

    userEvent.unhover(filmCard);
    expect(onUpdateCard).toBeCalledTimes(2);
  });
});
