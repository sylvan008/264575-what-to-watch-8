import {Link} from 'react-router-dom';
import {AppRoute, RouteParams} from '../../utils/const';
import {PropsType} from './types';
import {VideoPlayer} from '../video-player/video-player';
import {replaceRouteParams} from '../../utils/common';
import {browserHistory} from '../../services/browser-history';

const PREVIEW_TIMEOUT = 1000;

function FilmCard({playPreview = false, film, updateActiveCard}: PropsType): JSX.Element {
  const {name, previewImage, id, previewVideoLink} = film;
  const filmLink = replaceRouteParams(AppRoute.Film, RouteParams.ID, id);

  let timer: ReturnType<typeof setTimeout>;

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => {
        timer = setTimeout(() => updateActiveCard(id), PREVIEW_TIMEOUT);
      }}
      onMouseOut={() => {
        clearTimeout(timer);
        if (playPreview) {
          updateActiveCard(null);
        }
      }}
    >
      <div
        className="small-film-card__image"
        onClick={() => browserHistory.push(filmLink)}
      >
        {playPreview
          ? <VideoPlayer src={previewVideoLink} poster={previewImage} isAutoPlay />
          : <img src={previewImage} alt={name} width="280" height="175" />}

      </div>
      <h3 className="small-film-card__title">
        <Link to={filmLink} className="small-film-card__link">
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
