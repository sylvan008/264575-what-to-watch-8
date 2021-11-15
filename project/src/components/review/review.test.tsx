import {render, screen} from '@testing-library/react';
import {createMockReview} from '../../utils/mocks/mock-review';
import Review from './review';
import {dateFormat} from '../../services/date';

describe('Component: Review', () => {
  const reviewMock = createMockReview();
  const {user, comment, rating, date} = reviewMock;
  const dateString = dateFormat(date);

  it('show render correctly', () => {
    render(<Review review={reviewMock} />);

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(comment)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
    expect(screen.getByText(dateString)).toBeInTheDocument();
  });
});
