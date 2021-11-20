import {PropsType} from './types';
import MyListButton from '../my-list-button/my-list-button';
import {useState} from 'react';
import PlayButton from '../play-button/play-button';
import Player from '../player/player';
import Portal from '../portal/portal';

/**
 * Компонент для отображения информации о промо фильме
 */
function Promo({promo, children, onChangePromoFavoriteStatus}: PropsType): JSX.Element {
  const [isPlay, setIsPlay] = useState(false);
  const onPlayClick = () => setIsPlay(true);
  const onPlayerStop = () => setIsPlay(false);

  return (
    <>
      {isPlay && (
        <Portal>
          <Player film={promo} onStopClick={onPlayerStop} />
        </Portal>
      )}
      <div className="film-card__bg">
        <img src={promo.backgroundImage} alt="The Grand Budapest Hotel"/>
      </div>

      {children}

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promo.posterImage} alt={promo.name} width="218" height="327"/>
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promo.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promo.genre}</span>
              <span className="film-card__year">{promo.released}</span>
            </p>

            <div className="film-card__buttons">
              <PlayButton onPlayClick={onPlayClick} />
              <MyListButton
                isInMyList={promo.isFavorite}
                onChangeMyList={(status) => onChangePromoFavoriteStatus(promo.id, status)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Promo;
