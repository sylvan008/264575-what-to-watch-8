import faker from 'faker';
import {Review} from '../../types/review';
import {MIN_MESSAGE_LENGTH, RATING_MAX, RATING_MIN} from '../const';
import {getUserRating} from './mock-rating';

/**
 * Создаёт искусственные данные, описывающие структуру данных Review
 */
export const createMockReview = (): Review => ({
  comment: faker.lorem.words(MIN_MESSAGE_LENGTH),
  date: faker.date.between(new Date(2018), new Date(2021)),
  id: faker.datatype.number(),
  rating: getUserRating(),
  user: {
    id: faker.datatype.number(),
    name: faker.name.firstName(),
  },
});
