import faker from 'faker';
import {stringify} from 'querystring';
import {FilmRating} from '../const';
import {NormalizedRating} from '../../types/review';

const PRECISION = 1;

const normalizeRating = () => faker.datatype.number({
  min: 0,
  max: 10,
});

export const getMockRating = (): [rating: number, stringRating: string] => {
  const normalizedRating = normalizeRating() as NormalizedRating;

  const rating = faker.datatype.float({
    min: normalizedRating,
    max: normalizedRating + PRECISION,
    precision: PRECISION,
  });

  return [rating, FilmRating[normalizedRating]];
}
