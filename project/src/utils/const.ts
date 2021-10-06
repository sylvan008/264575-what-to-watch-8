export enum AppRoute {
  AddReview = '/films/:id/review',
  Film = '/films/:id',
  Login = '/signin',
  Main = '/',
  MyList = '/mylist',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
