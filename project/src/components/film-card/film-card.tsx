import {PropsType} from './types';

function FilmCard({film, updateActiveCard}: PropsType): JSX.Element {
  const {name, previewImage, id} = film;
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => updateActiveCard(id)} onMouseOut={() => updateActiveCard(null)}>
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{name}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
