import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const';

function NotFound(): JSX.Element {
  return (
    <section>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}>Back to main page.</Link>
    </section>
  );
}
// TODO: Заверстать 404 страничку
export default NotFound;
