import bookingReducer from "features/booking/bookingSlice";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  // Key booking => Slice (reducer)
  // reducer quản lý nhiều state
  booking: bookingReducer,
});

// middleware: lưu thông tin nhưng action được gửi lên store
const logger = (state) => {
  return (next) => {
    return (action) => {
      console.log(action);
      // Xử lý action
      const actionList = localStorage.getItem("actionList");
      if (!actionList) {
        localStorage.setItem("actionList", JSON.stringify([action]));
      } else {
        const actionListArr = JSON.parse(actionList);
        actionListArr.push(action);
        localStorage.setItem("actionList", JSON.stringify(actionListArr));
      }

      next(action);
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

export default store;
