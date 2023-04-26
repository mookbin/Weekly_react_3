// import { createStore } from "redux";
// import { combineReducers } from "redux";
import counter from "../modules/counter";
import { configureStore } from "@reduxjs/toolkit";

//ASIS : 일반 reducer

// const rootReducer = combineReducers({
//   counter,
// });

// const store = createStore(rootReducer);

// TODO: Redux toolkit
const store = configureStore({
  reducer: {
    counter: counter,
  },
});

export default store;
