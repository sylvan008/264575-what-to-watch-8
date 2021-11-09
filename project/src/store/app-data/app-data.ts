import {AppData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {setFilms} from '../action';

const initialState: AppData = {
  films: [],
  isDataLoaded: false,
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    });
});

export {appData};
