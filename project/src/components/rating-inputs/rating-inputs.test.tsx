import {render, screen} from '@testing-library/react';
import RatingInputs from './rating-inputs';
import {RATING_MAX} from '../../utils/const';

describe('Component: RatingInputs', () => {
  const currentRating = '7';
  const onChangeRatingMock = jest.fn();
  const labelRegexp = /rating/i;
  const ratingInputsRegExp = new RegExp(
    new Array(RATING_MAX)
      .map((_, index) => RATING_MAX - index)
      .join('|'),
  );

  const isDisabled = false;

  it('show render correctly', () => {
    render(<RatingInputs currentRating={currentRating} isDisabled={isDisabled} onChangeRating={onChangeRatingMock} />);

    expect(screen.getAllByText(labelRegexp)).toHaveLength(RATING_MAX);
    expect(screen.getAllByDisplayValue(ratingInputsRegExp)).toHaveLength(RATING_MAX);
  });
});
