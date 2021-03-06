import {useCallback, useState} from 'react';
import {PropsType} from './types';
import FilmCard from '../film-card/film-card';
import { updateActiveFilm } from '../../types/film';

/**
 * Отображает список карточек фильмов.
 * Реализует renderProps для возможного добавления дополнительной функциональности.
 */
function FilmsList({films, render}: PropsType): JSX.Element {
  const [activeCard, setActiveCard] = useState<number|null>(null);
  const updateActiveCard: updateActiveFilm = useCallback(
    (id) => setActiveCard(id),
    [activeCard],
  );

  return (
    <>
      <div className="catalog__films-list">
        {films.map((film) =>(
          <FilmCard
            film={film}
            key={`${film.id}-${film.name}`}
            updateActiveCard={updateActiveCard}
            playPreview={activeCard === film.id}
          />
        ))}
      </div>
      {render && render()}
    </>
  );
}

export default FilmsList;
