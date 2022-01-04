
const initialState = {
  isAuth: false,
  isLoading: false,
  userData: null,
  errors: null
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'auth/set.auth':
      return { ...state, isAuth: action.data }
    case 'auth/set.loading':
      return { ...state, isLoading: action.data }
    case 'auth/set.user.data':
      console.log('user data set', action.data)
      return { ...state, userData: action.data }
    case 'auth/set.user.error':
      return { ...state, errors: action.data }
    default:
      return state
  }
}

export default AuthReducer