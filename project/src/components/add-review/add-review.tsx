import {FormEvent, useCallback, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AxiosError} from 'axios';
import {browserHistory} from '../../services/browser-history';
import {AppRoute, ResponseStatusCodes, RouteParams} from '../../utils/const';
import {ThunkAppDispatch} from '../../types/action';
import {CommentPost} from '../../types/review';
import {UrlParams} from '../../types/url-params';
import {fetchFilm, submitReview} from '../../store/api-action';
import {useUserReview} from '../../hooks/use-user-review';
import {getFilm} from '../../store/film-process/selectors';
import Logo from '../logo/logo';
import RatingInputs from '../rating-inputs/rating-inputs';
import Spinner from '../spinner/spinner';
import UserBlock from '../user-block/user-block';

/**
 * Компонент формы отправки отзыва о фильме
 */
function AddReview():JSX.Element {
  const dispatch: ThunkAppDispatch = useDispatch();
  const film = useSelector(getFilm);

  const reviewSubmitHandler = (submitData: {filmId: number, commentPost: CommentPost}) => dispatch(submitReview(submitData));

  const {id}: UrlParams = useParams();
  const [
    isFormSubmit,
    isReviewValid,
    review,
    rating,
    handleRatingChange,
    handleReviewChange,
    handleSubmitChange,
  ] = useUserReview(reviewSubmitHandler);

  useEffect(() => {
    const filmId = Number(id);
    dispatch(fetchFilm(filmId))
      .catch((error: AxiosError) => {
        if (error.response?.status === ResponseStatusCodes.NotFound) {
          browserHistory.push(AppRoute.NotFound);
        }
      });
  }, [id]);

  const onChangeRating = useCallback((ratingUpdate) => {
    handleRatingChange(ratingUpdate);
  }, [handleRatingChange]);

  if (!film) {
    return <Spinner />;
  }

  const {id: filmId, name, posterImage, backgroundImage} = film;

  function onReviewSubmit(e: FormEvent) {
    e.preventDefault();
    if (isFormSubmit || !isReviewValid) {
      return;
    }
    handleSubmitChange(filmId);
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
              <RatingInputs
                currentRating={rating}
                isDisabled={isFormSubmit}
                onChangeRating={onChangeRating}
              />
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              value={review}
              onChange={(e) => handleReviewChange(e.target.value)}
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

export default AddReview;
