import reducer from "features/booking/bookingSlice";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  // Key booking => Slice (reducer)
  // reducer quản lý nhiều state
  booking: reducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
