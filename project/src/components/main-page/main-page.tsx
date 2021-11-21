import {AppRoute, Genres, GENRES_COUNT_MAX, ResponseStatusCodes} from '../../utils/const';
import {useCallback, useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {State} from '../../types/state';
import {setGenre} from '../../store/action';
import {filterFilms, getNextFilmsCount} from '../../app';
import {getFilms, getPromo} from '../../store/app-data/selectors';
import {getCurrentGenre} from '../../store/film-process/selectors';
import GenresList from '../genres-list/genres-list';
import FilmsList from '../films-list/films-list';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import Promo from '../promo/promo';
import ShowMoreButton from '../show-more-button/show-more-button';
import UserBlock from '../user-block/user-block';
import Spinner from '../spinner/spinner';
import {ThunkAppDispatch} from '../../types/action';
import {submitPromoFavoriteStatus} from '../../store/api-action';
import {AxiosError} from 'axios';
import {browserHistory} from '../../services/browser-history';

const mapStateToProps = (state: State) => ({
  films: getFilms(state),
  activeGenre: getCurrentGenre(state),
  promo: getPromo(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeGenre(genre: Genres) {
    dispatch(setGenre(genre));
  },
  onChangePromoFavoriteStatus(filmId: number, status: number) {
    (dispatch as ThunkAppDispatch)(submitPromoFavoriteStatus(filmId, status))
      .catch((error: AxiosError) => {
        if (error.response?.status === ResponseStatusCodes.NotAuthorized) {
          browserHistory.push(AppRoute.Login);
        }
      });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

/**
 * Главная страница приложения. Состоит из:
 * - Промо материалы.
 * - Список жанров фильмов
 * - Список карточек фильмов. Зависит от выбранного жанра.
 * - Кнопка - "Show more". Зависит от показанных карточек фильмов.
 */
function MainPage(props: ConnectedComponentProps): JSX.Element {
  const {
    activeGenre,
    films,
    promo,
    onChangeGenre,
    onChangePromoFavoriteStatus,
  } = props;

  // const genres = Object.values(Genres) as Genres[];
  const uniqGenres = [...new Set(films.map((film) => film.genre))].sort();
  const genres = [
    Genres.AllGenres,
    ...uniqGenres,
  ]
    .slice(0, GENRES_COUNT_MAX) as Genres[];

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

  if (promo === null) {
    return <Spinner />;
  }

  return (
    <>
      <section className="film-card">
        <Promo
          promo={promo}
          onChangePromoFavoriteStatus={onChangePromoFavoriteStatus}
        >
          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>
        </Promo>
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
