import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../utils/const';
import {PropsType} from './types';
import AddReview from '../add-review/add-review';
import MainPage from '../main-page/main-page';
import MoviePage from '../movie-page/movie-page';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import PrivateRoute from '../private-route/private-route';
import SignIn from '../sign-in/sign-in';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

const SIMILAR_MOVIE_COUNT = 4;

const mapStateToProps = ({films}: State) => ({
  films,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector> & PropsType;

function App(props: PropsFromRedux): JSX.Element {
  const {promo, films} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage promo={promo} />;
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          authorizationStatus={AuthorizationStatus.Auth}
          render={() => <AddReview film={films[0]} />}
        />
        <Route exact path={AppRoute.Film}>
          <MoviePage film={films[0]} films={films.slice(0, SIMILAR_MOVIE_COUNT)} />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          authorizationStatus={AuthorizationStatus.NoAuth}
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
