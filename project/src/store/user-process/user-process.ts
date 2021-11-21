import {AuthorizationStatus} from '../../utils/const';
import {UserProcess} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, requireLogout, setFavoriteFilms} from '../action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  favoriteFilms: [],
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    });
});

export {userProcess};
