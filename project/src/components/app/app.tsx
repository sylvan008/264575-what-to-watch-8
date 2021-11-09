import {Route, Router as BrowserRouter, Switch} from 'react-router-dom';
import {AppRoute} from '../../utils/const';
import {connect, ConnectedProps} from 'react-redux';
import {isCheckedAuth} from '../../app';
import {PropsType} from './types';
import {State} from '../../types/state';
import {browserHistory} from '../../services/browser-history';
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
import {getFilms, getIsDataLoaded} from '../../store/app-data/selectors';

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthorizationStatus(state),
  films: getFilms(state),
  isDataLoaded: getIsDataLoaded(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector> & PropsType;

function App(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, promo, films, isDataLoaded} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return <Spinner />;
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage promo={promo} />
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
          render={() => <MyList films={films} />}
        />
        <Route exact path={AppRoute.Player}>
          <Player film={films[0]} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <SignIn />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
