import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';
import {Film} from '../../types/film';
import {Promo} from '../../types/promo';

export const getFilms = (state: State): Film[] => state[NameSpace.data].films;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getPromo = (state: State): Promo | null => state[NameSpace.data].promo;
