import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from '@reduxjs/toolkit';
import {AppRoute, RouteParams} from '../../utils/const';
import {Actions, ThunkAppDispatch} from '../../types/action';
import {CommentPost} from '../../types/review';
import {UrlParams} from '../../types/url-params';
import {State} from '../../types/state';
import {fetchFilm, submitReview} from '../../store/api-action';
import {validateTextLength} from '../../utils/validation';
import Logo from '../logo/logo';
import RatingInput from '../rating-input/rating-input';
import Spinner from '../spinner/spinner';
import UserBlock from '../user-block/user-block';

const RATING_DEFAULT = '8';
const RATING_MAX = 10;
const RATING_MIN = 1;

function mapStateToProps({authorizationStatus, film}: State) {
  return {
    authorizationStatus,
    film,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    reviewSubmitHandler(submitData: {filmId: number, commentPost: CommentPost}) {
      return (dispatch as ThunkAppDispatch)(submitReview(submitData));
    },
    loadFilm(filmId: number) {
      (dispatch as ThunkAppDispatch)(fetchFilm(filmId));
    },
  };
}

const connected = connect(mapStateToProps, mapDispatchToProps);
type PropsFormRedux = ConnectedProps<typeof connected>;

/**
 * Компонент формы отправки отзыва о фильме
 */
function AddReview({film, loadFilm, reviewSubmitHandler}: PropsFormRedux):JSX.Element {
  const {id}: UrlParams = useParams();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(RATING_DEFAULT);
  const [isReviewValid, setIsReviewValid] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  useEffect(() => {
    const filmId = Number(id);
    loadFilm(filmId);
  }, [id]);

  if (!film) {
    return <Spinner />;
  }

  const {id: filmId, name, posterImage, backgroundImage} = film;

  function createRatingInputs() {
    const ratings = [];
    for (let i = RATING_MAX; i >= RATING_MIN; i--) {
      ratings.push((
        <RatingInput
          ratingValue={`${i}`}
          changeRating={onChangeRating}
          key={`rating${i}`}
          checked={rating === `${i}`}
          disabled={isFormSubmit}
        />
      ));
    }
    return ratings;
  }

  function onChangeRating(e: ChangeEvent<HTMLInputElement>) {
    setRating(e.target.value);
  }

  function onChangeReview(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    setReview(text);
    setIsReviewValid(validateTextLength(text.trim()));
  }

  function onReviewSubmit(e: FormEvent) {
    e.preventDefault();
    if (isFormSubmit) {
      return;
    }
    if (!isReviewValid) {
      return;
    }

    setIsFormSubmit(true);
    reviewSubmitHandler({
      filmId,
      commentPost: {
        rating: Number(rating),
        comment: review.trim(),
      },
    })
      .then(() => {
        setReview('');
        setRating(RATING_DEFAULT);
        setIsReviewValid(false);
        setIsFormSubmit(false);
      });
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film.replace(RouteParams.ID, `${id}`)} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={'./'} className="breadcrumbs__link">Add commentPost</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={onReviewSubmit}
        >
          <div className="rating">
            <div className="rating__stars">
              {createRatingInputs()}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              value={review}
              onChange={onChangeReview}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              disabled={isFormSubmit}
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={!isReviewValid || isFormSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export {AddReview};
export default connected(AddReview);
