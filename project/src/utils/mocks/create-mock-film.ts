import faker from 'faker';
import {Film} from '../../types/film';
import {Genres, RATING_MAX, RATING_MIN} from '../const';
import {getMockRating} from './mock-rating';

function getFakeName() {
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
}

/**
 * Создаёт искусственные данные, описывающие структуру данных Film
 */
export const createMockFilm = (): Film => ({
  backgroundColor: faker.internet.color(),
  backgroundImage: faker.image.imageUrl(),
  director: getFakeName(),
  description: faker.lorem.words(10),
  genre: Genres.Horror,
  id: faker.datatype.number(),
  name: faker.lorem.word(),
  isFavorite: faker.datatype.boolean(),
  rating: getMockRating()[0],
  released: faker.datatype.number({
    min: 1990,
    max: 2021,
  }),
  runTime: faker.datatype.number({
    min: 40,
    max: 200
  }),
  scoresCount: faker.datatype.number(10000),
  starring: [getFakeName(), getFakeName(), getFakeName()],
  posterImage: faker.image.imageUrl(),
  previewImage: faker.image.imageUrl(),
  previewVideoLink: faker.image.imageUrl(),
  videoLink: faker.image.imageUrl(),
});
