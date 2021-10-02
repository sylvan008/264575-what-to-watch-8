import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const promo = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  release: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App promo={promo} />
  </React.StrictMode>,
  document.getElementById('root'));
