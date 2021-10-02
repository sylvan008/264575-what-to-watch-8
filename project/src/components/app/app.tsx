import MainPage from '../main-page/main-page';
import {PropsType} from './types';

function App(props: PropsType): JSX.Element {
  return <MainPage promo={props.promo} />;
}

export default App;
