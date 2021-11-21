import {Promo} from '../../types/promo';

export type PropsType = {
  children?: JSX.Element[],
  promo: Promo,
  onChangePromoFavoriteStatus: (filmId: number, status: number) => void,
}
