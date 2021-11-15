import {render, screen} from '@testing-library/react';
import ShowMoreButton from './show-more-button';
import userEvent from '@testing-library/user-event';

const BUTTON_REGEXP = /show more/i;

describe('Component: ShowMoreButton', () => {
  it('show render correctly', () => {
    const onLoadMore =  jest.fn();

    render(<ShowMoreButton onLoadMore={onLoadMore} />);

    const showMoreComponent = screen.getByText(BUTTON_REGEXP);
    expect(showMoreComponent).toBeInTheDocument();
    userEvent.click(showMoreComponent);
    expect(onLoadMore).toBeCalledTimes(1);
  });
});
