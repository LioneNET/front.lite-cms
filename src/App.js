import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './core/store'
import CommonRouter from './core/components/router/CommonRouter';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <CommonRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App