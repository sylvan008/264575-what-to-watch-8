import {PropsType} from './types';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import FilmsList from '../films-list/films-list';

function MyList({films}: PropsType): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={films} />
      </section>

      <Footer />
    </div>
  );
}

export default MyList;
