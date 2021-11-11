import faker from 'faker';
import {stringify} from 'querystring';
import {FilmRating, RATING_MAX, RATING_MIN} from '../const';
import {NormalizedRating} from '../../types/review';

const PRECISION = 1;

export const getUserRating = () => faker.datatype.number({
  min: RATING_MIN,
  max: RATING_MAX,
});

/**
 * Создаёт искусственные данные, для проверки рейтинга
 */
export const getMockRating = (): [rating: number, stringRating: string] => {
  const normalizedRating = getUserRating() as NormalizedRating;

  const rating = faker.datatype.float({
    min: normalizedRating,
    max: normalizedRating + PRECISION,
    precision: PRECISION,
  });

  return [rating, FilmRating[normalizedRating]];
}
