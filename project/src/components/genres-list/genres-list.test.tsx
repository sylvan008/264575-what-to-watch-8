import {render, screen} from '@testing-library/react';
import GenresList from './genres-list';
import {Genres} from '../../utils/const';

const LINK_ROLE = 'link';

describe('Component: GenresList', () => {
  const onChangeGenreMock = jest.fn();
  const activeGenre = Genres.Crime;
  const genres = Object.values(Genres);

  it('show render correctly', () => {
    render(<GenresList genres={genres} activeGenre={activeGenre} onChangeGenre={onChangeGenreMock} />);

    const genreElements = screen.getAllByRole(LINK_ROLE);
    expect(genreElements).toHaveLength(genres.length);
  });
});
