import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import FilmsList from '../films-list/films-list';
import {getFavoriteFilms} from '../../store/user-process/selectors';
import {State} from '../../types/state';
import {Dispatch} from '@reduxjs/toolkit';
import {ThunkAppDispatch} from '../../types/action';
import {fetchFavoriteFilms} from '../../store/api-action';
import {connect, ConnectedProps} from 'react-redux';
import Spinner from '../spinner/spinner';
import {useEffect} from 'react';

const mapStateToProps = (state: State) => ({
  favoriteFilms: getFavoriteFilms(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFetchFavoriteFilms() {
    (dispatch as ThunkAppDispatch)(fetchFavoriteFilms());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type TypeFromRedux = ConnectedProps<typeof connector>;

function MyList({favoriteFilms, onFetchFavoriteFilms}: TypeFromRedux): JSX.Element {
  useEffect(() => {
    onFetchFavoriteFilms();
  }, [onFetchFavoriteFilms]);

  if (!favoriteFilms.length) {
    return <Spinner />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={favoriteFilms} />
      </section>

      <Footer />
    </div>
  );
}

export {MyList};
export default connector(MyList);
