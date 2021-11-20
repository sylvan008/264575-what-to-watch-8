import {MouseEvent, useEffect, useRef, useState} from 'react';
import Spinner from '../spinner/spinner';
import {humanizeVideoTimeLeft} from '../../utils/common';
import {PropsType} from './types';

const STYLE_ATTRIBUTE = 'style';
const PLAYER_INSET = 30;
const PLAYER_FULLSCREEN = 0;

/**
 * Компонент для отображения видеороликов, с элементами управления
 */
function Player({film, onStopClick}: PropsType): JSX.Element {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [isCanPlay, setIsCanPlay] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isFullScreen,setIsFullScreen] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (playerRef.current) {
      setVideoDuration(playerRef.current.duration);
    }
  }, [playerRef.current, isCanPlay]);

  useEffect(() => {
    if (isFullScreen) {
      document.body.setAttribute(STYLE_ATTRIBUTE, 'overflow-y: hidden;');
    }

    return () => {
      document.body.removeAttribute(STYLE_ATTRIBUTE);
    };
  }, [isFullScreen]);

  if (!film) {
    return <Spinner />;
  }

  const {name, previewImage, videoLink} = film;

  const onPlayClick = async () => {
    if (!playerRef.current || !isCanPlay) {
      return;
    }
    if (playerRef.current.paused) {
      setIsPlay(true);
      await playerRef.current.play();
    } else {
      setIsPlay(false);
      playerRef.current.pause();
    }
  };

  const onFullScreenClick = () => {
    if (!playerRef.current) {
      return;
    }
    setIsFullScreen(true);
  };

  const createPlayerStyles = () => {
    const inset = `${isFullScreen ? PLAYER_FULLSCREEN : PLAYER_INSET}%`;

    return {
      top: inset,
      left: inset,
      width: `calc(100% - ${inset} * 2)`,
      height: `calc(100% - ${inset} * 2)`,
      minHeight: '360px',
      zIndex: 100,
    };
  };

  const getVideoPercent = (duration:number, current:number): number => {
    if (!duration) {
      return 0;
    }
    return 100 * current / duration;
  };

  const getVideoTimeLeft = (duration:number, current:number): number => duration - current;

  const rewindVideo = (event: MouseEvent<HTMLProgressElement>) => {
    if (!playerRef.current) {
      return;
    }
    const elementWidth = event.currentTarget.offsetWidth;
    const elementOffsetX = event.currentTarget.getBoundingClientRect().left;
    const mouseCoords = event.pageX - elementOffsetX;

    playerRef.current.currentTime = videoDuration * mouseCoords / elementWidth;
  };

  const onVideoEnd = () => {
    if (!playerRef.current) {
      return;
    }
    setIsPlay(false);
    playerRef.current.currentTime = 0;
  };

  const videoPercent = getVideoPercent(videoDuration, currentTime);
  const videoTimeLeft = humanizeVideoTimeLeft(getVideoTimeLeft(videoDuration, currentTime));

  return (
    <div
      className="player"
      style={createPlayerStyles()}
    >
      <video
        src={videoLink}
        className="player__video"
        poster={previewImage}
        ref={playerRef}
        autoPlay={false}
        onCanPlayThrough={() => setIsCanPlay(true)}
        onTimeUpdate={() => {
          if (playerRef.current) {
            setCurrentTime(playerRef.current.currentTime);
          }
        }}
        onEnded={onVideoEnd}
      />

      <button
        type="button"
        className="player__exit"
        onClick={onStopClick}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={videoPercent} max="100"
              onClick={rewindVideo}
            />
            <div className="player__toggler" style={{ left: `${videoPercent}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{videoTimeLeft}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={onPlayClick}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlay ? '#pause' : '#play-s'} />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={onFullScreenClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
      {!isCanPlay && <Spinner />}
    </div>
  );
}

export default Player;
