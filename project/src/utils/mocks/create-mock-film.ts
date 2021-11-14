import faker from 'faker';
import {Film, FilmAdaptedToServer} from '../../types/film';
import {Genres} from '../const';
import {getMockRating} from './mock-rating';
import {adaptFilmToClient} from '../api';

/**
 * Создаёт искусственные данные, Имя и Фамилия человека
 */
function getFakeName(): string{
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
}

/**
 * Создаёт искусственные данные, описывающие структуру данных Film,
 * адаптированных для сервера
 */
export const createServerAdaptedFilm = (): FilmAdaptedToServer => ({
  'background_color': faker.internet.color(),
  'background_image': faker.image.imageUrl(),
  director: getFakeName(),
  description: faker.lorem.words(10),
  genre: Genres.Horror,
  id: faker.datatype.number(),
  name: faker.lorem.word(),
  'is_favorite': faker.datatype.boolean(),
  rating: getMockRating()[0],
  released: faker.datatype.number({
    min: 1990,
    max: 2021,
  }),
  'run_time': faker.datatype.number({
    min: 40,
    max: 200,
  }),
  'scores_count': faker.datatype.number(10000),
  starring: [getFakeName(), getFakeName(), getFakeName()],
  'poster_image': faker.image.imageUrl(),
  'preview_image': faker.image.imageUrl(),
  'preview_video_link': faker.image.imageUrl(),
  'video_link': faker.image.imageUrl(),
});

/**
 * Создаёт искусственные данные, описывающие структуру данных Film
 */
export const createMockFilm = (): Film => adaptFilmToClient(createServerAdaptedFilm());
