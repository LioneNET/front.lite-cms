import { lazy } from "react"

const MainRoutes = [
  {
    path: 'file',
    component: lazy(()=> import('../Layouts/FilePage'))
  }
]

export default MainRoutes