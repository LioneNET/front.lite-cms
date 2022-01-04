import useOnServer from './../../useOnServer/index';

const $api = new useOnServer().$api

export const categoryActions = {

  setIsLoading: (payload) => ({ type: 'category/set.is.loading', payload }),

  setError: (payload) => ({ type: 'category/set.error', payload }),

  setCategoryItems: (payload) => ({ type: 'category/set.items', payload }),

  getCategorys: (data) => async dispatch => {
    dispatch(categoryActions.setIsLoading(true))
    await $api.get('category', { ...data })
      .then(resp => {
        dispatch(categoryActions.setCategoryItems(resp.data))
      })
      .catch(err => {
        dispatch(categoryActions.setError(err.response.data))
        setTimeout(() => dispatch(categoryActions.setError('')), 5000)
        console.error('categoryActions: getCategorys', err.response.data)
      })
      .finally(() => dispatch(categoryActions.setIsLoading(false)))
  },

  addCategory: (data) => async dispatch => {
    dispatch(categoryActions.setIsLoading(true))
    await $api.post('category/' + data['mode'], { ...data })
      .then(resp => {
        dispatch(categoryActions.setCategoryItems(resp.data))
      })
      .catch(err => {
        dispatch(categoryActions.setError(err.response.data))
        setTimeout(() => dispatch(categoryActions.setError('')), 5000)
        console.error('categoryActions: addCategory', err.response.data)
      })
      .finally(() => dispatch(categoryActions.setIsLoading(false)))
  },

  deleteCategory: (data) => async dispatch => {
    dispatch(categoryActions.setIsLoading(true))
    await $api.post('category/' + data['mode'], { ...data })
      .then(resp => {
        dispatch(categoryActions.setCategoryItems(resp.data))
      })
      .catch(err => {
        dispatch(categoryActions.setError(err.response.data))
        setTimeout(() => dispatch(categoryActions.setError('')), 5000)
        console.error('categoryActions: deleteCategory', err.response.data)
      })
      .finally(() => dispatch(categoryActions.setIsLoading(false)))
  },
}