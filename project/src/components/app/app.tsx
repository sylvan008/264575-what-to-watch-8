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

function App(props: PropsType): JSX.Element {
  const {promo, films} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage promo={promo} films={films} />;
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          authorizationStatus={AuthorizationStatus.Auth}
          render={() => <AddReview />}
        />
        <Route exact path={AppRoute.Film}>
          <MoviePage />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          authorizationStatus={AuthorizationStatus.NoAuth}
          render={() => <MyList films={films} />}
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
    </BrowserRouter>
  );
}

export default App;
