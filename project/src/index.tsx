import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {rootReducer} from './store/root-reducer';
import {requireAuthorization} from './store/action';
import {checkAuthAction, fetchFilms} from './store/api-action';
import {createApi} from './services/api';
import {AuthorizationStatus} from './utils/const';
import {redirect} from './store/middlewares/redirect';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';

const promo = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  release: 2014,
};

const api = createApi(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = configureStore( {
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

// TODO: заглушка для ошибки авторизации
store.dispatch(checkAuthAction()).catch(() => (''));
store.dispatch(fetchFilms());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        promo={promo}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
