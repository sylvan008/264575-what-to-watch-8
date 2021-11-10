import {Dispatch} from '@reduxjs/toolkit';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const';
import {State} from '../../types/state';
import {ThunkAppDispatch} from '../../types/action';
import {logoutAction} from '../../store/api-action';
import {getIsUserAuthorized} from '../../store/user-process/selectors';

const mapStateToProps = (state: State) => ({
  isUserAuthorized: getIsUserAuthorized(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLogoutClick() {
    (dispatch as ThunkAppDispatch)(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Компонент предоставляет разметку в зависимости от статуса пользователя:
 * - не авторизован, ссылка на страницу авторизации;
 * - авторизован, автар и кнопка выхода из аккаунта.
 */
function UserBlock({isUserAuthorized, onLogoutClick}: PropsFromRedux): JSX.Element {
  const userBlock = (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
        </div>
      </li>
      <li className="user-block__item">
        <a href="#" className="user-block__link" onClick={(e) => {
          e.preventDefault();
          onLogoutClick();}}
        >
          Sign out
        </a>
      </li>
    </ul>
  );
  const loginBlock = (
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
    </div>
  );
  return isUserAuthorized ? userBlock : loginBlock;
}

export {UserBlock};
export default connector(UserBlock);
