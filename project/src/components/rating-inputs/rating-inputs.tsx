import React, {ChangeEvent} from 'react';
import RatingInput from '../rating-input/rating-input';
import {PropsType} from './types';

const RATING_MAX = 10;

function RatingInputs({currentRating, disabled, onChangeRating}: PropsType): JSX.Element {
  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => onChangeRating(e.target.value);

  const ratings = new Array(RATING_MAX).fill(null);
  return (
    <>
      {ratings.map((_, index) => {
        const rating = RATING_MAX - index;
        return (
          <RatingInput
            ratingValue={`${rating}`}
            changeRating={handleRatingChange}
            key={`rating${rating}`}
            checked={currentRating === `${rating}`}
            disabled={disabled}
          />
        );
      })}
    </>
  );
}

export default React.memo(RatingInputs);
