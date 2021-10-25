import {Genres} from '../../utils/const';

export type PropsType = {
  genres: Genres[],
  activeGenre: Genres,
  onChangeGenre: (genre: Genres) => void;
}
