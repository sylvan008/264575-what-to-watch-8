import {Film} from '../types/film';
import {Review, ReviewAdaptedToServer} from '../types/review';

/**
 * Адаптирует имена объекта фильма в допустимые для клиента
 */
export function adaptFilmToClient(data: {[key: string]: any}): Film {
  const adaptedFilm = Object.assign({}, data, {
    posterImage: data['poster_image'],
    previewImage: data['preview_image'],
    backgroundImage: data['background_image'],
    backgroundColor: data['background_color'],
    scoresCount: data['scores_count'],
    runTime: data['run_time'],
    isFavorite: data['is_favorite'],
    videoLink: data['video_link'],
    previewVideoLink: data['preview_video_link'],
  });

  delete adaptedFilm['poster_image'];
  delete adaptedFilm['preview_image'];
  delete adaptedFilm['background_image'];
  delete adaptedFilm['background_color'];
  delete adaptedFilm['scores_count'];
  delete adaptedFilm['run_time'];
  delete adaptedFilm['is_favorite'];
  delete adaptedFilm['video_link'];
  delete adaptedFilm['preview_video_link'];

  return adaptedFilm as Film;
}

/**
 * Адаптирует свойства комментария для клиента
 */
export function adaptReviewToClient(data: ReviewAdaptedToServer): Review {
  return Object.assign({}, data, {
    date: new Date(data.date),
  });
}
