import {render, screen} from '@testing-library/react';
import SigninMessage from './signin-message';

describe('Component: SigninMessage', () => {
  it('show render correctly', () => {
    const testText = 'test';

    render(<SigninMessage text={testText} />);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});
