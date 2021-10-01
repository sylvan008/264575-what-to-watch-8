import MainPage from '../main-page/main-page';

type Promo = {
  name: string,
  genre: string,
  release: number,
}

type PropsType = {
  promo: Promo
}

function App(props: PropsType): JSX.Element {
  return <MainPage promo={props.promo} />;
}

export default App;
