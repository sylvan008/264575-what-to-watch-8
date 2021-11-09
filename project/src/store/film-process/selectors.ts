import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Film} from '../../types/film';
import {Review} from '../../types/review';
import {Genres} from '../../utils/const';

export const getCurrentGenre = (state: State): Genres => state[NameSpace.film].genre;
export const getFilm = (state: State): Film | null => state[NameSpace.film].film;
export const getSimilarFilms = (state: State): Film[] => state[NameSpace.film].similarFilms;
export const getReviews = (state: State): Review[] => state[NameSpace.film].reviews;
