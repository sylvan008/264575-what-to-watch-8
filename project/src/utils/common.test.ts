import {humanizedRating, humanizeRuntime} from './common';
import {getMockRating} from './mocks/mock-rating';
import {FilmRating} from './const';

describe('Function: humanizeRuntime', () => {
  let minutes = 178;
  it ('should return a string representation of the duration as `"h"h "m"m`', () => {
    expect(humanizeRuntime(minutes)).toBe('2h 58m');
    minutes = 0;
    expect(humanizeRuntime(minutes)).toBe('0h 0m');
  });
});

describe('Function: humanizedRating', () => {
  it ('should return a string representation of the rating', () => {
    const [rating, stringRating] = getMockRating();
    expect(humanizedRating(rating)).toBe(stringRating);
  });
});
