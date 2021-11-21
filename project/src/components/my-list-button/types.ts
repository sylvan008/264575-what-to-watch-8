import {FilmStatus} from '../../utils/const';

export type PropsType = {
  isInMyList?: boolean,
  onChangeMyList: (status: FilmStatus) => void,
}
