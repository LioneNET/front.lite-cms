const initialState = {
  isLoading: false,
  error: '',
  categoryItems: []
}

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'category/set.is.loading':
      return { ...state, isLoading: action.payload }
    case 'category/set.error':
      return { ...state, error: action.payload, isLoading: false }
    case 'category/set.items':
      return { ...state, categoryItems: action.payload }
    default:
      return state
  }
}

export default CategoryReducer