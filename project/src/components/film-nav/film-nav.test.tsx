import {render, screen} from '@testing-library/react';
import FilmNav from './film-nav';

const LABEL_FIRST = 'label 1';
const LABEL_SECOND = 'label 2';
const LABEL_REGEXP = /label/i;

describe('Component: FimNav', () => {
  const labelsMock = [LABEL_FIRST, LABEL_SECOND];
  const activeTab= LABEL_FIRST;
  const changeTabHandlerMock = jest.fn();

  it('show render correctly', () => {
    render(<FilmNav labels={labelsMock} activeTab={activeTab} changeTabHandler={changeTabHandlerMock} />);

    const filmNavElements = screen.getAllByText(LABEL_REGEXP);
    expect(filmNavElements).toHaveLength(labelsMock.length);
  });
});
