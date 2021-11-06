import {PropsType} from './types';
import {dateFormat} from '../../services/date';

function Review({review}: PropsType): JSX.Element {
  const {user, comment, rating, date} = review;
  const dateString = dateFormat(date);
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={dateString}>{dateString}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default Review;
