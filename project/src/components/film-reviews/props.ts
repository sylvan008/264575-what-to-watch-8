import {Tab} from '../../types/tab';
import {Review} from '../../types/review';

export type PropsType = Tab & {
  reviews: Review[],
};
