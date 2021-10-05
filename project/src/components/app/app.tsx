import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../utils/const';
import {PropsType} from './types';
import AddReview from '../add-review/add-review';
import MainPage from '../main-page/main-page';
import MoviePage from '../movie-page/movie-page';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';

function App(props: PropsType): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainPage promo={props.promo} />;
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReview />
        </Route>
        <Route exact path={AppRoute.Film}>
          <MoviePage />
        </Route>
        <Route exact path={AppRoute.MyList}>
          <MyList />
        </Route>
        <Route exact path={AppRoute.Player}>
          <Player />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
