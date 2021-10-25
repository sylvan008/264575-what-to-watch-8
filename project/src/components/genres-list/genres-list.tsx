import {PropsType} from './types';

const ACTIVE_CLASS = 'catalog__genres-item--active';

function GenresList({genres, activeGenre}: PropsType): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          className={['catalog__genres-item', genre === activeGenre ? ACTIVE_CLASS : ''].join(' ')}
          key={genre}
        >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
