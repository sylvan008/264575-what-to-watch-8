import {ChangeEvent, FormEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import {PropsType} from './types';
import {AppRoute, RouteParams} from '../../utils/const';
import Logo from '../logo/logo';
import RatingInput from '../rating-input/rating-input';
import UserBlock from '../user-block/user-block';

const RATING_DEFAULT = '8';
const RATING_MAX = 10;
const RATING_MIN = 1;

function AddReview({film}: PropsType):JSX.Element {
  const {id, name, posterImage, backgroundImage} = film;

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(RATING_DEFAULT);

  function createRatingInputs() {
    const ratings = [];
    for (let i = RATING_MAX; i >= RATING_MIN; i--) {
      ratings.push(<RatingInput ratingValue={`${i}`} changeRating={onRatingChange} key={`rating${i}`} checked={rating === `${i}`} />);
    }
    return ratings;
  }

  function onRatingChange(e: ChangeEvent<HTMLInputElement>) {
    setRating(e.target.value);
  }

  function onReviewSubmit(e: FormEvent) {
    e.preventDefault();
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
                <Link to={'./'} className="breadcrumbs__link">Add review</Link>
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
        <form action="#" className="add-review__form" onSubmit={onReviewSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {createRatingInputs()}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddReview;
