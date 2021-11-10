import {Redirect, Route} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {AppRoute} from '../../utils/const';
import {PrivateRouteProps} from './types';
import {State} from '../../types/state';
import {getIsUserAuthorized} from '../../store/user-process/selectors';

const mapStateToProps = (state: State) => ({
  isUserAuthorized: getIsUserAuthorized(state),
});

const connector = connect(mapStateToProps);
type PropsFormRedux = PrivateRouteProps & ConnectedProps<typeof connector>;

function PrivateRoute(props: PropsFormRedux): JSX.Element {
  const {exact, path, render, isUserAuthorized} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        isUserAuthorized
          ? render()
          : <Redirect to={AppRoute.Login}/>
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);
