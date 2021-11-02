import {Dispatch} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../utils/const';
import {State} from '../../types/state';
import {Actions, ThunkAppDispatch} from '../../types/action';
import {logoutAction} from '../../store/api-action';

function mapStateToProps({authorizationStatus}: State) {
  return {
    authorizationStatus,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    onLogoutClick() {
      (dispatch as ThunkAppDispatch)(logoutAction());
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Компонент предоставляет разметку в зависимости от статуса пользователя:
 * - не авторизован, ссылка на страницу авторизации;
 * - авторизован, автар и кнопка выхода из аккаунта.
 */
function UserBlock({authorizationStatus, onLogoutClick}: PropsFromRedux): JSX.Element {
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
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
  const loginBLock = (
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
    </div>
  );
  return isAuth ? userBlock : loginBLock;
}

export {UserBlock};
export default connector(UserBlock);
