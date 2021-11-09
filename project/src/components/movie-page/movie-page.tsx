import {Dispatch} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {AxiosError} from 'axios';
import {AppRoute, ResponseStatusCodes, RouteParams} from '../../utils/const';
import {fetchFilm, fetchReviews, fetchSimilarFilms} from '../../store/api-action';
import {browserHistory} from '../../services/browser-history';
import {State} from '../../types/state';
import {Actions, ThunkAppDispatch} from '../../types/action';
import {getFilm, getReviews, getSimilarFilms} from '../../store/film-process/selectors';
import {getIsUserAuthorized} from '../../store/user-process/selectors';
import FilmsList from '../films-list/films-list';
import Footer from '../footer/footer';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';
import Logo from '../logo/logo';
import Spinner from '../spinner/spinner';
import Tabs from '../tabs/tabs';
import UserBlock from '../user-block/user-block';

const SIMILAR_MOVIE_COUNT = 4;

const mapStateToProps = (state: State) => ({
  isUserAuthorized: getIsUserAuthorized(state),
  film: getFilm(state),
  reviews: getReviews(state),
  similarFilms: getSimilarFilms(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  loadFilm(filmId: number) {
    return (dispatch as ThunkAppDispatch)(fetchFilm(filmId))
      .catch((error: AxiosError) => {
        if (error.response?.status === ResponseStatusCodes.NotFound) {
          browserHistory.push(AppRoute.NotFound);
        }
      });
  },
  loadSimilarFilms(filmId: number) {
    (dispatch as ThunkAppDispatch)(fetchSimilarFilms(filmId));
  },
  loadReviews(filmId: number) {
    (dispatch as ThunkAppDispatch)(fetchReviews(filmId));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type params = {
  id: string,
}

function MoviePage({isUserAuthorized, film, loadFilm, loadSimilarFilms, loadReviews, reviews, similarFilms}: PropsFromRedux): JSX.Element {
  const {id}: params = useParams();

  useEffect(() => {
    const filmId = Number(id);
    loadFilm(filmId)
      .then(() => {
        loadSimilarFilms(filmId);
        loadReviews(filmId);
      });
  }, [id, loadFilm]);

  if (!film) {
    return <Spinner />;
  }

  const {backgroundImage, genre, name, released, posterImage} = film;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
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
                {isUserAuthorized &&
                  <Link to={AppRoute.AddReview.replace(RouteParams.ID, id)} className="btn film-card__button">
                    Add review
                  </Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <Tabs>
                <FilmOverview film={film} label="Overview" />
                <FilmDetails film={film} label="Details" />
                <FilmReviews reviews={reviews} label="Reviews" />
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms.slice(0, SIMILAR_MOVIE_COUNT)} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export {MoviePage};
export default connector(MoviePage);
