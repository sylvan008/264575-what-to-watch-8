import {PropsType} from './types';
import MyListButton from '../my-list-button/my-list-button';
import PlayButton from '../play-button/play-button';
import {browserHistory} from '../../services/browser-history';
import {replaceRouteParams} from '../../utils/common';
import {AppRoute, RouteParams} from '../../utils/const';

function Promo({promo, children}: PropsType): JSX.Element {
  const onPlayClick = () => browserHistory.push(replaceRouteParams(AppRoute.Player, RouteParams.ID, promo.id));

  return (
    <>
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
              <MyListButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Promo;
