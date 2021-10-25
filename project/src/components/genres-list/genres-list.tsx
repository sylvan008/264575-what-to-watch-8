import {MouseEvent} from 'react';
import {PropsType} from './types';

const ACTIVE_CLASS = 'catalog__genres-item--active';

/**
 * Выводит список жанров для фильтрации фильмов по выбранному жанру.
 */
function GenresList({genres, activeGenre, onChangeGenre}: PropsType): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          className={['catalog__genres-item', genre === activeGenre ? ACTIVE_CLASS : ''].join(' ')}
          key={genre}
        >
          <a href="#" className="catalog__genres-link" onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            onChangeGenre(genre);}}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
