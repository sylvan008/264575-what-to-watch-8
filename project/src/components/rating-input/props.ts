import {ChangeEvent} from 'react';

export type PropsType = {
  ratingValue: string,
  changeRating: (e: ChangeEvent<HTMLInputElement>) => void,
  isChecked?: boolean,
  isDisabled?: boolean,
}
