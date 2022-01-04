import { lazy } from 'react'

const fileRoutes = [
  {
    path: 'file',
    component: lazy(() => import('../../Layouts/FileManager'))
  }
]

export default fileRoutes