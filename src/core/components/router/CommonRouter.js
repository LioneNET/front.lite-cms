import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateWrapper from '../Layouts/PrivateWrapper';
import { MainRoutes } from './routes';

const CommonRouter = () => {

  const userData = useSelector(state => state.auth.userData)

  const ResolveWrapper = () => {
    if (userData) {
      //Роуты для авторизированых
      let route = [...MainRoutes.filter(item => item.meta?.authRoute ? false : true)]
      return (
        <Routes>
          <Route path='/' element={<PrivateWrapper />}>
            {route.map(items => <Route key={items.path} path={items.path} element={<items.component />} />)}
            <Route path='*' element={<Navigate to='file' />} />
          </Route>
        </Routes>
      )
    } else {
      //роуты для неавторизированых
      let route = [...MainRoutes.filter(item => (item.meta?.authRoute || item.meta?.publicRoute) ? true : false)]
      return (
        <Routes>
          {route.map(items => <Route key={items.path} path={items.path} element={<items.component />} />)}
          <Route path='*' element={<Navigate to='login' />} />
        </Routes>
      )
    }
  }

  return <ResolveWrapper />
}

export default CommonRouter