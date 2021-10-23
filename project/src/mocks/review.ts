import {Review} from '../types/review';

export const reviewsMock: Review[] = [
  {
    id: 100,
    user: {
      id: 1000,
      name: 'Kate Muir',
    },
    rating: 8.9,
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years.',
    date: new Date('2016-12-24'),
  },
  {
    id: 101,
    user: {
      id: 1001,
      name: 'Bill Goodykoontz',
    },
    rating: 8.0,
    comment: 'Anderson\'s films are too precious for some, but for those of us willing to lose ourselves in them, they\'re a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
    date: new Date('2015-11-18'),
  },
  {
    id: 102,
    user: {
      id: 1002,
      name: 'Amanda Greever',
    },
    rating: 8.0,
    comment: 'I didn\'t find it amusing, and while I can appreciate the creativity, it\'s an hour and 40 minutes I wish I could take back.',
    date: new Date('2015-11-18'),
  },
  {
    id: 103,
    user: {
      id: 1003,
      name: 'Matthew Lickona',
    },
    rating: 7.2,
    comment: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and',
    date: new Date('2016-12-20'),
  },
  {
    id: 104,
    user: {
      id: 1004,
      name: 'Paula Fleri-Soler',
    },
    rating: 7.6,
    comment: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    date: new Date('2016-12-20'),
  },
  {
    id: 105,
    user: {
      id: 1005,
      name: 'Paula Fleri-Soler',
    },
    rating: 7.0,
    comment: 'It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.',
    date: new Date('2016-12-20'),
  },
];
