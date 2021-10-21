import {Film, updateActiveFilm} from '../../types/film';

export type PropsType = {
  film: Film,
  updateActiveCard: updateActiveFilm,
  playPreview?: boolean,
}
