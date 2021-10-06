import { Route, Redirect } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../utils/const';
import {PrivateRouteProps} from './types';

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {exact, path, render, authorizationStatus} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.Login}/>
      )}
    />
  );
}

export default PrivateRoute;
