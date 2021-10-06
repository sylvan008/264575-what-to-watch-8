import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const';
import {PropsType} from './types';

function Logo({linkClassName}: PropsType): JSX.Element {
  const linkClasses = `logo__link ${linkClassName ? linkClassName : ''}`;

  return (
    <div className="logo">
      <Link to={AppRoute.Main} className={linkClasses}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
