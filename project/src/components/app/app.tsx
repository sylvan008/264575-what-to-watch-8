import {Route, Switch} from 'react-router-dom';
import {AppRoute} from '../../utils/const';
import {connect, ConnectedProps} from 'react-redux';
import {isCheckedAuth} from '../../app';
import {State} from '../../types/state';
import AddReview from '../add-review/add-review';
import MainPage from '../main-page/main-page';
import MoviePage from '../movie-page/movie-page';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
import Spinner from '../spinner/spinner';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getIsDataLoaded} from '../../store/app-data/selectors';

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isDataLoaded: getIsDataLoaded(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, isDataLoaded} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return <Spinner />;
  }

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainPage />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.AddReview}
        render={() => <AddReview />}
      />
      <Route exact path={AppRoute.Film}>
        <MoviePage />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.MyList}
        render={() => <MyList />}
      />
      <Route exact path={AppRoute.Player}>
        <Player />
      </Route>
      <Route exact path={AppRoute.Login}>
        <SignIn />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export {App};
export default connector(App);
