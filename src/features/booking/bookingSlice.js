import produce from "immer";

const initialState = {
  movies: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "booking/SET_MOVIES":
      const nextState = produce(state, (draft) => {
        draft.movies = action.payload;
      });
      return nextState;
    default:
      return state;
  }
};

export default reducer;
