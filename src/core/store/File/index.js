const initialState = {
  isLoading: false,
  error: '',
  fileItems: [],
}

const FileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'file/set.is.loading':
      return { ...state, isLoading: action.payload }
    case 'file/set.error':
      return { ...state, error: action.payload, isLoading: false }
    case 'file/set.items':
      return { ...state, fileItems: action.payload }
    default:
      return state
  }
}

export default FileReducer