import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {filmsMock} from './mocks/film';
import {reviewsMock} from './mocks/review';
import {reducer} from './store/reducer';
import App from './components/app/app';

const promo = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  release: 2014,
};

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        promo={promo}
        films={filmsMock}
        reviews={reviewsMock}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
