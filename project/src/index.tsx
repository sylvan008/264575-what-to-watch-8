import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {rootReducer} from './store/root-reducer';
import {requireAuthorization, setIsDataLoaded} from './store/action';
import {checkAuthAction, fetchFilms, fetchPromo} from './store/api-action';
import {createApi} from './services/api';
import {AuthorizationStatus} from './utils/const';
import {redirect} from './store/middlewares/redirect';
import {ToastContainer} from 'react-toastify';
import {browserHistory} from './services/browser-history';
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

Promise.all([
  store.dispatch(checkAuthAction()).catch(() => ('')), // TODO: заглушка для ошибки авторизации
  store.dispatch(fetchFilms()),
  store.dispatch(fetchPromo()),
])
  .then(() => {
    store.dispatch(setIsDataLoaded());
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <ToastContainer />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
