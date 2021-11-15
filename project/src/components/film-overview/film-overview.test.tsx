import {render, screen} from '@testing-library/react';
import {createMockFilm} from '../../utils/mocks/create-mock-film';
import FilmDetails from '../film-details/film-details';
import {humanizeRuntime} from '../../utils/common';
import FilmOverview from './film-overview';

describe('Component: FilmOverview', () => {
  const labelMock = 'label 1';
  const filmMock = createMockFilm();
  const {rating, director, starring, description, scoresCount} = filmMock;
  const starringRegexp = new RegExp(starring[0] + '?', 'i');
  const scoresCountRegexp = new RegExp(scoresCount + '?');

  it('show render correctly', () => {
    render(<FilmOverview label={labelMock} film={filmMock} />);

    expect(screen.getByText(rating)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(director, 'i'))).toBeInTheDocument();
    expect(screen.getByText(starringRegexp)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(scoresCountRegexp)).toBeInTheDocument();
  });
});
