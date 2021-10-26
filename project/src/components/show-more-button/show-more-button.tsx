import {PropsType} from './types';

/**
 * Компонент кнопки для загрузки дополнительных фильмов.
 */
function ShowMoreButton({onLoadMore}: PropsType): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onLoadMore}>Show more</button>
    </div>
  );
}

export default ShowMoreButton;
