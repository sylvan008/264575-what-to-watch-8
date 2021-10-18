import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {filmsMock} from './mocks/film';

const promo = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  release: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App promo={promo} films={filmsMock} />
  </React.StrictMode>,
  document.getElementById('root'));
