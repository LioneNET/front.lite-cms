import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Wrapper from "./core/components/Layouts/Wrapper"
import store from './core/store';
import MainRoutes from './core/components/routes/main_routes';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Wrapper />}>
            {MainRoutes.map(items => <Route key={items.path} path={items.path} element={<items.component />} />)}
            <Route path='*' element={<Navigate to='file' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App