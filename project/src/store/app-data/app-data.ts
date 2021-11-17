import {AppData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {setFilms, setIsDataLoaded, setPromo} from '../action';

const initialState: AppData = {
  films: [],
  isDataLoaded: false,
  promo: null,
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(setIsDataLoaded, (state) => {
      state.isDataLoaded = true;
    });
});

export {appData};
