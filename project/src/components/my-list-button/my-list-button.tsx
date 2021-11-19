import {PropsType} from './types';

function MyListButton({isInMyList = false, onChangeMyList}: PropsType): JSX.Element {
  const icon = isInMyList ? 'in-list' : 'add';
  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={() => onChangeMyList(Number(!isInMyList))}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={`#${icon}`} />
      </svg>
      <span>My list</span>
    </button>
  );
}

export default MyListButton;
