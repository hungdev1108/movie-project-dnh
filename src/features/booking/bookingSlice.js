import produce from "immer";
import { SET_MOVIES } from "./action";

const initialState = {
  movies: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      const nextState = produce(state, (draft) => {
        draft.movies = action.payload;
      });
      return nextState;
    default:
      return state;
  }
};

export default reducer;
