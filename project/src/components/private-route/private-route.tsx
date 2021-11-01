import {Route, Redirect} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {AuthorizationStatus, AppRoute} from '../../utils/const';
import {PrivateRouteProps} from './types';
import {State} from '../../types/state';

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);
type PropsFormRedux = PrivateRouteProps & ConnectedProps<typeof connector>;

function PrivateRoute(props: PropsFormRedux): JSX.Element {
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

export {PrivateRoute};
export default connector(PrivateRoute);
