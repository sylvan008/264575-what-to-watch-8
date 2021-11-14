import faker from 'faker';
import {CommentPost, Review, ReviewAdaptedToServer} from '../../types/review';
import {MIN_MESSAGE_LENGTH} from '../const';
import {getUserRating} from './mock-rating';
import {adaptReviewToClient} from '../api';

export const createCommentPost = (): CommentPost => ({
  rating: getUserRating(),
  comment: faker.lorem.words(MIN_MESSAGE_LENGTH),
});

/**
 * Создаёт искусственные данные, описывающие структуру данных Review, адаптированных под сервер
 */
export const createAdaptedToServerReview = (): ReviewAdaptedToServer => ({
  date: faker.date.between(new Date(2018), new Date(2021)).toString(),
  id: faker.datatype.number(),
  user: {
    id: faker.datatype.number(),
    name: faker.name.firstName(),
  },
  ...createCommentPost(),
});

/**
 * Создаёт искусственные данные, описывающие структуру данных Review
 */
export const createMockReview = (): Review => adaptReviewToClient(createAdaptedToServerReview());
