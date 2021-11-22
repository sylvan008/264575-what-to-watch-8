import {render, screen} from '@testing-library/react';
import {VideoPlayer} from './video-player';
import {TestId} from '../../utils/mocks/testing-const';

describe('Component: VideoPlayer', () => {
  const videoSrc = '#';
  const videoPoster = '#';

  it('should render correctly', () => {
    render(<VideoPlayer src={videoSrc} poster={videoPoster} />);

    expect(screen.getByTestId(TestId.VideoPlayer)).toBeInTheDocument();
  });
});
