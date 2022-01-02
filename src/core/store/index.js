import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import FileReducer from './File';

const rootReducer = {
  FileReducer
}

const store = createStore(combineReducers(rootReducer), applyMiddleware(thunk))

export default store