import {PropsType} from './types';
import FilmCard from '../film-card/film-card';

function FilmsList({films}: PropsType): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard film={film} key={`${film.id}-${film.name}`} />)}
    </div>
  );
}

export default FilmsList;
