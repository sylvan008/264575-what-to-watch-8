import {render, screen} from '@testing-library/react';
import RatingInput from './rating-input';

const RATING_VALUE = '10';

describe('Component: RatingInput', () => {
  const changeRatingMock = jest.fn();
  const isChecked = true;
  const isDisabled = true;
  const labelRegexp = new RegExp(`rating ${RATING_VALUE}`, 'i');

  it('show render correctly', () => {
    render(<RatingInput ratingValue={RATING_VALUE} changeRating={changeRatingMock} />);

    expect(screen.getByText(labelRegexp)).toBeInTheDocument();
    expect(screen.getByDisplayValue(RATING_VALUE)).toBeInTheDocument();
  });

  it('show checked rating', () => {
    render(<RatingInput ratingValue={RATING_VALUE} changeRating={changeRatingMock} isChecked={isChecked}/>);

    const inputElement = screen.getByDisplayValue(RATING_VALUE) as HTMLInputElement;
    expect(inputElement.checked).toBe(true);
  });

  it('show disabled rating', () => {
    render(<RatingInput ratingValue={RATING_VALUE} changeRating={changeRatingMock} isDisabled={isDisabled}/>);

    const inputElement = screen.getByDisplayValue(RATING_VALUE) as HTMLInputElement;
    expect(inputElement.disabled).toBe(true);
  });
});
