import {PropsType} from './types';
import {Genres} from '../../utils/const';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import {setGenre} from '../../store/action';
import GenresList from '../genres-list/genres-list';
import FilmsList from '../films-list/films-list';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import {filterFilms} from '../../app';

function mapStateToProps({films, genre}: State) {
  return {
    films,
    activeGenre: genre,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    onChangeGenre(genre: Genres) {
      dispatch(setGenre(genre));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux & PropsType;

function MainPage(props: ConnectedComponentProps): JSX.Element {
  const {promo, films, activeGenre, onChangeGenre} = props;
  const genres = Object.values(Genres) as Genres[];

  const showFilms = filterFilms(films, activeGenre);

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

          <GenresList genres={genres} activeGenre={activeGenre} onChangeGenre={onChangeGenre} />

          <FilmsList films={showFilms} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export {MainPage};
export default connector(MainPage);
