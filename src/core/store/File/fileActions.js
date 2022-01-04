import useOnServer from "../../useOnServer"

const $api = new useOnServer().$api

const fileActions = {

  setIsLoading: (payload) => ({ type: 'file/set.is.loading', payload }),

  setError: (payload) => ({ type: 'file/set.error', payload }),

  setFilesItems: (payload) => ({ type: 'file/set.items', payload }),

  getFiles: (data) => async dispatch => {
    dispatch(fileActions.setIsLoading(true))
    await $api.get('/file', { params: data })
      .then(resp => {
        dispatch(fileActions.setFilesItems(resp.data))
      })
      .catch(err => {
        dispatch(fileActions.setError(err.response.data))
        setTimeout(() => dispatch(fileActions.setError('')), 5000)
        console.error('fileActions: getFiles', err.response.data)
      })
      .finally(() => dispatch(fileActions.setIsLoading(false)))
  },

  addFile: (data) => async dispatch => {
    dispatch(fileActions.setIsLoading(true))
    await $api.post('/file/' + data['mode'], { ...data })
      .then(resp => {
        dispatch(fileActions.setFilesItems(resp.data))
      })
      .catch(err => {
        dispatch(fileActions.setError(err.response.data))
        setTimeout(() => dispatch(fileActions.setError('')), 5000)
        console.error('fileActions: addFile', err.response.data)
      })
      .finally(() => dispatch(fileActions.setIsLoading(false)))
  },

  deleteFile: (data) => async dispatch => {
    dispatch(fileActions.setIsLoading(true))
    await $api.post('/file/delete', { ...data })
      .then(resp => {
        dispatch(fileActions.setFilesItems(resp.data))
      })
      .catch(err => {
        dispatch(fileActions.setError(err.response.data))
        setTimeout(() => dispatch(fileActions.setError('')), 5000)
        console.error('fileActions: deleteFile', err.response.data)
      })
      .finally(() => dispatch(fileActions.setIsLoading(false)))
  },

  createDirectory: (data) => async dispatch => {
    dispatch(fileActions.setIsLoading(true))
    await $api.post('/file/dir-create', { ...data })
      .then(resp => {
        dispatch(fileActions.setFilesItems(resp.data))
      })
      .catch(err => {
        dispatch(fileActions.setError(err.response.data))
        setTimeout(() => dispatch(fileActions.setError('')), 5000)
        console.error('fileActions: deleteFile', err.response.data)
      })
      .finally(() => dispatch(fileActions.setIsLoading(false)))
  },

  renameDirectory: (data) => async dispatch => {
    dispatch(fileActions.setIsLoading(true))
    await $api.post('/file/dir-rename', { ...data })
      .then(resp => {
        dispatch(fileActions.setFilesItems(resp.data))
      })
      .catch(err => {
        dispatch(fileActions.setError(err.response.data))
        setTimeout(() => dispatch(fileActions.setError('')), 5000)
        console.error('fileActions: deleteFile', err.response.data)
      })
      .finally(() => dispatch(fileActions.setIsLoading(false)))
  },

  deleteDirectory: (data) => async dispatch => {
    dispatch(fileActions.setIsLoading(true))
    await $api.post('/file/dir-delete', { ...data })
      .then(resp => {
        dispatch(fileActions.setFilesItems(resp.data))
      })
      .catch(err => {
        dispatch(fileActions.setError(err.response.data))
        setTimeout(() => dispatch(fileActions.setError('')), 5000)
        console.error('fileActions: deleteFile', err.response.data)
      })
      .finally(() => dispatch(fileActions.setIsLoading(false)))
  }
}

export default fileActions