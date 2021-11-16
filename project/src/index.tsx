import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {rootReducer} from './store/root-reducer';
import {requireAuthorization} from './store/action';
import {checkAuthAction, fetchFilms} from './store/api-action';
import {createApi} from './services/api';
import {AuthorizationStatus} from './utils/const';
import {redirect} from './store/middlewares/redirect';
import {ToastContainer} from 'react-toastify';
import {browserHistory} from './services/browser-history';
import {promo} from './app';
import App from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';

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
      <Router history={browserHistory}>
        <ToastContainer />
        <App promo={promo} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
