import {PropsType} from './types';
import {Genres} from '../../utils/const';
import {useCallback, useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {State} from '../../types/state';
import {setGenre} from '../../store/action';
import {filterFilms, getNextFilmsCount} from '../../app';
import {getFilms} from '../../store/app-data/selectors';
import {getCurrentGenre} from '../../store/film-process/selectors';
import GenresList from '../genres-list/genres-list';
import FilmsList from '../films-list/films-list';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import ShowMoreButton from '../show-more-button/show-more-button';
import UserBlock from '../user-block/user-block';

const mapStateToProps = (state: State) => ({
  films: getFilms(state),
  activeGenre: getCurrentGenre(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeGenre(genre: Genres) {
    dispatch(setGenre(genre));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux & PropsType;

/**
 * Главная страница приложения. Состоит из:
 * - Промо материалы.
 * - Список жанров фильмов
 * - Список карточек фильмов. Зависит от выбранного жанра.
 * - Кнопка - "Show more". Зависит от показанных карточек фильмов.
 */
function MainPage(props: ConnectedComponentProps): JSX.Element {
  const {promo, films, activeGenre, onChangeGenre} = props;
  const genres = Object.values(Genres) as Genres[];

  const [filteredFilms, setFilteredFilms] = useState(filterFilms(films, activeGenre));
  const [showFilmsCount, setShowFilmsCount] = useState(getNextFilmsCount(filteredFilms.length));
  const [isLoadMore, setIsLoadMore] = useState(showFilmsCount < filteredFilms.length);

  useEffect(() => {
    setFilteredFilms(() => filterFilms(films, activeGenre));
  }, [activeGenre, films]);

  useEffect(() => {
    setShowFilmsCount(getNextFilmsCount(filteredFilms.length));
  }, [filteredFilms, filteredFilms.length]);

  useEffect(() => {
    setIsLoadMore(showFilmsCount < filteredFilms.length);
  }, [showFilmsCount, filteredFilms.length]);

  const onLoadMore = useCallback(() => {
    setShowFilmsCount((filmsCount) => getNextFilmsCount(filteredFilms.length, filmsCount));
  }, [filteredFilms.length]);

  const genreChangeHandler = useCallback((genre) => {
    onChangeGenre(genre);
  }, [onChangeGenre]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="/img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promo.genre}</span>
                <span className="film-card__year">{promo.release}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            genres={genres}
            activeGenre={activeGenre}
            onChangeGenre={genreChangeHandler}
          />

          <FilmsList
            films={filteredFilms.slice(0, showFilmsCount)}
            render={isLoadMore && (() => <ShowMoreButton onLoadMore={onLoadMore} />)}
          />
        </section>

        <Footer />
      </div>
    </>
  );
}

export {MainPage};
export default connector(MainPage);
