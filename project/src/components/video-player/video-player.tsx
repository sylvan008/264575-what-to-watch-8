import {useEffect, useRef, useState} from 'react';
import {PropsType} from './props';

const VIDEO_WIDTH = '280';
const VIDEO_HEIGHT = '175';

export function VideoPlayer({isAutoPlay = false, isMuted = true, src, poster}: PropsType): JSX.Element {
  const [isPlaying] = useState(isAutoPlay);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  return (
    <video
      src={src}
      poster={poster}
      muted={isMuted}
      ref={videoRef}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
}
