import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createApi} from '../services/api';
import {State} from '../types/state';
import {
  checkAuthAction,
  fetchFilm,
  fetchFilms,
  fetchReviews,
  fetchSimilarFilms,
  loginAction,
  submitReview
} from './api-action';
import {redirectToRoute, requireAuthorization, setFilm, setFilms, setReviews, setSimilarFilms} from './action';
import {AuthData} from '../types/auth';
import {APIRoute, AppRoute, AUTH_TOKEN_KEY_NAME, AuthorizationStatus, RouteParams} from '../utils/const';
import {createServerAdaptedFilm} from '../utils/mocks/create-mock-film';
import {adaptFilmToClient, adaptReviewToClient} from '../utils/api';
import {replaceRouteParams} from '../utils/common';
import {createAdaptedToServerReview, createCommentPost} from '../utils/mocks/mock-review';
import {ReviewAdaptedToServer} from '../types/review';

const OK = 200;
const FAKE_TOKEN = 'secret';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createApi(onFakeUnauthorized);
  const mockApi = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middleware);
  const store = mockStore();

  beforeEach(() => {
    store.clearActions();
  });

  it('should authorization status is «auth» when server return 200', async () => {
    mockApi
      .onGet(APIRoute.Login)
      .reply(OK, []);
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
  });

  it(`should dispatch RequiredAuthorization and RedirectRoute when POST ${APIRoute.Login}`, async () => {
    const fakeUser: AuthData = {email: 'test@mail.ru', password: 'a1'};
    mockApi
      .onPost(APIRoute.Login)
      .reply(OK, {token: FAKE_TOKEN});

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Main),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, FAKE_TOKEN);
  });

  it(`should dispatch  setFilms when GET ${APIRoute.Films}`, async () => {
    const films = [createServerAdaptedFilm(), createServerAdaptedFilm(), createServerAdaptedFilm()];
    const adaptedToClientFilms = films.map((film) => adaptFilmToClient(film));

    mockApi
      .onGet(APIRoute.Films)
      .reply(OK, films);

    await store.dispatch(fetchFilms());

    expect(store.getActions()).toEqual([
      setFilms(adaptedToClientFilms),
    ]);
  });

  it(`should dispatch setFilm when GET ${APIRoute.Film}`, async () => {
    const film = createServerAdaptedFilm();
    const adaptedToClientFilm = adaptFilmToClient(film);

    mockApi
      .onGet(replaceRouteParams(APIRoute.Film, RouteParams.ID, film.id))
      .reply(OK, film);

    await store.dispatch(fetchFilm(film.id));

    expect(store.getActions()).toEqual([
      setFilm(adaptedToClientFilm),
    ]);
  });

  it(`should dispatch setSimilarFilms when GET ${APIRoute.SimilarFilms}`, async () => {
    const film = createServerAdaptedFilm();
    const films = [createServerAdaptedFilm(), createServerAdaptedFilm(), createServerAdaptedFilm()];
    const adaptedToClientFilms = films.map((movie) => adaptFilmToClient(movie));

    mockApi
      .onGet(replaceRouteParams(APIRoute.SimilarFilms, RouteParams.ID, film.id))
      .reply(OK, films);

    await store.dispatch(fetchSimilarFilms(film.id));

    expect(store.getActions()).toEqual([
      setSimilarFilms(adaptedToClientFilms),
    ]);
  });

  it(`should dispatch setReviews when GET ${APIRoute.Comments}`, async () => {
    const film = createServerAdaptedFilm();
    const reviews: ReviewAdaptedToServer[] = [createAdaptedToServerReview(), createAdaptedToServerReview(), createAdaptedToServerReview()];
    const reviewsAdaptedToClient = reviews.map((review) => adaptReviewToClient(review));

    mockApi
      .onGet(replaceRouteParams(APIRoute.Comments, RouteParams.FILM_ID, film.id))
      .reply(OK, reviews);

    await store.dispatch(fetchReviews(film.id));

    expect(store.getActions()).toEqual([
      setReviews(reviewsAdaptedToClient),
    ]);
  });

  it(`should dispatch submitReview when POST ${APIRoute.Comments}`, async () => {
    const film = createServerAdaptedFilm();
    const commentPost = createCommentPost();
    const reviews = [createAdaptedToServerReview(), createAdaptedToServerReview(), createAdaptedToServerReview()];
    const adaptedToClientReviews = reviews.map((review) => adaptReviewToClient(review));

    mockApi
      .onPost(replaceRouteParams(APIRoute.Comments, RouteParams.FILM_ID, film.id))
      .reply(OK, reviews);

    await store.dispatch(submitReview({
      filmId: film.id,
      commentPost,
    }));

    expect(store.getActions()).toEqual([
      setReviews(adaptedToClientReviews),
    ]);
  });
});
