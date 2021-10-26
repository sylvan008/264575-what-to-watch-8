import {Film} from '../../types/film';

export type PropsType = {
  films: Film[],
  render?: (() => JSX.Element) | false,
}
