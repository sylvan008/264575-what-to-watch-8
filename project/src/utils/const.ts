const RATING_BAD = 'Bad';
const RATING_NORMAL = 'Normal';
const RATING_GOOD = 'Good';
const RATING_VERY_GOOD = 'Very good';
const RATING_AWESOME = 'Awesome';

/**
 * Список жанров фильмов для выбора текущего фильтра по жанрам
 */
export enum Genres {
  AllGenres = 'All genres',
  Comedies = 'Comedies',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Dramas = 'Dramas',
  Horror = 'Horror',
  KidsFamily = 'Kids & Family',
  Romance = 'Romance',
  SciFi = 'Sci-Fi',
  Thrillers = 'Thrillers',
}

/**
 * Пути для навигации по приложению
 */
export enum AppRoute {
  AddReview = '/films/:id/review',
  Film = '/films/:id',
  Login = '/login',
  Main = '/',
  MyList = '/mylist',
  NotFound = '/404',
  Player = '/player/:id',
}

/**
 * Пути запросов к серверу *api*
 */
export enum APIRoute {
  Comments = '/comments/:film_id',
  ChangeFavoriteStatus = '/favorite/:film_id/:status',
  Favorite = '/favorite',
  Film = '/films/:id',
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Promo = '/promo',
  SimilarFilms = '/films/:id/similar',
}

/**
 * Статусы авторизации пользователя
 */
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ResponseStatusCodes {
  BadRequest = 400,
  NotFound= 404,
}

export enum Messages  {
  EmailInvalid = 'Please enter a valid email address',
  PasswordInvalid = 'Password must be at least 1 letter and 1 digit',
  AuthError = 'We can’t recognize this email\n and password combination. Please try again.',
}

/**
 * Перечисление с параметрами путей
 */
export const RouteParams = {
  ID: ':id',
  FILM_ID: ':film_id',
};

/**
 * Перечисление рейтингов фильмов
 */
export const FilmRating = {
  0: RATING_BAD,
  1: RATING_BAD,
  2: RATING_BAD,
  3: RATING_NORMAL,
  4: RATING_NORMAL,
  5: RATING_GOOD,
  6: RATING_GOOD,
  7: RATING_GOOD,
  8: RATING_VERY_GOOD,
  9: RATING_VERY_GOOD,
  10: RATING_AWESOME,
};

/**
 * Количество карточек фильма по умолчанию
 */
export const STEP_CARDS_VIEW = 8;

/**
 * Минимальная длина сообщения в комментарии
 */
export const MIN_MESSAGE_LENGTH = 50;

/**
 * Максимальная длина сообщения в комментарии
 */
export const MAX_MESSAGE_LENGTH = 400;

/**
 * Утилитарная константа, для тестирования
 */
export const UNKNOWN_ACTION = 'UNKNOWN_ACTION';

/**
 * Минимальное и максимальное значения рейтинга фильма
 */
export const RATING_MIN = 0;
export const RATING_MAX = 10;
