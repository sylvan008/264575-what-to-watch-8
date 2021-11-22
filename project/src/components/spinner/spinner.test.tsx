import {render, screen} from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(<Spinner />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByTestId('spinner-icon')).toBeInTheDocument();
  });

  it('should update styles on icon', () => {
    const testStyles = {
      width: '50px',
      height: '50px',
    };
    render(<Spinner styles={testStyles} />)

    const spinnerIcon = screen.getByTestId('spinner-icon');

    expect(spinnerIcon).toHaveStyle('width: 50px');
    expect(spinnerIcon).toHaveStyle('height: 50px');
  });
});
