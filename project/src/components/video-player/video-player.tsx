import {PropsType} from './props';
import {TestId} from '../../utils/mocks/testing-const';

const VIDEO_WIDTH = '280';
const VIDEO_HEIGHT = '175';

export function VideoPlayer({isAutoPlay = false, isMuted = true, src, poster}: PropsType): JSX.Element {

  return (
    <video
      src={src}
      poster={poster}
      muted={isMuted}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      data-testid={TestId.VideoPlayer}
      autoPlay={isAutoPlay}
    />
  );
}
