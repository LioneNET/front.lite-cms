import useOnServer from "../../useOnServer"

const $api = new useOnServer().$api

const authActions = {
  setIsAuth: data => ({ type: 'auth/set.auth', data }),
  setIsLoading: data => ({ type: 'auth/set.loading', data }),
  setUserData: data => ({type: 'auth/set.user.data', data}),
  setUserError: data => ({type: 'auth/set.user.error', data}),

  queryLogin: data => async dispatch => {
    dispatch(authActions.setIsLoading(true))
    await $api.post('auth/login', data)
    .then(resp=>{
      dispatch(authActions.setUserData(resp.data))
      localStorage.setItem('userData', JSON.stringify(resp.data))
    })
    .catch(err=>dispatch(authActions.setUserError(err.data)))
    .finally(()=>dispatch(authActions.setIsLoading(false)))
  },

  queryLogout: data => async dispatch => {
    dispatch(authActions.setIsLoading(true))
    await $api.post('logout', data)
    .then(resp=>{
      dispatch(authActions.setUserData([]))
      dispatch(authActions.setIsAuth(false))
      localStorage.removeItem('userData')
    })
    .catch(err=>dispatch(authActions.setUserError(err.data)))
    .finally(()=>dispatch(authActions.setIsLoading(false)))
  } 
}

export default authActions