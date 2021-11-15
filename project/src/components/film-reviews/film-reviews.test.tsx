import {render, screen} from '@testing-library/react';
import {createMockReview} from '../../utils/mocks/mock-review';
import FilmReviews from './film-reviews';

describe('Component: FilmReviews', () => {
  const labelMock = 'label 1';
  const reviewMocks = [createMockReview(), createMockReview()];
  const reviewsRegexp = new RegExp(
    reviewMocks
      .map((review) => review.user.name)
      .join('|'),
    'i',
  );

  it('show render correctly', () => {
    render(<FilmReviews label={labelMock} reviews={reviewMocks} />);

    expect(screen.getAllByText(reviewsRegexp)).toHaveLength(reviewMocks.length);
  });
});
