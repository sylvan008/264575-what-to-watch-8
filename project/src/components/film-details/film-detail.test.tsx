import {render, screen} from '@testing-library/react';
import FilmDetails from './film-details';
import {createMockFilm} from '../../utils/mocks/create-mock-film';
import {humanizeRuntime} from '../../utils/common';

const STARRING_REGEXP = /starring/i;

describe('Component: FilmDetail', () => {
  const labelFake = 'label 1';
  const filmFake = createMockFilm();
  const {director, genre, released, runTime, starring} = filmFake;
  const humanizedRuntime = humanizeRuntime(runTime);

  it('show render correctly', () => {
    const starringRegexp = new RegExp(starring[0], 'i')

    render(<FilmDetails label={labelFake} film={filmFake} />);

    expect(screen.getByText(director)).toBeInTheDocument();
    expect(screen.getByText(genre)).toBeInTheDocument();
    expect(screen.getByText(released)).toBeInTheDocument();
    expect(screen.getByText(humanizedRuntime)).toBeInTheDocument();
    expect(screen.getByText(starringRegexp)).toBeInTheDocument();
  });
});
