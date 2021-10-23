import {PropsType} from './props';

function FilmNav({labels, activeTab, changeTabHandler}: PropsType): JSX.Element {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {labels.map((label) => (
          <li className={['film-nav__item', activeTab === label ? 'film-nav__item--active' : ''].join(' ')} key={label}>
            <a href="#" className="film-nav__link" onClick={(e) => {
              e.preventDefault();
              changeTabHandler(label);
            }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FilmNav;
