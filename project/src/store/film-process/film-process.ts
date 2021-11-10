import {Genres} from '../../utils/const';
import {FilmProcess} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {
  setFilm,
  setGenre,
  setReviews,
  setSimilarFilms
} from '../action';

const initialState: FilmProcess = {
  genre: Genres.AllGenres,
  film: null,
  reviews: [],
  similarFilms: [],
};

const filmProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export {filmProcess};
