import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const';
import {PropsType} from './types';
import {VideoPlayer} from '../video-player/video-player';

const PREVIEW_TIMEOUT = 1000;

function FilmCard({playPreview = false, film, updateActiveCard}: PropsType): JSX.Element {
  const {name, previewImage, id, previewVideoLink} = film;
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
      <div className="small-film-card__image">
        {playPreview
          ? <VideoPlayer src={previewVideoLink} poster={previewImage} isAutoPlay />
          : <img src={previewImage} alt={name} width="280" height="175"/>}

      </div>
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film.replace(':id', `${id}`)} className="small-film-card__link">
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
