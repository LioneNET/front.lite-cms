import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./Auth";
import FileReducer from './File';
import CategoryReducer from './Category/index';

//все редюсеры
const rootReducer = {
  auth: AuthReducer,
  files: FileReducer,
  category: CategoryReducer 
}

//Пользовательские данные из локального хранилища
const getLocalUserData = () => {
  const userData = localStorage.getItem('userData')
  if(userData) {
    return JSON.parse(userData)
  }
  return null
}

const initialState = {
  auth: {
    userData: getLocalUserData()
  }
}

const store = createStore(combineReducers(rootReducer), initialState, applyMiddleware(thunk))

export default store