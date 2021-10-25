// Список жанров фильмов для выбора текущего фильтра по жанрам
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

// Пути для навигации по приложению
export enum AppRoute {
  AddReview = '/films/:id/review',
  Film = '/films/:id',
  Login = '/signin',
  Main = '/',
  MyList = '/mylist',
  Player = '/player/:id',
}

// Статусы авторизации пользователя
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

// Перечисление с параметрами путей
export const RouteParams = {
  ID: ':id',
};
