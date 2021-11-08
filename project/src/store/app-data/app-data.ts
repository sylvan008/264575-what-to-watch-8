import {AppData} from '../../types/state';
import {Actions, ActionType} from '../../types/action';

const initialState: AppData = {
  films: [],
  isDataLoaded: false,
}

const appData = (state = initialState, action: Actions): AppData => {
  switch (action.type) {
    case ActionType.SetFilms:
      return {
        ...state,
        films: action.payload,
        isDataLoaded: true,
      };
    default:
      return state;
  }
}

export {appData};
