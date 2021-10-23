import {PropsType} from './props';
import Review from '../review/review';

function FilmReviews({reviews}: PropsType): JSX.Element {
  const middleListIndex = Math.ceil(reviews.length / 2);
  const sortedReview = reviews.slice().sort((reviewA, reviewB) => reviewB.rating - reviewA.rating);
  const firstCol = sortedReview.slice(0, middleListIndex);
  const secondCol = sortedReview.slice(middleListIndex);
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstCol.map((review) => <Review review={review} key={`${review.id}${review.user}`} />)}
      </div>
      <div className="film-card__reviews-col">
        {secondCol.map((review) => <Review review={review} key={`${review.id}${review.user}`} />)}
      </div>
    </div>
  );
}

export default FilmReviews;
