export type FilmAdaptedToServer = {
  'id': number,
  'name': string,
  'poster_image': string,
  'preview_image': string,
  'background_image': string,
  'background_color': string,
  'video_link': string,
  'preview_video_link': string,
  'description': string,
  'rating': number,
  'scores_count': number,
  'director': string,
  'starring': string[],
  'run_time': number,
  'genre': string,
  'released': number,
  'is_favorite': boolean,
}

export type Film = Omit<FilmAdaptedToServer,
  | 'poster_image'
  | 'preview_image'
  | 'background_image'
  | 'background_color'
  | 'video_link'
  | 'preview_video_link'
  | 'scores_count'
  | 'run_time'
  | 'is_favorite'
  > & {
  'posterImage': string,
  'previewImage': string,
  'backgroundImage': string,
  'backgroundColor': string,
  'videoLink': string,
  'previewVideoLink': string,
  'scoresCount': number,
  'runTime': number,
  'isFavorite': boolean,
}

export type updateActiveFilm = (id: number | null) => void;
