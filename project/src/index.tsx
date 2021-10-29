import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducer';
import {requireAuthorization} from './store/action';
import {checkAuthAction, fetchFilms} from './store/api-action';
import {createApi} from './services/api';
import {AuthorizationStatus} from './utils/const';
import {ThunkAppDispatch} from './types/action';
import App from './components/app/app';

const promo = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  release: 2014,
};

const api = createApi(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

// TODO: заглушка для ошибки авторизации
(store.dispatch as ThunkAppDispatch)(checkAuthAction()).catch(() => (''));
(store.dispatch as ThunkAppDispatch)(fetchFilms());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        promo={promo}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
