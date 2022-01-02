import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Wrapper from "./core/components/Layouts/Wrapper"
import store from './core/store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </Provider>
  )
}

export default App